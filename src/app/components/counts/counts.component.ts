import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintsService } from 'src/app/services/complaints.service';

@Component({
  selector: 'app-counts',
  templateUrl: './counts.component.html',
  styleUrls: ['./counts.component.css']
})
export class CountsComponent implements OnInit {

  complaints: Complaint[];

  constructor(private complaintsService: ComplaintsService,
    private router: Router) { }

  ngOnInit(): void {

    this.complaintsService.getComplaints().subscribe((complaints) => {
      this.complaints =complaints;
    });

  }

}
