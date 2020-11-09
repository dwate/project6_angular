import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Thing } from '../../models/Thing.model';
import { Sauce } from '../../models/Sauce.model';
import { SauceService } from '../../services/stuff.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-new-thing',
  templateUrl: './new-thing.component.html',
  styleUrls: ['./new-thing.component.scss']
})
export class NewThingComponent implements OnInit, OnDestroy {

  public sauceForm: FormGroup;
  public loading = false;
  public part: number;
  public userId: string;
  public errorMessage: string;

  private partSub: Subscription;

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
      imageUrl: [null, Validators.required],
      mainPepper: [null, Validators.required]
    });
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.userId = this.part >= 3 ? this.auth.userId : 'userID40282382';
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
    sauce.userId = this.userId;
    this.sauceService.createNewThing(sauce).then(
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
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.partSub.unsubscribe();
  }

}
