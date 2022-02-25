import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService, Note } from '../services/data.service';
import { Storage } from '@ionic/storage';
import { MainsevService } from '../services/mainsev.service';
//import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Geolocation } from '@capacitor/geolocation';
import {  MenuController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-creat-room',
  templateUrl: './creat-room.page.html',
  styleUrls: ['./creat-room.page.scss'],
})
export class CreatRoomPage implements OnInit {
    mylat:any;
    mylng:any;
    gname: any = '';
    response: any = '';
    user: any;
    groups: any;
    showcontent: any = 0;
    showload: any = 0;

    type:any = 0;
    mileofroom: any = 30;
    mileoffilter: any = 25;
    countires: any = '';
    mycountry: any = '';
    mystate: any = '';
    country: any = '';
    countryrooom: any = '';

    constructor(
        private router: Router,
        public activatedRoute : ActivatedRoute,
        private dataService: DataService,
        private mymain: MainsevService,
        private storage: Storage,
        public menuCtrl: MenuController,
        private http: HttpClient,
        //private geolocation: Geolocation
    )
    {
        // if (navigator.geolocation)
        // {
        //     navigator.geolocation.getCurrentPosition((position)=>{
        //       const longitude = position.coords.longitude;
        //       const latitude = position.coords.latitude;
        //       this.mylat = latitude;
        //       this.mylng = longitude;
        //       // alert(longitude);
        //       // this.callApi(longitude, latitude);
        //     });
        // } else {
        //     console.log("No support for geolocation")
        // }
    }


    create()
    {
        let valtosend = this.mileofroom;
        if(this.type == 1)
        {
            valtosend = this.country;
        }

        if(this.type == 2)
        {
            valtosend = this.country;
        }

        if(this.gname == '')
        {
            this.mymain.showtoast("Enter Valid Room name","error");
        }
        else
        {
            if(valtosend == '')
            {
                this.mymain.showtoast("Select Valid Country","error");
            }
            else
            {
                this.showload  = 1;
                this.storage.get('logindata').then((name) => {
                    this.mymain.showtoast('Room Created!','success');
                    this.user = name;
                    this.dataService.add({ name:this.gname ,user:this.user,lat:this.mylat,lng: this.mylng , type:this.type, gvalue: valtosend },'groups').then((docRef)=>{
                        // console.log(docRef.id);
                        this.chat(docRef.id);
                        this.gname = '';
                    });
                });
            }
        }

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
        this.showcontent = 0;
        this.showload = 0;
        this.gname = '';
        this.countires = '';
        this.country = '';
        this.mycountry = '';
        this.mystate = '';
        this.countryrooom = '';

        this.type = 0;
        this.mileofroom = 30;
        this.menuCtrl.enable(false);
        this.getmelanlong();
        this.storage.get('login').then((name) => {
            // console.log(name);
            if(name == 0)
            {
                this.router.navigate(['/landing']);
            }
        });

        this.storage.get('logindata').then((name) => {
            this.user = name;
        });

        this.getallcountries();

    }

    getallcountries()
    {
        this.showload  = 1;
        const url = 'https://restcountries.com/v3.1/all';
        this.http.get(url).subscribe((response) => {
            this.countires = response;
            // console.log(this.countires);
            this.showload  = 0;
        });

    }

    getmylocationdetail()
    {
        this.showload  = 1;
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.mylat+','+this.mylng+'&key=AIzaSyD24-sUYd8QLi6kdRUvX7myezG3a6c8U-Q';
        this.http.get(url).subscribe((response) => {
            this.response = response;
            this.mycountry = this.response.results[this.response.results.length - 1];
            this.mystate = this.response.results[this.response.results.length - 2];
            this.showload  = 0;
        });
    }

    changetype(type)
    {
        this.type = type;
    }

    async getmelanlong()
    {
        // alert("ok");
        let permission = await Geolocation.checkPermissions();
        // console.log(permission);
        if(permission.location ==  "granted")
        {
          //alert("ook");
            this.countryrooom = [];
            let coordinates = await Geolocation.getCurrentPosition();
            this.mylat = coordinates.coords.latitude;
            this.mylng = coordinates.coords.longitude;
            this.dataService.get('groups').subscribe(res => {
            this.groups = res;
                this.groups.forEach((currentValue, index) => {
                    this.groups[index]['dist'] = this.calcCrow(this.mylat,this.mylng,currentValue['lat'],currentValue['lng']).toFixed(1);
                });
                this.groups.forEach((currentValue, index) => {
                    if(currentValue.type == 2 && currentValue.user != this.user)
                    {
                        this.countryrooom.push(currentValue);
                    }
                });
                this.showcontent = 1;
              console.log(this.countryrooom);
              //calcCrow(lat1, lon1, lat2, lon2)
            });
            // alert(this.mylng);
            this.getmylocationdetail();
        }
        else
        {
            // alert(JSON.stringify(permission));
            let permissionok = await Geolocation.requestPermissions();
            if(permissionok)
            {
                this.getmelanlong();
            }
            this.mymain.showtoast("No location permission","error");
        }


    }

}
