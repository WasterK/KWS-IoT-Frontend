import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract user data from URL query parameters
    this.route.queryParams.subscribe(params => {
      this.userData = params['data'];
      // console.log('User data in DashboardComponent:', this.userData);
    });
  }
}
