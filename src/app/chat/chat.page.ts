import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Note } from '../services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {  MenuController } from '@ionic/angular';
import { MainsevService } from '../services/mainsev.service';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import {createElementCssSelector} from "@angular/compiler";
import { interval } from 'rxjs';

import {
  Firestore,
  collection,
  collectionData,
  doc,
  query,
  getDocs,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
@Pipe({ name: 'timeAgo' })

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  chat: any;
  myId: any;
  user: any;
  txt: any = '';
  block: any;
  blist: any;
  mylat: any;
  mylng: any;
  cdate: any;
  sec: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private dataService: DataService,
    private router: Router,
    private storage: Storage,
    private firestore: Firestore,
    private mymain: MainsevService,
    public menuCtrl: MenuController
  ) {
    this.block = 0;

  }
  place: any;
  async getmelanlong()
  {
    // alert("ok");
    const permission = await Geolocation.checkPermissions();
    // console.log(permission);
    if(permission.location ==  'granted')
    {
      this.place = '';
      //alert("ook");
      const coordinates = await Geolocation.getCurrentPosition();
      this.mylat = coordinates.coords.latitude;
      this.mylng = coordinates.coords.longitude;
      const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+this.mylat+','+this.mylng+'&key=AIzaSyD24-sUYd8QLi6kdRUvX7myezG3a6c8U-Q';
      this.http.get(url).subscribe((response) => {
        // this.response = response;
        if(response['plus_code']) {
          this.place = response['plus_code'].compound_code;
          // console.log(response['plus_code']['compound_code']);
        }
      });
    }
    else
    {
      // alert(JSON.stringify(permission));
      const permissionok = await Geolocation.requestPermissions();
      if(permissionok)
      {
        this.getmelanlong();
      }
      //this.mymain.showtoast("No location permission","error");
    }


  }
  timeSince(date) {
    this.cdate = new Date();
    this.sec = Math.floor((this.cdate - date) / 1000);
    let diff = Math.round(( this.cdate - date ) / 1000)
    console.log(diff+" diff");
    let interval = this.sec / 31536000;
    const SECOND   = 1;
    const MINUTE   = 60;
    const HOUR     = 3600;
    const DAY      = 86400;
    const MONTH    = 2629746;
    const YEAR     = 31556952;
    const DECADE   = 315569520;
    let unit = '';
    let num = 0;
    let plural = false;
    switch(true){
      case diff <= 0:
        return 'just now';
        break;

      case diff < MINUTE:
        num = Math.round(diff / SECOND);
        unit = 'sec';
        plural = num > 1;
        break;

      case diff < HOUR:
        num = Math.round(diff / MINUTE);
        unit = 'min';
        plural = num > 1;
        break;

      case diff < DAY:
        num = Math.round(diff / HOUR);
        unit = 'hour';
        plural = num > 1;
        break;

      case diff < MONTH:
        num = Math.round(diff / DAY);
        unit = 'day';
        plural = num > 1;
        break;

      case diff < YEAR:
        num = Math.round(diff / MONTH);
        unit = 'month';
        plural = num > 1;
        break;

      case diff < DECADE:
        num = Math.round(diff / YEAR);
        unit = 'year';
        plural = num > 1;
        break;

      default:
        num = Math.round(diff / YEAR);
        unit = 'year';
        plural = num > 1;
    }
    let str = '';
    if(num){
      str += `${num} `;
    }
    str += `${unit}`;

    if(plural){
      str += 's';
    }

    str += ' ago';

    return str;
  }
  uexist : any;
  user_exist(){

    let ret = false;
    console.log("this.grp_usrs");
    for (let i = 0;i <=this.grp_usrs.length;i++)
    {
      if(this.grp_usrs[i] == this.user && !ret)
      {
        ret = true;
      }
    }

    // console.log(this.grp_usrs);
    return ret;
  }
  send()
  {    if(this.txt == '')
  {
    this.mymain.showtoast("Enter Valid Message","error");
  }
  else
  {
    let text = this.txt;
    this.storage.get('logindata').then((name) => {
      this.user = name;
      const current = new Date();
      const timestamp = current.getTime();
      this.txt = '';
      this.dataService.add({ msg:text ,user:this.user,grp : this.myId,date:Date.now(),ts:timestamp,place:this.place },'chat').then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));
        // console.log("Document written with ID: ", docRef.id);
        this.txt = '';
        // this.router.navigate(['/chat?'+docRef.id]);
      });
    });
  }
  }
  frequests : any;
  reson_show : any;
  reason : any;
  grp_usrs : any;
  join_process : any;
  join() {
    this.dataService.getwhere('grup_to_usrs','grp',this.myId).subscribe(res => {

      const list  = res.reverse();
      // alert('Group users list');
      // console.log(list);
      this.blist = [];
      for(let i = 0;i<= list.length-1;i++)
      {
        this.grp_usrs.push(list[i]['usr']);
      }

      if(!this.user_exist() && !this.join_process)
      {
        this.join_process = 1;
        this.dataService.add({grp:this.myId,usr:this.user,status:1,live:0},'grup_to_usrs').then((docRef) =>{
          // alert("User request done");
          const current = new Date();
          const timestamp = current.getTime();
          this.dataService.add({ msg:'New user join' ,user:this.user,grp : this.myId,date:Date.now(),ts:timestamp,place:this.place,join:1 },'chat').then((docRef) =>{
            // localStorage.setItem('login', docRef.id); // setting
            // alert(localStorage.getItem('login'));
            // console.log("Document written with ID: ", docRef.id);
            this.txt = '';
            // this.router.navigate(['/chat?'+docRef.id]);
          });
        });
      }

    });

  }
  accept_r: any;
  pend_r: any;
  myrequests()
  {
    let dhat = [];
    this.pend_r = [];
    this.accept_r = [];
    console.log('F request srt');


    const notesRef = collection(this.firestore, 'frequest');
    // notesRef;
    let q = query(notesRef, where('fusr', '==', this.user));
    // let q1 = query(notesRef, where("tusr", "in", [this.user,this.myid]));
    const querySnapshot = getDocs(q);

    querySnapshot.then(res=> {
      res.forEach((doc1) => {


        //new real time logic
        // this.chat = [];
        // doc.data() is never undefined for query doc snapshots
        let dta = doc1.data();
        console.log(dta);
        dta['id'] = doc1.id;

        if (dta['status'] == 1) {


          // this.mchat.push(doc1.data());
          this.accept_r.push(dta['tusr']);
        }
        else {
          this.pend_r.push(dta['tusr']);
        }
      });

      const array =dhat;

      const key = 'id';

      const arrayUniqueByKey = [...new Map(array.map(item =>
        [item[key], item])).values()];
      dhat = arrayUniqueByKey;


    });
    const notesRef1 = collection(this.firestore, 'frequest');
    // notesRef;
    let q1 = query(notesRef1, where('tusr', '==', this.user));
    // let q1 = query(notesRef, where("tusr", "in", [this.user,this.myid]));
    const querySnapshot1 = getDocs(q1);

    querySnapshot1.then(res=> {
      res.forEach((doc1) => {
        // doc.data() is never undefined for query doc snapshots
        console.log("test 88");
        console.log(doc1.data());
        let dta = doc1.data();
        if (dta['status'] == 1) {


          // this.mchat.push(doc1.data());
          this.accept_r.push(dta['tusr']);
        }
        else {
          this.pend_r.push(dta['tusr']);
        }
      });

    });

    console.log("F request end");
  }
  ngOnInit() {
    // this.ionViewWillEnter();
    //user
    this.grp_usrs = [];
    this.frequests = [];
    this.storage.get('logindata').then((name) => {
      this.user = name;

      //alert(this.user);
      this.join();
      this.myrequests();
      this.dataService.getwhere('chat','grp',this.user).subscribe(res => {
        this.chat = res.reverse();
        const prop = 'ts';
        this.chat.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
        // console.log("Al chat");
        console.log(this.chat);
      });

    });




    this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
    this.storage.set('code',this.myId);
  }
  action(t)
  {
    if(t == 'pchat')
    {
      let navigationExtras = {
        uid: this.block,
      };
      this.router.navigate(['/pchat',navigationExtras]);
      return  0;
      //check request accepted
      console.log(this.frequests);
      console.log("this.accept_r");
      console.log(this.accept_r);
      console.log("this.pend_r");
      console.log(this.pend_r);
      if(!this.pend_r.includes(this.block) && !this.accept_r.includes(this.block))
      {
        const current = new Date();
        const timestamp = current.getTime();
        this.dataService.add( {
          'fusr':this.user,
          'tusr':this.block,
          'ts': timestamp,
          'status':0,
        } ,'frequest').then((docRef) => {
          this.pend_r.push(this.block);
          // alert();

          this.mymain.showtoast("Request submit successfully","success");


          this.block = 0;
        });

      }
      else {
        if(this.accept_r.includes(this.block))
        {
          let navigationExtras = {
            uid: this.block,
          };
          this.router.navigate(['/pchat',navigationExtras]);
        }
        else {
          this.mymain.showtoast("Request pending","error");
          this.block = 0;
          // alert("Request pending");
        }
      }
      return  0;

      // alert(t);
    }
    else if(t == 'block')
    {
      this.dataService.add({ tuser:this.block ,fuser:this.user, },'block_list').then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));

        // console.log("Document written with ID: ", docRef.id);
        this.block = false;
        // this.router.navigate(['/chat?'+docRef.id]);
      });
    }
    else if(t == 'mute')
    {
      this.dataService.add({ tuser:this.block ,fuser:this.user, },'mute_list').then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));

        // console.log("Document written with ID: ", docRef.id);
        this.block = false;
        // this.router.navigate(['/chat?'+docRef.id]);
      });
    }
    else if(t == 'unmute')
    {
      let id = this.mlist[this.block];
      this.dataService.deleteNote( 'mute_list',id).then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));
        delete this.mlist[this.block];
        // alert(docRef);

        // console.log("Document written with ID: ", docRef.id);
        this.block = false;
        // this.router.navigate(['/chat?'+docRef.id]);
      });
    }
    else if(t == 'report')
    {
      // alert("ok");
      this.dataService.add({ tuser:this.block ,fuser:this.user,reason:this.reason },'report_list').then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));
        this.reson_show = 0;
        this.reason = ' ';

        // console.log("Document written with ID: ", docRef.id);
        this.block = false;
        // this.router.navigate(['/chat?'+docRef.id]);
      });
    }
  }
  check_block(id)
  {
    return this.blist[id];
  }
  check_mute(id)
  {
    return this.mlist[id];
  }

  closepop()
  {
    // alert('ok');
    this.block = false;
  }
  mlist : any;
  ngOnDestroy() {
    alert("leave="+this.gusr);
    let up = {
      'grp':this.myId,
      'usr':this.user,
      'live': -1
    };
    this.dataService.update('grup_to_usrs',this.gusr,up).then((docRef) =>{
      console.log("Leave updated");
      this.gusr = 0;
      console.log(docRef);
    });
  }
  gusr: any;
  drp_usr()
  {
    const notesRef = collection(this.firestore, 'grup_to_usrs');
    // notesRef;
    let q = query(notesRef, where('grp', '==', this.myId));
    // let q1 = query(notesRef, where("tusr", "in", [this.user,this.myid]));
    const querySnapshot = getDocs(q);

    querySnapshot.then(res=> {
      res.forEach((doc1) => {
        // console.log("Group userz");
        // console.log(doc1.data().usr);
        if(doc1.data().usr == this.user)
        {

          this.gusr = doc1.id;
          interval(1000).subscribe(x => {
            // alert(this.gusr);
            let up = {
              'grp':this.myId,
              'usr':this.user,
              'live': Math.round(new Date().getTime()/1000)
            };
            if(this.gusr) {
              this.dataService.update('grup_to_usrs', this.gusr, up).then((docRef) => {
                console.log("updated");
                console.log(docRef);
              });
            }
          });
          // alert(this.gusr);
        }
      });
      });

  }
  ionViewWillEnter()
  {

    this.mlist = [];
    this.txt = '';
    this.block = false;
    const permissionok = Geolocation.requestPermissions();
    if(permissionok)
    {
      this.getmelanlong();
    }
    this.menuCtrl.enable(true);
    this.storage.get('login').then((name) => {
      // console.log(name);
      if(name == 0)
      {
        this.router.navigate(['/landing']);
      }
    });



    //get block list
    this.grp_usrs = [];
    console.log("KLogin user = "+this.user);
    this.dataService.getwhere('mute_list','fuser',this.user).subscribe(res => {
      let list = res;
      for(let i = 0;i<= list.length-1;i++)
      {

        if(list[i].fuser == this.user)
        {
          // let in = {}
          this.mlist[list[i].tuser] = list[i].id;
          // console.log("line 467");
          // console.log(list[i]);
          // this.mlist.push(list[i].tuser);
        }
      }
      this.drp_usr();
      console.log("Mute list");
      console.log(this.mlist);


    });

    this.dataService.getwhere('block_list','fuser',this.user).subscribe(res => {
      const list  = res.reverse();
      console.log('Block list');
      console.log(list);
      this.blist = [];
      for(let i = 0;i<= list.length-1;i++)
      {
        if(list[i].fuser == this.user)
        {this.blist[list[i].tuser] = list[i].id;}
      }
      console.log(this.blist);
      this.dataService.getwhere('chat','grp',this.myId).subscribe(res => {
        this.chat = res.reverse();
        const prop = 'ts';
        this.chat.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
        // console.log("Al chat");
        console.log(this.chat);
      });
    });
    //get group users
    this.dataService.getwhere('grup_to_usrs','grp',this.myId).subscribe(res => {
      const list  = res.reverse();
      console.log('Group users list');
      console.log(list);
      this.blist = [];
      for(let i = 0;i<= list.length-1;i++)
      {
        if(list[i].fuser == this.user)
        {this.blist[list[i].tuser] = list[i].id;}
      }
      console.log(this.blist);
      this.dataService.getwhere('chat','grp',this.myId).subscribe(res => {
        this.chat = res.reverse();
        const prop = 'ts';
        this.chat.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
        // console.log("Al chat");
        console.log(this.chat);
      });
    });

    this.storage.get('logindata').then((name) => {
      this.user = name;
      // alert("Here strt logic");
      this.dataService.get('frequest').subscribe(res => {
        this.myrequests();
      });
    });
  }



}
