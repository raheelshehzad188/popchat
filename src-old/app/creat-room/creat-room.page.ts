import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-creat-room',
  templateUrl: './creat-room.page.html',
  styleUrls: ['./creat-room.page.scss'],
})
export class CreatRoomPage implements OnInit {

    constructor(
        private router: Router,
        public activatedRoute : ActivatedRoute,
    ) {}


    chat()
    {
        this.router.navigate(['/chat']);
    }

    ngOnInit() {
    }

}