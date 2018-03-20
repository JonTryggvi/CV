import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ApiService } from '../api.service';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';
import { AnimationService } from '../animation.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-i-love',
  templateUrl: './i-love.component.html',
  styleUrls: ['./i-love.component.scss'],
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
export class ILoveComponent implements OnInit {

  iLoveImg: String;
  name: String;
  shortDescription: String;
  iLovetos: any;
  iSpot: String;
  state = 'hide';
  state2 = 'hide';
  // tslint:disable-next-line:max-line-length
  constructor(private animationService: AnimationService, private apiServise: ApiService, public el: ElementRef, private sanitizer: DomSanitizer) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    // console.log(this.el.nativeElement.id);
    const elHeight = this.el.nativeElement.children[0].children[1].clientHeight;
    const cliHeight = this.el.nativeElement.children[0].clientHeight;
    const windHeight = window.innerHeight;
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    // console.log(componentPosition);
    const thisScrollToId = this.el.nativeElement.children[0].children[0].id;
    let gear = 0.2;
    let addToEl = 0;
    let removefrom = -400;
    if (window.innerWidth <= 800) {
      gear = 0;
      addToEl = -200;
      removefrom = 0;
    }
    // (elHeight + addToEl)
    // tslint:disable-next-line:max-line-length
    if (scrollPosition >= componentPosition - (windHeight + addToEl) && scrollPosition <= componentPosition + windHeight + addToEl + removefrom) {
      this.state = 'show';
      // this.animationService.changeNavStatus(thisScrollToId);

    } else {
      this.state = 'hide';
    }
    if (scrollPosition >= componentPosition - (elHeight - 100)) {
      this.state2 = 'show';
    } else {
      this.state2 = 'hide';
    }
    // tslint:disable-next-line:max-line-length
    if (scrollPosition >= componentPosition + removefrom && scrollPosition <= componentPosition + windHeight + addToEl + removefrom ) {
      // console.log('marker2');
      this.animationService.changeNavStatus(thisScrollToId);
    }

  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  ngOnInit() {
    this.apiServise.getData().subscribe(data => {

      this.iLoveImg = data.acf.i_love_img.sizes['large'];
      this.name = data.acf.name;
      this.shortDescription = data.acf.love_to_do_description;
      this.iLovetos = data.acf.some_things_i_love;
      this.iSpot = data.acf.unijonlink;
      // return this.data;
    });
  }

}
