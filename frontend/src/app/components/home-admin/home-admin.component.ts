import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { HomeService } from 'src/app/services/home.service';
import { ServicesService } from 'src/app/services/services.service';

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
    ) { }

  ngOnInit(): void {
    this.homeService.userLogged().subscribe(l => this.logged = l.name);
    this.adminService.getUsers().subscribe(u => this.users = u);
  }

  close(): void {
    this.servicesService.remove();
    this.router.navigate(['/login']);
  }
}
