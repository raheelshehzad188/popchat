import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
    
    public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
    constructor(
        private router: Router,
        public activatedRoute : ActivatedRoute,
        private menu: MenuController
    ) {}

    setting()
    {
        this.router.navigate(['/setting']);
        this.menu.close();
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

}
