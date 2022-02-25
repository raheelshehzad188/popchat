import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
// import { Storage } from '@capacitor/storage';
import { ToastController } from '@ionic/angular';

import { BehaviorSubject } from 'rxjs';
// import * as moment from 'moment';/

@Injectable({
  providedIn: 'root'
})
export class MainsevService {
	myloadi:any;
	retunrlogin:any;
	myloaditoast:any;
	private userstatus = new BehaviorSubject<string>('0');
	cast = this.userstatus.asObservable();

	constructor(
		public loadingController: LoadingController,
		// private storage: Storage,
		public toastController: ToastController
	) 
	{
		// this.storage.get('login').then((name) => {
		// 	this.userstatus.next(name);
		// 	//console.log(name);
  // 		});
	}

	editobsver(value)
	{
		this.userstatus.next(value);
	}

	showloader(msg)
	{
	 	this.myloadi =  this.loadingController.create({
	 		spinner:'crescent',
	 		cssClass:'custom_load',
      		message: msg,
	    }).then((res) => {
	        res.present();
	        res.onDidDismiss().then((dis) => {
	          console.log('Loading dismissed! after 2 Seconds');
	        });
     	});
	}

	closeloader()
	{
		this.loadingController.dismiss();
	}


	showtoast(msg,clasds)
	{
	 	this.myloaditoast =  this.toastController.create({
      		message: msg,
      		cssClass:clasds,
      		duration: 3000
	    }).then((res) => {
	        res.present();
	        res.onDidDismiss().then((dis) => {
	          console.log('Loading dismissed! after 2 Seconds');
	        });
     	});
	}

	closetoast()
	{
		this.toastController.dismiss();
	}

	async simpletoast(header,msg,clasds)
	{
	 	const toast = await this.toastController.create({
	 		header: header,
	      message: msg,
	      cssClass:clasds,
	      duration: 3000
	    });
	    toast.present();
	}

	ngOnInit() 
	{
		// alert('hj');
	}

	urlforshare()
	{
		return "https://popchat24.com/";
	}



}
