import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ApiService } from '../api.service';
import {
  trigger,
  state,
  style,
  animate,
  transition

} from '@angular/animations';
import { AnimationService } from '../animation.service';
@Component({
  selector: 'app-my-work',
  templateUrl: './my-work.component.html',
  styleUrls: ['./my-work.component.scss'],
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
export class MyWorkComponent implements OnInit {
  works: any;
  backgroundImage: String;
  width: String;
  height = 800;
  randNumber: number;
  backroundSize: String;
  state = 'hide';
  state2 = 'hide';
  setMyStyles(imgUrl, i, isMocup) {
    const heights = [350, 250, 260, 330];
    let height = 400;
    let width = '100%';
    const backgroundColors = ['#E9D460', '#59ABE3', '#4ECDC4', '#913D88'];
    this.randNumber = Math.floor(Math.random() * this.works.length) + 1;
    // console.log(isMocup);
    if (window.innerHeight < 800) {
      height = 200;
    }

    if (isMocup === true) {
      this.backroundSize = '80%';
    } else {
      this.backroundSize = '100%';
    }

    if (this.works.length >= 5 && window.innerWidth > 414) {
      width = '30%';
    } else if (this.works.length < 5 && window.innerWidth > 414) {
      width = '48%';
    } else if (window.innerWidth <= 414) {
      width = '100%';
    }
    const styles = {
      'width': width,
      'height': height + 'px',
      'max-heigth': this.height,
      'background-size': this.backroundSize,
      'background-color': backgroundColors[i],
      // 'flex-grow': (i + 1),
      // 'flex-shrink': (i + 1),
      // 'flex-basis': '1%',
      'background-image': 'url(' + imgUrl + ')'
    };
    return styles;
  }

  hoverFunc(e) {
    // console.log(e);

    if (window.innerWidth < 800) {

      //  e.preventDefault();

    }
  }

  constructor(private apiServise: ApiService, public el: ElementRef, private animationService: AnimationService) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const elHeight = this.el.nativeElement.children[0].children[1].clientHeight;

    const windHeight = window.innerHeight;
    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    const thisScrollToId = this.el.nativeElement.children[0].children[0].id;

    // console.dir(this.el.nativeElement.children[0].children[0].id);
    // console.dir(scrollPosition);
    let gear = 0.2;
    let addToEl = 0;
    let removefrom = -400;
    if ( window.innerWidth <= 800 ) {
      gear = 0;
      addToEl = 300;
      removefrom = 0;
    }
// (elHeight + addToEl)
    // tslint:disable-next-line:max-line-length
    if (scrollPosition >= componentPosition - (windHeight + addToEl) && scrollPosition <= componentPosition + windHeight + addToEl + removefrom) {
      this.state = 'show';
      this.animationService.changeNavStatus(thisScrollToId);

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
      this.works = data.acf.my_work_row;

    });
  }

}
