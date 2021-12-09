import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { HomeService } from 'src/app/services/home.service';
import { ServicesService } from 'src/app/services/services.service';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UploadArquivoComponent } from './upload-arquivo/upload-arquivo.component';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
  public load = false;
  logged = '';
  users: any[] = [];

  constructor(
    private readonly servicesService: ServicesService,
    private readonly homeService: HomeService,
    private readonly adminService: AdminService,
    private readonly router: Router,
    private readonly dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.loading();
    this.adminService.getUsers().subscribe( u => {
      this.users = u
    });
    this.loadingUser();
  }

  loadingUser() {
    this.homeService.userLogged().subscribe(l => { 
      this.logged = l.name 
    });
  }

  deleteUser(id: any) {
    this.adminService.deleteUser(id).subscribe(() => {
      window.location.reload();
      this.loading(1000);
    });
  }

  async updateUser(data: any) {
    const dialogRef = await this.dialog.open(EditUserComponent, {
      width: '35rem',
      data: { name: data.name, email: data.email, actived: data.actived, id: data._id }
    });
  }

  async csvImportChange() {
    const dialogRef = await this.dialog.open(UploadArquivoComponent, {
      width: '35rem'
    });
  }

  close(): void {
    this.servicesService.remove();
    this.router.navigate(['/login']);
  }

  loading(time: number = 5000) {
    this.load = true;

    setTimeout(() => {
        this.load = false
    }, time)
  }
}
