import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-upload-arquivo',
  templateUrl: './upload-arquivo.component.html',
  styleUrls: ['./upload-arquivo.component.scss']
})
export class UploadArquivoComponent implements OnInit {
  file: any;
  constructor(
    private readonly homeService: HomeService,
    private readonly dialogRef: MatDialogRef<UploadArquivoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit(): void {
  }

  async csvImportChange(event: any) {
    this.file = event.target.files[0];
  }

  usersCreateCsv() {
    console.log(this.file)
    this.homeService.usersCreateJob({ file: this.file }).subscribe(() => {})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
