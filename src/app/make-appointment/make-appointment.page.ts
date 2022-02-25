import { Component, OnInit } from '@angular/core';
import { DataService, Note } from '../services/data.service';
@Component({
  selector: 'app-make-appointment',
  templateUrl: './make-appointment.page.html',
  styleUrls: ['./make-appointment.page.scss'],
})
export class MakeAppointmentPage implements OnInit {

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit() {
  }

}
