import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-selection-dialog',
  templateUrl: './file-selection-dialog.component.html',
  styleUrls: ['./file-selection-dialog.component.css']
})
export class FileSelectionDialogComponent {
  selectedFileContent: string;
  selectedFileName: string;
  selectedFiles: File[] = [];
  file: File;

  constructor(public dialogRef: MatDialogRef<FileSelectionDialogComponent>) {}

  onFileSelected(event: any) {
    this.selectedFiles = Array.from(event.target.files);

   this.file = event.target.files[0];

    if (this.file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFileContent = e.target.result;
        this.selectedFileName = this.file.name
      };
      reader.readAsText(this.file);
    }
  }

  onFileConfirm() {
    this.dialogRef.close(this.selectedFiles);
  }
}
