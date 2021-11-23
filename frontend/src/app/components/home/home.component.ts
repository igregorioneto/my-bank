import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private readonly homeService: HomeService,
    private readonly servicesService: ServicesService,
  ) { }

  ngOnInit(): void {
    this.homeService.userLogged()
      .subscribe(
        (data) => {
          console.log(data);
        }
      )
  }

}
