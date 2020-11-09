import { Component, OnDestroy, OnInit } from '@angular/core';
import { StateService } from '../../services/state.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
// import { Thing } from '../../models/Thing.model';
import { Sauce } from '../../models/Sauce.model';
import { SauceService } from '../../services/stuff.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-single-thing',
  templateUrl: './single-thing.component.html',
  styleUrls: ['./single-thing.component.scss']
})
export class SingleThingComponent implements OnInit, OnDestroy {

  //public thing: Thing;
  public sauce: Sauce;
  public loading: boolean;
  public userId: string;
  public part: number;
  public likePending: boolean;
  public liked: boolean;
  public disliked: boolean;
  public likeLogic: number;
  private partSub: Subscription;
 
  constructor(private state: StateService,
              private router: Router,
              private route: ActivatedRoute,
              private sauceService: SauceService,
              private auth: AuthService) { }

  

  ngOnInit() {
   
    this.loading = true;
    this.state.mode$.next('single-thing');
    this.userId = this.auth.userId /*? this.auth.userId : 'userID40282382'*/;
    this.route.params.subscribe(
      (params: Params) => {
        this.sauceService.getThingById(params.id).then(
          (sauce: Sauce) => {
            this.loading = false;
            this.sauce = sauce;
            
            if (sauce.usersLiked.find(user => user === this.userId)) {
              this.liked = true;
             
            } else if (sauce.usersDisliked.find(user => user === this.userId)) {
              this.disliked = true; 
             
            } //console.log(this.liked, this.disliked);
     
     
          }
        );
      }
    );
        this.partSub = this.state.part$.subscribe(
          (part) => {
            this.part = part;
            if (part >= 3) {
              this.userId = this.auth.userId;
            }
          }
        );
      }
      
      likeStatus() {
      const likeButton = document.getElementById('lthumb');
      const dislikeButton = document.getElementById('dthumb');
     
      if  (this.sauce.usersLiked.find(user => user === this.userId)) {
        likeButton.classList.add('selected');
        console.log("likestatus wheres my selected");
      } else if (this.sauce.usersDisliked.find(user => user === this.userId)) { 
        dislikeButton.classList.add('selected');
        console.log("dislikestatus wheres my selected");
    } else {
      console.log("is like status loading?");
      return;
    }
    
  };
      
        
  ngAfterContentChecked() {
    ()=> this.likeStatus
  };  
        
        

      //  dislikeButton.classList.remove("selected");
     //   console.log(this.liked);
       // else if (this.disliked = true) {
    //    dislikeButton.classList.add("selected");
   //     likeButton.classList.remove("selected");
   //   }console.log(this.liked, this.disliked);
    

  onLike() {
    if (this.disliked) { 
   //   console.log("like return");
      this.onDislike()
      return 0;
         }
    this.likePending = true;
        this.sauceService.likeSauce(this.sauce._id, !this.liked).then(
          (liked: boolean) => {
            this.likePending = false; 
            this.liked = liked;
            
            if (liked) {
              this.sauce.likes++;
            } else {
              this.sauce.likes--;
            }
       //  console.log(this.liked, this.disliked, this.sauce.likes);
       //  () => this.ngOnInit()
      }
          ); //this.likeStatus()
      };

onDislike() {
  if (this.liked) {
    this.onLike()
    return 0;
  }
  this.likePending = true;
  this.sauceService.dislikeSauce(this.sauce._id, !this.disliked).then(
    (disliked: boolean) => {
      this.likePending = false;
      this.disliked = disliked;
      
      if (disliked) {
        this.sauce.dislikes++;
      } else {
        this.sauce.dislikes--;
      }
//  console.log(this.liked, this.disliked, this.sauce.likes, this.sauce.dislikes);
    }
  ); //this.likeStatus()
};
                
     
  


  onGoBack() {
    if (this.part === 1) {
      this.router.navigate(['/part-one/sauces']);
    } else if (this.part === 3) {
      this.router.navigate(['/part-three/sauces']);
    } else if (this.part === 4) {
      this.router.navigate(['/part-four/sauces']);
    }
  }

  onModify() {
    switch (this.part) {
      case 1:
      case 2:
        this.router.navigate(['/part-one/modify-sauce/' + this.sauce._id]);
        break;
      case 3:
        this.router.navigate(['/part-three/modify-sauce/' + this.sauce._id]);
        break;
      case 4:
        this.router.navigate(['/part-four/modify-sauce/' + this.sauce._id]);
        break;
    }
  }

  onDelete() {
    this.loading = true;
    this.sauceService.deleteThing(this.sauce._id).then(
      () => {
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
    );
  }



  ngOnDestroy() {
    this.partSub.unsubscribe();
  }
}
