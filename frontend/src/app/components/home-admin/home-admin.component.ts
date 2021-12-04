import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { HomeService } from 'src/app/services/home.service';
import { ServicesService } from 'src/app/services/services.service';
import { EditUserComponent } from './edit-user/edit-user.component';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {
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
    this.homeService.userLogged().subscribe(l => this.logged = l.name);
    this.adminService.getUsers().subscribe(u => this.users = u);
  }

  deleteUser(id: any) {
    this.adminService.deleteUser(id).subscribe(() => {});
  }

  async updateUser(data: any) {
    const dialogRef = await this.dialog.open(EditUserComponent, {
      width: '35rem',
      data: { name: data.name, email: data.email, actived: data.actived, id: data._id }
    });
  }

  csvImportChange(event: any) {
    console.log(event.target.files[0]);
  }

  close(): void {
    this.servicesService.remove();
    this.router.navigate(['/login']);
  }
}
