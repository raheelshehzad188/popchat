import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService, Note } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { MainsevService } from '../services/mainsev.service';
//import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-creat-room',
  templateUrl: './creat-room.page.html',
  styleUrls: ['./creat-room.page.scss'],
})
export class CreatRoomPage implements OnInit {

    constructor(
        private router: Router,
        public activatedRoute : ActivatedRoute,
        private dataService: DataService,
        private mymain: MainsevService,
        private storage: Storage,
        //private geolocation: Geolocation
    )
    {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
          const longitude = position.coords.longitude;
          const latitude = position.coords.latitude;
          this.mylat = latitude;
          this.mylng = longitude;
          // alert(longitude);
          // this.callApi(longitude, latitude);
        });
      } else {
        console.log("No support for geolocation")
      }
    }
    mylat:any;
    mylng:any;
    gname: any;
    user: any;
    groups: any;

    create()
    {
        this.storage.get('logindata').then((name) => {
            this.mymain.showtoast('Room Created!','success');
            this.user = name;
            this.dataService.add({ name:this.gname ,user:this.user,lat:this.mylat,lng: this.mylng },'groups').then((docRef)=>{
                // console.log(docRef.id);
                this.chat(docRef.id);
                this.gname = '';
            });
        });

    }
  calcCrow(lat1, lon1, lat2, lon2)
  {
    var R = 6371; // km
    var dLat = this.toRad(lat2-lat1);
    var dLon = this.toRad(lon2-lon1);
    lat1 = this.toRad(lat1);
    lat2 = this.toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  toRad(Value)
  {
    return Value * Math.PI / 180;
  }


    chat(id)
    {
        this.router.navigate(['/chat/'+id]);
    }

    ngOnInit()
    {

    }

    ionViewWillEnter()
    {
        this.storage.get('login').then((name) => {
            // console.log(name);
            if(name == 0)
            {
                this.router.navigate(['/landing']);
            }
        });
        this.dataService.get('groups').subscribe(res => {
            this.groups = res;
          this.groups.forEach((currentValue, index) => {
            this.groups[index]['dist'] = this.calcCrow(this.mylat,this.mylng,currentValue['lat'],currentValue['lng']).toFixed(1);
            console.log(currentValue);
          });

          // console.log(this.groups);
          //calcCrow(lat1, lon1, lat2, lon2)
        });

        this.storage.get('logindata').then((name) => {
            this.user = name;
        });

    }

}
