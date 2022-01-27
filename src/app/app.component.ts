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
    public appPages = [
        { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
        { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
        { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
        { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
        { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
        { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    ];
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

}
