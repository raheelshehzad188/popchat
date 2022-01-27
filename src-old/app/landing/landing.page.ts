import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

    constructor(
        private router: Router,
        public activatedRoute : ActivatedRoute,
    ) {}

    start()
    {
        this.router.navigate(['/creat-room']);
    }

    ngOnInit() {
    }

}
