import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService, Note } from '../services/data.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import {ref} from "@angular/fire/storage";
import {  MenuController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { MainsevService } from '../services/mainsev.service';
import { Clipboard } from '@capacitor/clipboard';
    

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

   constructor(
        private activatedRoute: ActivatedRoute,
        private dataService: DataService,
        private router: Router,
        private storage: Storage,
        public menuCtrl: MenuController,
        private mymain: MainsevService,
    ) 
    {

    }


    ngOnInit() 
    {

    }
    async copy()
    {
        var url  = this.mymain.urlforshare();
        await this.storage.get('code').then((name) => {
             Clipboard.write({
                string: url+'share/'+name
            });
        });
        alert("ok");
        this.mymain.showtoast("Copy to clipboard","success");
    }

    async share()
    {
        await this.storage.get('code').then((name) => {
            // console.log(name);
            // if(name == 0)
            // {
            //     this.router.navigate(['/landing']);
            // }
            var url  = this.mymain.urlforshare();
            // var code = 'popofphher';
            Share.share({
                title: 'See cool stuff',
                text: 'Really awesome thing you need to see right meow',
                url: url+'share/'+name,
                dialogTitle: 'Share with buddies',
            });
        });
    }

}
