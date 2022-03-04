import { Component, OnInit } from '@angular/core';
import { MainsevService } from '../services/mainsev.service';
import { DataService, Note } from '../services/data.service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-freq',
  templateUrl: './freq.page.html',
  styleUrls: ['./freq.page.scss'],
})
export class FreqPage implements OnInit {
  user : any;
  constructor(
    private  myser : MainsevService,
    private  dataservice : DataService,
    private  storage : Storage,
  ) { }
  req : any;
  accept(data)
  {
    data.status = 1;
    data.show = 0;
    this.dataservice.update('frequest',data.id,data).then((docRef) => {
      console.log(docRef);
    });
  }



  ngOnInit() {
    this.req = [];
    //dataservice
    this.storage.get('logindata').then((name) => {
      this.user = name;
      console.log(this.user);
      this.dataservice.getwhere('frequest','tusr',this.user).subscribe(res => {
        this.req = [];
        for(let i = 0;i<= res.length-1;i++)
        {
          if(res[i].status == 0) {
            console.log(res[i]);
            res[i]['show'] = 0;
            this.req.push(res[i]);
          }
        }
      });
      });//storage end
    console.log(this.req);
  }

}
