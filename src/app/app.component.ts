import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  name: String;
  constructor(private apiServise: ApiService) {}

  ngOnInit() {
    this.apiServise.getData().subscribe(data => {

      console.log(data.acf);
      this.name = data.acf.name;
    });
   }
}
