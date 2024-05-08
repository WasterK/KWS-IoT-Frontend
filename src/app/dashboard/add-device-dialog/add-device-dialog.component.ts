import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-device-dialog',
  templateUrl: './add-device-dialog.component.html',
  styleUrls: ['./add-device-dialog.component.css']
})
export class AddDeviceDialogComponent {
  deviceName: string;
  deviceUrl: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDeviceDialogComponent>
  ) {}

  onAddDevice() {
    // Update the data object with user-entered values
    this.data = {
      deviceName: this.deviceName,
      deviceUrl: this.deviceUrl
    };
    // Close the dialog with the updated data
    this.dialogRef.close(this.data);
  }
}
