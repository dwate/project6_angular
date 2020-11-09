import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { SauceService } from '../../services/stuff.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
// import { Thing } from '../../models/Thing.model';
import { Sauce } from '../../models/Sauce.model';
import { mimeType } from '../mime-type.validator';

@Component({
  selector: 'app-new-thing-with-upload',
  templateUrl: './new-thing-with-upload.component.html',
  styleUrls: ['./new-thing-with-upload.component.scss']
})
export class NewThingWithUploadComponent implements OnInit {

  public sauceForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private sauceService: SauceService,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.state.mode$.next('form');
    this.sauceForm = this.formBuilder.group({
      name: [null, Validators.required],
      manufacturer: [null, Validators.required],
      description: [null, Validators.required],
      heat: [null, Validators.required],
      image: [null, Validators.required, mimeType],
      mainPepper: [null, Validators.required]

    });
    this.userId = this.auth.userId;
  }

  onSubmit() {
    this.loading = true;
    const sauce = new Sauce();
    sauce.name = this.sauceForm.get('name').value;
    sauce.manufacturer = this.sauceForm.get('manufacturer').value;
    sauce.description = this.sauceForm.get('description').value;
    sauce.heat = this.sauceForm.get('heat').value;
    sauce.imageUrl = '';
    sauce.mainPepper = this.sauceForm.get('mainPepper').value;
    sauce.userId = this.userId;
    this.sauceService.createNewThingWithFile(sauce, this.sauceForm.get('image').value).then(
      () => {
        this.sauceForm.reset();
        this.loading = false;
        this.router.navigate(['/part-four/sauces']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  onImagePick(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.sauceForm.get('image').patchValue(file);
    this.sauceForm.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      if (this.sauceForm.get('image').valid) {
        this.imagePreview = reader.result as string;
      } else {
        this.imagePreview = null;
      }
    };
    reader.readAsDataURL(file);
  }
}
