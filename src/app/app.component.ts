import {  MenuController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Note } from '../app/services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { MainsevService } from '../app/services/mainsev.service';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import {createElementCssSelector} from "@angular/compiler";
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
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    constructor(
        private menu: MenuController,
  private activatedRoute: ActivatedRoute,
  private http: HttpClient,
  private dataService: DataService,
  private router: Router,
  private storage: Storage,
  private firestore: Firestore,
  private mymain: MainsevService,
    ) {}


    setting()
    {
        this.router.navigate(['/setting']);
        this.menu.close();
    }
    user : any;
    umute()
    {
      // console.log(this.storage.get('login'));

      this.storage.get('logindata').then((name) => {
        // console.log(name);
        if (!name) {
          this.router.navigate(['/landing']);
        } else {
          this.user = name;
          // alert(name);
          this.dataService.getwhere('mute_list','fuser',this.user).subscribe(res => {
            let list = res;
            for(let i = 0;i<= list.length-1;i++)
            {

              if(list[i].fuser == this.user)
              {
                this.dataService.deleteNote( 'mute_list',list[i].id).then((docRef) =>{
                  // localStorage.setItem('login', docRef.id); // setting
                  // alert(localStorage.getItem('login'));
                  // delete this.mlist[this.block];
                  // alert(docRef);

                  // console.log("Document written with ID: ", docRef.id);
                  // this.block = false;
                  // this.router.navigate(['/chat?'+docRef.id]);
                });

                // let in = {}this.mlist[list[i].tuser] = ;
                // console.log("line 467");
                // console.log(list[i]);
                // this.mlist.push(list[i].tuser);
              }
            }



          });
          this.mymain.showtoast("Unmute all successfully","success");
        }
      });


    }
    createroom()
    {
        this.router.navigate(['/creat-room']);
        this.menu.close();
    }

    inbox()
    {
        this.router.navigate(['/inbox']);
        this.menu.close();
    }

    freq()
    {
        this.router.navigate(['/freq']);
        this.menu.close();
    }

    noti()
    {
        this.router.navigate(['/noti']);
        this.menu.close();
    }

}
