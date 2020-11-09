import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { SauceService } from '../../services/stuff.service';
// import { Thing } from '../../models/Thing.model';
import { Sauce } from '../../models/Sauce.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-modify-thing',
  templateUrl: './modify-thing.component.html',
  styleUrls: ['./modify-thing.component.scss']
})
export class ModifyThingComponent implements OnInit {

  sauce: Sauce;
  sauceForm: FormGroup;
  loading = false;
  errorMessage: string;
  part: number;

  private partSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private state: StateService,
              private sauceService: SauceService) { }

  ngOnInit() {
    this.loading = true;
    this.sauceForm = this.formBuilder.group({
      name: [null, Validators.required],
      manufacturer: [null, Validators.required],
      description: [null, Validators.required],
      heat: [0, Validators.required],
      imageUrl: [null, Validators.required],
      mainPepper: [null, Validators.required],
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.state.mode$.next('form');
    this.route.params.subscribe(
      (params) => {
        this.sauceService.getThingById(params.id).then(
          (sauce: Sauce) => {
            this.sauce = sauce;
            this.sauceForm.get('name').setValue(this.sauce.name);
            this.sauceForm.get('manufacturer').setValue(this.sauce.manufacturer);
            this.sauceForm.get('description').setValue(this.sauce.description);
            this.sauceForm.get('heat').setValue(this.sauce.heat);
            this.sauceForm.get('imageUrl').setValue(this.sauce.imageUrl);
            this.sauceForm.get('mainPepper').setValue(this.sauce.mainPepper);
            this.loading = false;
          }
        );
      }
    );
  }

  onSubmit() {
    this.loading = true;
    const sauce = new Sauce();
    sauce.name = this.sauceForm.get('name').value;
    sauce.manufacturer = this.sauceForm.get('manufacturer').value;
    sauce.description = this.sauceForm.get('description').value;
    sauce.heat = this.sauceForm.get('heat').value;
    sauce.imageUrl = this.sauceForm.get('imageUrl').value;
    sauce.mainPepper = this.sauceForm.get('mainPepper').value;
    sauce._id = new Date().getTime().toString();
    sauce.userId = this.sauce.userId;
    this.sauceService.modifyThing(this.sauce._id, sauce).then(
      () => {
        this.sauceForm.reset();
        this.loading = false;
        switch (this.part) {
          case 1:
          case 2:
            this.router.navigate(['/part-one/sauces']);
            break;
          case 3:
            this.router.navigate(['/part-three/sauces']);
            break;
          case 4:
            this.router.navigate(['/part-four/sauces']);
            break;
        }
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
