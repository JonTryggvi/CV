import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';
import { ApiService } from '../api.service';
import { AnimationService } from '../animation.service';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(10%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
    trigger('scrollAnimationTest', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(10%)'
      })),
      transition('show => hide', [style({ transform: 'scale(1)' }), animate('700ms 300ms ease-out')]),
      transition('hide => show', [style({ transform: 'scale(0.8)' }), animate('700ms 300ms ease-in')])
    ])
  ]
})
export class ContactComponent implements OnInit {

  fullName: String;
  address: String;
  city: String;
  email: String;
  tel: String;
  state = 'hide';
  state2 = 'hide';
  constructor(private apiServise: ApiService, public el: ElementRef, private animationService: AnimationService) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    // console.log(componentPosition);
    const thisScrollToId = this.el.nativeElement.children[0].children[0].id;
    const elHeight = this.el.nativeElement.children[0].clientHeight;
    const windHeight = window.innerHeight;
    if (scrollPosition >= componentPosition - elHeight && scrollPosition <= componentPosition + windHeight - (windHeight * 0.2)) {
      this.animationService.changeNavStatus(thisScrollToId);
      this.state = 'show';
    } else {
      this.state = 'hide';
    }
    if (scrollPosition >= componentPosition - (elHeight - 100)) {
      this.state2 = 'show';
    } else {
      this.state2 = 'hide';
    }

  }

  ngOnInit() {
    this.apiServise.getData().subscribe(data => {
      this.fullName = data.acf.fullname;
      this.address = data.acf.address;
      this.city = data.acf.city;
      this.email = data.acf.email;
      this.tel = data.acf.tel;

      // return this.data;
    });
  }

}
