import { ChangeDetectorRef ,Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService, Note } from '../services/data.service';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
notes : any;
  constructor(private dataService: DataService,  private cd: ChangeDetectorRef, public alertCtrl: AlertController) {
     this.dataService.getNotes().subscribe(res => {
      console.log(res);
      this.notes = res;
   });
 }

  ngOnInit() {
    this.dataService.addNote({ text: 'test note', title: 'titles' });
  }
  async addNote() {
    const alert = await this.alertCtrl.create({
      header: 'Add Note',
      inputs: [
        {
          name: 'title',
          placeholder: 'My cool note',
          type: 'text'
        },
        {
          name: 'text',
          placeholder: 'Learn Ionic',
          type: 'textarea'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        }, {
          text: 'Add',
          handler: res => {
            
          }
        }
      ]
    });
 
    await alert.present();
  }

}
