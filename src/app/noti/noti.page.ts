import { Component, OnInit } from '@angular/core';
import { MainsevService } from '../services/mainsev.service';
import { DataService, Note } from '../services/data.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-noti',
  templateUrl: './noti.page.html',
  styleUrls: ['./noti.page.scss'],
})
export class NotiPage implements OnInit {

    user : any;
    dataod:any ='';
    pepperoni:any ='';
    statuscheck :any = 1;
    constructor(
        private  myser : MainsevService,
        private  dataservice : DataService,
        private  storage : Storage,
    ) 
    {

    }

    ngOnInit() {

    }

    ionViewWillEnter()
    {
        this.statuscheck = 1;
        this.dataod = '';
        this.storage.get('logindata').then((name) => {
            // alert(name);
            this.dataservice.getwhere('users','id',name).subscribe(res=>{
                // alert(JSON.stringify(res));
                this.dataod = res;
                this.dataod.forEach((currentValue, index) => {
                    if(currentValue.id == name)
                    {
                        // alert('ok');
                        this.statuscheck = 1;
                        if(currentValue.notistatus)
                        {
                            this.statuscheck = 0;
                        }
                    }
                });
            });
            // this.user = name;
        });
    }

    updatedod(){
        if(this.statuscheck == 1)
        {

        }
        else
        {    

        }
        this.myser.showtoast('Updated','success');
    }

}
