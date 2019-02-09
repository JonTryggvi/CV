import { Component, OnInit, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
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
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss'],
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
      transition('hide => show', [style({ transform: 'scale(0.8)' }), animate('700ms 3000ms ease-in')])
    ])
  ]
})
export class IntroductionComponent implements OnInit {
  headshot: String;
  name: String;
  shortDescription: String;
  iSpot;
  state = 'show';
  state2 = 'show';
  styles: any;
  loader: any;
  // tslint:disable-next-line:max-line-length
  constructor(private apiServise: ApiService, public el: ElementRef, private animationService: AnimationService, private sanitizer: DomSanitizer, cd: ChangeDetectorRef) { }
  @HostListener('window:load', ['$event'])

  checkLoad() {
    setTimeout( () => { this.el.nativeElement.children[0].children[1].children[1].children[0].style.opacity = 0; }, 4000);
  }

  // const loaderDiv: HTMLElement = document.getElementById('imgLoader');
  // this.el.nativeElement.children[0].children[1].children[1].children[0].style.opacity = 0;
  // loaderDiv.style.opacity = 0;
  @HostListener('window:scroll', ['$event'])
  checkScroll() {

    // console.dir(this.el.nativeElement.children[0].clientHeight);
    const elHeight = this.el.nativeElement.children[0].clientHeight;
    const windHeight = window.innerHeight;
    // console.log(windHeight - cliHeight);
    const thisScrollToId = this.el.nativeElement.children[0].children[0].id;
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    // console.log(componentPosition);

    if (scrollPosition >= componentPosition - elHeight && scrollPosition <= componentPosition + elHeight ) {
      this.state = 'show';
      // this.animationService.changeNavStatus(thisScrollToId);
    } else {
      this.state = 'hide';
    }
    if (scrollPosition >= componentPosition - elHeight - 100) {
      this.state2 = 'show';
      // this.animationService.changeNavStatus(thisScrollToId);
    } else {
      this.state2 = 'hide';
    }
    // console.log(scrollPosition);
    if (scrollPosition >= componentPosition  && scrollPosition <= componentPosition + elHeight ) {
      // this.state = 'show';
      // console.log('marker');

      this.animationService.changeNavStatus(thisScrollToId);
    }
  }
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }



  ngOnInit() {
    this.apiServise.getData().subscribe(data => {
      this.iSpot = data.acf.unijonlink;
      this.headshot = data.acf.headshot.sizes['large'];
      this.name = data.acf.name;
      this.shortDescription = data.acf.shortIntroduction_h;

      this.styles = {
        'background-image': 'url(' + this.headshot + ')'
      };


      // this.el.nativeElement.children[0].children[1].children[1].children[0].style.opacity = 0;
      // return this.data;

    });
  }

}
