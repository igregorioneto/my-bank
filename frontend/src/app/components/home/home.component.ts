import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  name = '';
  balance = 0;
  constructor(
    private readonly homeService: HomeService,
    private readonly servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.homeService.userLogged()
      .subscribe(
        (data) => {
          this.name = data.name;
          this.balance = data.balance;
          console.log(data);
        }
      )
  }

}
