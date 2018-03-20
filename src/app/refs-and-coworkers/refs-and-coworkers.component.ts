import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';
import { OwlCarousel } from 'ngx-owl-carousel';
import { AnimationService } from '../animation.service';

@Component({
  selector: 'app-refs-and-coworkers',
  templateUrl: './refs-and-coworkers.component.html',
  styleUrls: ['./refs-and-coworkers.component.scss'],
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
export class RefsAndCoworkersComponent implements OnInit {
  collabs: String;
  sliderText: String;
  state = 'hide';
  state2 = 'hide';
  constructor(private apiServise: ApiService, public el: ElementRef, private animationService: AnimationService) { }

  @ViewChild('owlElement') owlElement: OwlCarousel;


  fun(direction) {
    switch (direction) {
      case 'next':
        this.owlElement.next([200]);
        break;
      case 'prev':
        this.owlElement.previous([200]);
        break;
      default:
        break;
    }

  }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const elHeight = this.el.nativeElement.children[0].clientHeight;
    const windHeight = window.innerHeight;
    // console.log(componentPosition);

    if (scrollPosition >= componentPosition - elHeight && scrollPosition <= componentPosition + windHeight - (windHeight * 0.2)) {
      this.state = 'show';
      this.animationService.changeNavStatus(this.el.nativeElement.id);

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
      this.collabs = data.acf.collabs;
      this.sliderText = data.acf.slider_heading;
    // return this.data;
    });
  }



}
