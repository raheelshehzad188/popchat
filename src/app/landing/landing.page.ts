import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService, Note } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { MainsevService } from '../services/mainsev.service';
import {  MenuController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

// capacitor
import { PushNotifications } from '@capacitor/push-notifications';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
    user : any;
    showload:any = 0;
    tokken:any = '';
    constructor(
        private router: Router,
        public activatedRoute : ActivatedRoute,
        private dataService: DataService,
        private storage: Storage,
        public menuCtrl: MenuController,
        private mymain: MainsevService,
        public platform: Platform
    ) 
    {
       
    }

    start()
    {
        this.showload = 1;
        var current = new Date();
        var timestamp = current.getTime();
        this.user = timestamp;
        // alert(this.tokken);
        if(this.tokken == '')
        {
            this.mymain.showtoast('There was a error!','error');
        }
        else
        { 
            this.dataService.add({ token: this.user,pushtoken:this.tokken },'users').then((docRef) => {
                this.storage.set('login',1);
                this.storage.set('logindata',docRef.id);
                // alert(localStorage.getItem('login'));
                // console.log("Document written with ID: ", docRef.id);
                this.router.navigate(['/creat-room']);
                this.showload = 0;
                return false;
            });
        }
        
    }

    uneven()
    {

    }

    ngOnInit() 
    {

    }


    async ionViewWillEnter()
    {
        this.showload = 0;
        this.tokken = '';
        this.menuCtrl.enable(false);
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
            
        await PushNotifications.addListener('registration', token => {
            // console.info('Registration token: ', token.value);
            // alert(token.value);
            this.tokken = token.value;
        });

        await PushNotifications.addListener('registrationError', err => {
            this.mymain.showtoast('There was a error in notification','error');
        });

        await PushNotifications.addListener('pushNotificationReceived', notification => {
            console.log('Push notification received: ', notification);
            alert('recived');
        });

        await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
            console.log('Push notification action performed', notification.actionId, notification.inputValue);
            alert('performed');
        });


        let permStatus = await PushNotifications.checkPermissions();

        if (permStatus.receive === 'prompt') {
            permStatus = await PushNotifications.requestPermissions();
        }

        if (permStatus.receive !== 'granted') {
            // throw new Error('User denied permissions!');
            this.mymain.showtoast('No Permission for Notification!','error');
        }

        await PushNotifications.register();

          // const notificationList = await PushNotifications.getDeliveredNotifications();
          // console.log('delivered notifications', notificationList);
    }





}
