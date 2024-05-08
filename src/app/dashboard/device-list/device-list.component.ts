import { Component, Input } from '@angular/core';
import { Device } from '../device.model';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { AddDeviceDialogComponent } from '../add-device-dialog/add-device-dialog.component';
import { throwDialogContentAlreadyAttachedError } from '@angular/cdk/dialog';



@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.css'
})
export class DeviceListComponent {
  @Input() userData: string;
  unique_id: string;
  constructor(private http: HttpClient, private dialog: MatDialog) {}

  devices: Device[] = [
  
  ]

  ngOnInit() {
    const userDataString = this.userData.replace(/'/g, '"');
    const userDataObject = JSON.parse(userDataString);
    
    this.unique_id = userDataObject.unique_id

    let allDeviceData = []

    this.http.get(
      `https://127.0.0.1:5000/get-all-devices/${userDataObject.unique_id}` 
    ).subscribe(
      (response: HttpResponse<any>) => {
        console.log('Response :', response.body);
        allDeviceData = response.body;
        console.log('all device :', allDeviceData);
    
        for (let device of allDeviceData) {
          this.devices.push(new Device(device.device_name, 'offline', device.device_id, device.device_url))
        }
      }
    )
    } 

  skipHeader = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true'
  });


  onRefresh(deviceId: string, deviceUrl: string) {
      console.log(`Device name: ${deviceId}`)

      this.http.get(
        `${deviceUrl}/get-status`,
        { headers: this.skipHeader, observe: 'response' }
      ).subscribe(
        (response: HttpResponse<any>) => {
          console.log(response.body.status);
          if (response.body.status === 'online') {
            const deviceToUpdate = this.devices.find(device => device.deviceId === deviceId);
            if (deviceToUpdate) {
              deviceToUpdate.status = 'online';
            } else {
              deviceToUpdate.status = 'offline'
            }
          } else {
            // Handle other statuses if needed
            // For now, assuming if not 'online', set status to 'offline'
            const deviceToUpdate = this.devices.find(device => device.deviceId === deviceId);
            if (deviceToUpdate) {
              deviceToUpdate.status = 'offline';
            }
          }
        },
        (error) => {
          console.error('Error fetching device status:', error);
          // Handle error - set device status to 'offline' or display error message
          const deviceToUpdate = this.devices.find(device => device.deviceId === deviceId);
          if (deviceToUpdate) {
            deviceToUpdate.status = 'offline';
          }
        }
      );
    
  }

  onAddNewDevice() {

    const dialogRef = this.dialog.open(AddDeviceDialogComponent, {
      width: '400px', // Adjust width as needed
      // Other dialog configurations like height, position, etc.
    });

    // Handle dialog result if needed
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('The dialog was closed', result);
        const deviceData = {"device_name": result.deviceName, "device_url": result.deviceUrl, "user_id": this.unique_id}
        if(result) {
          this.http.post(
            "https://127.0.0.1:5000/add-new-device",
            deviceData
          ).subscribe(
            (response: HttpResponse<any>) => {
              console.log('Response Status:', response.status);
            }
          )
        this.devices.push(new Device(result.deviceName, 'offline', 2, result.deviceUrl))
      }
      // Handle dialog result here
    }});
  }
}
