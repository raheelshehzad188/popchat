import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService, Note } from '../services/data.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
    user : any
    constructor(
        private router: Router,
        public activatedRoute : ActivatedRoute,
        private dataService: DataService,
        private storage: Storage,
    ) 
    {
       
    }

    start()
    {
        var current = new Date();
        var timestamp = current.getTime();
        this.user = timestamp;
        this.dataService.add({ token: this.user },'users').then((docRef) => {
            this.storage.set('login',1);
            this.storage.set('logindata',docRef.id);
            // alert(localStorage.getItem('login'));
            // console.log("Document written with ID: ", docRef.id);
            this.router.navigate(['/creat-room']);
            return false;
        });
    }

    ngOnInit() 
    {

    }


    ionViewWillEnter()
    {
        this.storage.get('login').then((name) => {
            // alert(name);
            if(name == null)
            {

            }
            else if(name != 0)
            {
                this.router.navigate(['/creat-room']);
            }
        });
    }



}
