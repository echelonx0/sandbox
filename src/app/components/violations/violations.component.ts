import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Complaint } from 'src/app/models/complaint';
import { ComplaintsService } from 'src/app/services/complaints.service';

@Component({
  selector: 'app-violations',
  templateUrl: './violations.component.html',
  styleUrls: ['./violations.component.css']
})
export class ViolationsComponent implements OnInit {

  complaints: Complaint[];

  constructor(private complaintsService: ComplaintsService,
    private router: Router) { }

  ngOnInit(): void {

    this.complaintsService.getComplaints().subscribe((complaints) => {
      this.complaints =complaints;
    });

  }

}
