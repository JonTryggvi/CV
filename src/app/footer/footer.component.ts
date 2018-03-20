import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  socials;
  constructor(private apiServise: ApiService) { }

  ngOnInit() {
    this.apiServise.getData().subscribe(data => {
      this.socials = data.acf.social;
      // return this.data;
    });
  }

}
