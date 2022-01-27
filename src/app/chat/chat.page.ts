import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Note } from '../services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {ref} from "@angular/fire/storage";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
    chat : any;
    myId : any;
    user : any;
    txt : any;
  block: any;
  blist : any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private router: Router,
        private storage: Storage
    ) {
      this.block = 0;

   }

   send()
   {
       this.storage.get('logindata').then((name) => {
            this.user = name;
            var current = new Date();
            var timestamp = current.getTime();
            this.dataService.add({ msg:this.txt ,user:this.user,grp : this.myId,ts:timestamp },'chat').then((docRef) =>{
                // localStorage.setItem('login', docRef.id); // setting
                // alert(localStorage.getItem('login'));
                // console.log("Document written with ID: ", docRef.id);
                this.txt = '';
                // this.router.navigate(['/chat?'+docRef.id]);
            });
        });
   }
    ngOnInit() {
      //user
      this.storage.get('logindata').then((name) => {
        this.user = name;
        // alert(this.user);

        });
        this.myId = this.activatedRoute.snapshot.paramMap.get('myid');
    }
  action(t)
  {
    if(t == 'block')
    {
      this.dataService.add({ tuser:this.block ,fuser:this.user, },'block_list').then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));

        // console.log("Document written with ID: ", docRef.id);
        this.block = false;
        // this.router.navigate(['/chat?'+docRef.id]);
      });
    }
    else if(t == 'report')
    {
      this.dataService.add({ tuser:this.block ,fuser:this.user, },'report_list').then((docRef) =>{
        // localStorage.setItem('login', docRef.id); // setting
        // alert(localStorage.getItem('login'));

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

    ionViewWillEnter()
    {
        this.storage.get('login').then((name) => {
            // console.log(name);
            if(name == 0)
            {
                this.router.navigate(['/landing']);
            }
        });



        //get block list
        this.dataService.getwhere('block_list','fuser',this.user).subscribe(res => {
            let list  = res.reverse();
            console.log("Block list");
            console.log(list);
          this.blist = [];
            for(let i = 0;i<= list.length-1;i++)
            {
              if(list[i]['fuser'] == this.user)
              this.blist[list[i]['tuser']] = list[i]['id'];
            }
            console.log(this.blist);
          this.dataService.getwhere('chat','grp',this.myId).subscribe(res => {
            this.chat = res.reverse();
            let prop = 'ts';
            this.chat.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
            // console.log("Al chat");
            console.log(this.chat);
          });
        });

        this.storage.get('logindata').then((name) => {
            this.user = name;
        });
    }

}
