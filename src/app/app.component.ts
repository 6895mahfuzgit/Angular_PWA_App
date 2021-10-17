import {Component, OnInit} from '@angular/core';
import {SwPush, SwUpdate} from "@angular/service-worker";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {


    constructor(private swUpdate:SwUpdate) {

    }

    ngOnInit() {
    console.log('this.swUpdate.isEnabled :',this.swUpdate.isEnabled);
    
      if(this.swUpdate.isEnabled){
        this.swUpdate.available.subscribe(()=>{
           if(confirm("New version available. Locad New Version?")){
             console.log('ddd');
             
             window.location.reload();
           }
        });
      }



    }

}

