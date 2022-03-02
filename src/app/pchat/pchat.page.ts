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
  selector: 'app-pchat',
  templateUrl: './pchat.page.html',
  styleUrls: ['./pchat.page.scss'],
})
export class PchatPage implements OnInit {
  chat: any;
  txt: any;
  user: any;

  myid : any;
  constructor(
    private  router : Router,
    private route: ActivatedRoute,
    private firestore: Firestore,
    private dataService: DataService,
    private storage: Storage,

  ) { }
  mchat : any;
  fchat : any;
  loadchat()
  {
    let dhat = [];


    const notesRef = collection(this.firestore, 'pchat');
    // notesRef;
    let q = query(notesRef, where('user', '==', this.user));
    // let q1 = query(notesRef, where("tusr", "in", [this.user,this.myid]));
    const querySnapshot = getDocs(q);

    querySnapshot.then(res=> {
      res.forEach((doc1) => {


        //new real time logic
        // this.chat = [];
        // doc.data() is never undefined for query doc snapshots
        let dta = doc1.data();
        dta['id'] = doc1.id;

        if (doc1.data().tusr == this.myid) {


          this.mchat.push(doc1.data());
          dhat.push(dta);
        }
      });
        console.log("My chat");
      console.log(dhat);
      console.log("end dhat");
        const array =dhat;

        const key = 'id';

        const arrayUniqueByKey = [...new Map(array.map(item =>
          [item[key], item])).values()];
        dhat = arrayUniqueByKey;

      //nnow get firend chat
      const notesRef1 = collection(this.firestore, 'pchat');
      // notesRef;
      let q1 = query(notesRef1, where('user', '==', this.myid));
      // let q1 = query(notesRef, where("tusr", "in", [this.user,this.myid]));
      const querySnapshot1 = getDocs(q1);

      querySnapshot1.then(res=> {
        res.forEach((doc1) => {
          // doc.data() is never undefined for query doc snapshots
          console.log("test 88");
          console.log(doc1.data());
          if(doc1.data().tusr == this.user) {
            console.log('Finding key id');
            let ch = doc1.data();
            ch['id'] = doc1.id;
            console.log(ch);
            this.fchat.push(ch);
            dhat.push(ch);
          }
        });
        console.log("Friend chat check");
        console.log(this.fchat);
        // this.chat.push(this.mchat);
        //Heere hide loader
        console.log('All chat');
        console.log(dhat);
        //unique
        const array =dhat;

        const key = 'id';

        const arrayUniqueByKey = [...new Map(array.map(item =>
          [item[key], item])).values()];
        console.log("arrayUniqueByKey");
        console.log(arrayUniqueByKey);
        dhat = arrayUniqueByKey;

        // this.chat = arrayUniqueByKey;

        //unique
        const prop = 'ts';
        dhat.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
        this.chat = dhat;
        console.log("Get last");
        if(this.chat.length) {
          console.log(this.chat[this.chat.length - 1].ts);
          this.last = this.chat[this.chat.length - 1].ts;
        }
      });

    });
  }
  last : any;
  addmsg(msg)
  {
    this.last = msg.ts;
    this.chat.push(msg);
    console.log(msg.ts);
  }
  ngOnInit() {
    this.last = 0;
    this.mchat = [];
    this.chat = [];
    this.fchat = [];


    this.storage.get('logindata').then((name) => {
      this.user = name;
      this.myid = this.route.snapshot.params.uid;
      // alert(this.myid);
      //my msgs
      //new logic
  this.dataService.get('pchat').subscribe(res => {
      if(this.last) {
          console.log('real time logic');
          // console.log(res);
          for (let i = 0; i <= res.length - 1; i++) {
            if(res[i].ts > this.last) {
              if(res[i].tusr == this.user && res[i].user == this.myid) {
                this.addmsg(res[i]);
              }
              else if(res[i].user == this.user && res[i].tusr == this.myid) {
                this.addmsg(res[i]);

              }
            }

          }
      }
  });
      this.loadchat();
    });

  }

  send()
  {
    this.storage.get('logindata').then((name) => {
      this.user = name;
      const current = new Date();
      const timestamp = current.getTime();

      this.dataService.add({ msg:this.txt ,user:this.user,tusr : this.myid,date:Date.now(),ts:timestamp },'pchat').then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));
        // console.log("Document written with ID: ", docRef.id);
        this.txt = '';
        // this.router.navigate(['/chat?'+docRef.id]);
      });
    });
  }

}
