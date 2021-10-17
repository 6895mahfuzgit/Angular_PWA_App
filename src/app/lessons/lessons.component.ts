import {Component, OnInit} from '@angular/core';
import {LessonsService} from "../services/lessons.service";
import {Observable, of} from 'rxjs';
import {Lesson} from "../model/lesson";
import {SwPush} from "@angular/service-worker";
import {NewsletterService} from "../services/newsletter.service";
import {catchError} from 'rxjs/operators';

@Component({
    selector: 'lessons',
    templateUrl: './lessons.component.html',
    styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

    lessons$: Observable<Lesson[]>;
    isLoggedIn$: Observable<boolean>;
    sub:PushSubscription;
    readonly VAPID_PUBLIC_KEY = "BDaTcAsOHl5ZCnVGxtBwDPXcP15Q20_o2aDfZOWcB7sxiNxbLQtBhwFCsY2f2UMbZaiBxd-zai-LSCtS0qRa5zU";

    constructor(
        private lessonsService: LessonsService,
        private swPush:SwPush,
        private newsletterService: NewsletterService) {

    }

    ngOnInit() {
        this.loadLessons();
    }


    loadLessons() {
        this.lessons$ = this.lessonsService.loadAllLessons().pipe(catchError(err => of([])));
    }

    subscribeToNotifications() {
      if(this.swPush.isEnabled){
          this.swPush.requestSubscription({
             serverPublicKey: this.VAPID_PUBLIC_KEY
          })
          .then(res=>{
              this.sub=res;
            console.log('Notification Subscription ',res)
           let localSub= this.newsletterService.addPushSubscriber(res).subscribe(()=>{
               console.log('Notification Subscription is Ok');
               localSub.unsubscribe();
            },err=>{
                console.log('Notification Subscription is Not ok. Error: ',err);
            });
          })
          .catch(err=>console.log("Can't not subscribe notification",err));
          
      }
    }


    sendNewsletter() {
     console.log('newsletterService.send() called');
     this.newsletterService.send().subscribe();
    }


    // "publicKey":"BDaTcAsOHl5ZCnVGxtBwDPXcP15Q20_o2aDfZOWcB7sxiNxbLQtBhwFCsY2f2UMbZaiBxd-zai-LSCtS0qRa5zU","privateKey":"EoAYz7t61iZw4-3cyH0mnauEhccw2zRX4IEWAh1rvWU"


}
