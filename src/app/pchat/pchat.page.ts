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
    //new real time logic
    this.dataService.getwhere('pchat','user',this.user).subscribe(res => {
      // this.chat = [];
      this.mchat = [];
      this.fchat = [];
      this.chat = [];
      let chat = res.reverse();
      // this.chat = [];
      chat.forEach((doc1) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log();
        if(doc1['tusr'] == this.myid) {



          this.mchat.push(doc1);
          dhat.push(doc1);
        }
        console.log("My chat");
        const array =dhat;

        const key = 'id';

        const arrayUniqueByKey = [...new Map(array.map(item =>
          [item[key], item])).values()];
        dhat = arrayUniqueByKey;
        console.log(dhat);

        // this.chat.push(doc1.data());
      });
      //nnow get firend chat
      const notesRef1 = collection(this.firestore, 'pchat');
      // notesRef;
      let q1 = query(notesRef1, where('user', '==', this.myid));
      // let q1 = query(notesRef, where("tusr", "in", [this.user,this.myid]));
      const querySnapshot1 = getDocs(q1);

      querySnapshot1.then(res=> {
        res.forEach((doc1) => {
          // doc.data() is never undefined for query doc snapshots
          // console.log();
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
        console.log(this.chat);
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
      });

    });
  }
  ngOnInit() {
    this.mchat = [];
    this.chat = [];
    this.fchat = [];


    this.storage.get('logindata').then((name) => {
      this.user = name;
      this.myid = this.route.snapshot.params.uid;
      // alert(this.myid);
      //my msgs
      //new logic
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
