import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-selection-dialog',
  templateUrl: './file-selection-dialog.component.html',
  styleUrls: ['./file-selection-dialog.component.css']
})
export class FileSelectionDialogComponent {
  selectedFileName: string;

  constructor(public dialogRef: MatDialogRef<FileSelectionDialogComponent>) {}

  onFileSelected(files: FileList) {
    if (files.length > 0) {
      this.selectedFileName = files[0].name;
    } else {
      this.selectedFileName = '';
    }
  }

  onFileConfirm() {
    this.dialogRef.close(this.selectedFileName);
  }
}
