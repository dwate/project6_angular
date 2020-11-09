import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { SauceService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
//import { Thing } from '../../models/Thing.model';
import { Sauce } from '../../models/Sauce.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stuff-list',
  templateUrl: './stuff-list.component.html',
  styleUrls: ['./stuff-list.component.scss']
})
export class StuffListComponent implements OnInit, OnDestroy {

  public sauce: Sauce[] = [];
 // public stuff: Thing[] = [];
  public part: number;
  public loading: boolean;
  

  private stuffSub: Subscription;
  private partSub: Subscription;

  constructor(private state: StateService,
              private sauceService: SauceService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.state.mode$.next('list');
    this.stuffSub = this.sauceService.sauces$.subscribe(
      (sauces) => {
        this.sauce = sauces;
        this.loading = false;
      }
    );
    this.partSub = this.state.part$.subscribe(
      (part) => {
        this.part = part;
      }
    );
    this.sauceService.getSauces();
  }

  onProductClicked(id: string) {
    if (this.part === 1) {
      this.router.navigate(['/part-one/sauce/' + id]);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/sauce/' + id]);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/sauce/' + id]);
    }
  }

  ngOnDestroy() {
    this.stuffSub.unsubscribe();
    this.partSub.unsubscribe();
  }

}
