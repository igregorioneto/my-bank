import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {
  @ViewChild("grafico", { static: true }) elemento!: ElementRef

  constructor(private readonly homeService: HomeService) { }

  ngOnInit(): void {
    this.homeService.countAllTransactions().subscribe(t => {
      this.graficoPizza(t.deposit, t.withdraw, t.transfer);
    });
  }

  graficoPizza(deposit: number, withdraw: number, transfer: number): void {
    new Chart(this.elemento.nativeElement, {
      type: 'pie',
      data: {
        labels: ['DEPOSITOS', 'SAQUES', 'TRANSFERÊNCIAS'],
        datasets: [
          {
            data: [deposit, withdraw, transfer],
            backgroundColor: ['#00FF7F','#FFFF00', '#FF0000']
          }
        ]
      }
    });
  }

}
