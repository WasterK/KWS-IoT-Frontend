import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.css']
})
export class DashboardNavbarComponent {
  @Input() userData: string;
  userName: string;
  picture: Blob;
  email: string;


  ngOnInit(): void {
    try {
      // Parse the stringified JSON to a JavaScript object
      // Replace single quotes with double quotes

      const userDataString = this.userData.replace(/'/g, '"');
      // Parse the stringified JSON to a JavaScript object
      // console.log('User data in Nav bar:', this.userData);
      const userDataObject = JSON.parse(userDataString);

      // Extract user name
      this.userName = userDataObject.name;
      this.picture = userDataObject.picture;
      this.email = userDataObject.email;
      // console.log(`username : ${this.picture}`);
      // console.log(`username : ${this.userName}`);
    } catch (error) {
      console.error('Error parsing userData:', error);
    }
  }
}
