import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StateService } from '../../services/state.service';
import { SauceService } from '../../services/stuff.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { mimeType } from '../mime-type.validator';
// import { Thing } from '../../models/Thing.model';
import { Sauce } from '../../models/Sauce.model';

@Component({
  selector: 'app-modify-thing-with-upload',
  templateUrl: './modify-thing-with-upload.component.html',
  styleUrls: ['./modify-thing-with-upload.component.scss']
})
export class ModifyThingWithUploadComponent implements OnInit {

  public sauceForm: FormGroup;
  public sauce: Sauce;
  public loading = false;
  public part: number;
  public userId: string;
  public imagePreview: string;
  public errorMessage: string;

  constructor(private state: StateService,
              private formBuilder: FormBuilder,
              private sauceService: SauceService,
              private route: ActivatedRoute,
              private router: Router,
              private auth: AuthService) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('form');
    this.userId = this.auth.userId;
    this.route.params.subscribe(
      (params) => {
        this.sauceService.getThingById(params.id).then(
          (sauce: Sauce) => {
            this.sauce = sauce;
            this.sauceForm = this.formBuilder.group({
              name: [null, Validators.required],
              manufacturer: [null, Validators.required],
              description: [null, Validators.required],
              heat: [0, Validators.required],
              image: [null, Validators.required, mimeType],
              mainPepper: [null, Validators.required]              
            });
            this.imagePreview = sauce.imageUrl;
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const sauce = new Sauce();
    sauce._id = this.sauce._id;
    sauce.name = this.sauceForm.get('name').value;
    sauce.manufacturer = this.sauceForm.get('manufacturer').value;
    sauce.description = this.sauceForm.get('description').value;
    sauce.heat = this.sauceForm.get('heat').value;
    sauce.imageUrl = '';
    sauce.userId = this.userId;
    this.sauceService.modifyThingWithFile(this.sauce._id, sauce, this.sauceForm.get('image').value).then(
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
    console.log(file);
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
