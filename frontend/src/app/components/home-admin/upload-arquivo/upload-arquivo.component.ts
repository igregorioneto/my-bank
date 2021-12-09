import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.scss']
})
export class UploadArquivoComponent implements OnInit {
  file: Set<File>;

  constructor(
    private readonly homeService: HomeService,
    private readonly dialogRef: MatDialogRef<UploadArquivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
  }

  async csvImportChange(event: any) {
    const selectedFile = event.target.files;
    this.file = new Set();
    for (let i = 0; i< selectedFile.length; i++) {
      this.file.add(selectedFile[i]);
    }
  }

  usersCreateCsv() {
    this.homeService.usersCreateJob(this.file).subscribe(
      () => {
        this.dialogRef.close();
        window.location.reload();
      },
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  } 

}
