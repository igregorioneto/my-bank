import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-grafico-admin',
  templateUrl: './grafico-admin.component.html',
  styleUrls: ['./grafico-admin.component.scss']
})
export class GraficoAdminComponent implements OnInit {
  @ViewChild("grafico", { static: true }) elemento!: ElementRef

  constructor(private readonly adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.countAllUsersRoles().subscribe(u => {
      this.graficoBar(u.admin, u.client);
    });
  }

  graficoBar(admin: number, client: number): void {
    new Chart(this.elemento.nativeElement, {
      type: 'pie',
      data: {
        labels: ['ADMINISTRADORES', 'CLIENTES'],
        datasets: [
          {
            data: [admin, client],
            backgroundColor: ['#4169E1', '#FF0000'],
          }
        ]
      }
    });
  }

}
