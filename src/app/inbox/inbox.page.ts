import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import {ActivatedRoute,Router} from '@angular/router';
import { DataService } from '../services/data.service';
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


@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {

  constructor(
    private  router : Router,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private dataService: DataService,
    private storage: Storage,

  ) { }
  mchat : any;
  fchat : any;
  chat : any;
  user : any;
  users : any;
  goChat(usr)
  {
    let navigationExtras = {
      uid: usr,
    };
    // this.getMdata(usr,1);
   this.router.navigate(['/pchat',navigationExtras]);
  }
  getMdata(usr,type = 0) {
    console.log(usr);
    let r = {};
    for (let i in this.chat) {
      let value = this.chat[i];
      if(value)
      {
        if (this.chat[i]['tusr'] == usr || this.chat[i]['user'] == usr) {
          this.chat[i]['suser'] = usr;
          r = this.chat[i];

          // console.log(this.chat[i]);
        }

      }
      // Use `key` and `value`
    }
    console.log(r);
    return r;
  }
  allusers : any;
  loadchat()
  {
    console.log("My id");
    console.log(this.user);
    this.chat = [];
    this.users = [];
    this.allusers = [];
    //new real time logic
    this.dataService.getwhere('pchat','user',this.user).subscribe(res => {
      let chat = res.reverse();
      // this.chat = [];
      chat.forEach((doc1) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log();
        this.mchat = [];
        this.fchat = [];
        if(true) {
          if(doc1.tusr == this.user) {
              if (!this.users.includes(doc1.user)) {
                this.users.push(doc1.user);
              }
          }
          else
          {
            if (!this.users.includes(doc1.tusr)) {

              this.users.push(doc1.tusr);
            }
          }


          this.mchat.push(doc1);
          this.chat.push(doc1);
        }
        console.log("My reciver users");
        console.log(this.users);
        // this.chat.push(doc1.data());
      });

      //nnow get firend chat
      const notesRef1 = collection(this.firestore, 'pchat');
      // notesRef;
      let q1 = query(notesRef1, where('tusr', '==', this.user));
      // let q1 = query(notesRef, where("tusr", "in", [this.user,this.myid]));
      const querySnapshot1 = getDocs(q1);

      querySnapshot1.then(res=> {
        res.forEach((doc1) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log();
          if(true) {
            let ch = doc1.data();
            ch['id'] = doc1.id;
            console.log(ch);
            if(!this.users.includes(doc1.data()['user']))
            {
              this.users.push(doc1.data()['user']);
            }
            this.fchat.push(ch);
            this.chat.push(ch);
          }
        });
        console.log("this.users");
        console.log(this.users);
        // this.chat.push(this.mchat);
        //Heere hide loader
        console.log('All chat');
        console.log(this.chat);
        //unique
        const array =this.chat;

        const key = 'id';

        const arrayUniqueByKey = [...new Map(array.map(item =>
          [item[key], item])).values()];
        console.log('arrayUniqueByKey');
        console.log(arrayUniqueByKey);
        this.chat = arrayUniqueByKey;
        let uarr = [];
        for (let i in this.users) {
          let value = this.users[i];
          uarr.push(this.getMdata(value,1))
        }
        console.log(uarr);
        this.allusers = uarr;

        // this.chat = arrayUniqueByKey;

        //unique
        const prop = 'ts';
        this.chat.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
        this.allusers.sort((a, b) => a[prop] < b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
        console.log('After soting');
        console.log(this.allusers);
      });

    });
  }
  ngOnInit() {
    this.storage.get('logindata').then((name) => {
      this.user = name;
      // this.myid = this.route.snapshot.params.uid;
      // alert(this.myid);
      //my msgs
      //new logic
      this.loadchat();
    });
  }

}
