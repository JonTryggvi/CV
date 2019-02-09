import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
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
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(4%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
    trigger('scrollAnimation2', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(4%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ]),
    trigger('scrollAnimation3', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(4%)'
      })),
      transition('show => hide', animate('700ms ease-out')),
      transition('hide => show', animate('700ms ease-in'))
    ])
  ]
})
export class ExperienceComponent implements OnInit {
  experienceHeader: String;
  experienceDescription: String;
  experiences: any;
  skillsHeader: String;
  skillsDescription: String;
  skills: any;
  educationHeader: String;
  educationDescription: String;
  educationRows: any;
  state = 'hide';
  state2 = 'hide';
  state3 = 'hide';
  navName = '';
  constructor(private apiServise: ApiService, public el: ElementRef, private animationService: AnimationService) { }

  @HostListener('window:scroll', ['$event'])
  checkScroll() {

    // console.dir(containerHeight);
    // console.dir(this.el);
    const thisScrollToId = this.el.nativeElement.children[0].children[0].id;
    const thisScrollToId1 = this.el.nativeElement.children[1].children[0].id;
    const thisScrollToId2 = this.el.nativeElement.children[2].children[0].id;

    const elHeightExp = this.el.nativeElement.children[0].clientHeight;
    const elHeightSkl = this.el.nativeElement.children[1].clientHeight;
    const elHeightEdu = this.el.nativeElement.children[2].clientHeight;
    const windHeight = window.innerHeight;
    const expId = this.el.nativeElement.children[0].offsetTop;
    const skillsId = this.el.nativeElement.children[1].offsetTop;
    const educationId = this.el.nativeElement.children[2].offsetTop;
    const minimizer = 0.3;
    let gear = 0.2;
    let addToEl = 0;
    let removefrom = -400;
    if (window.innerWidth <= 800) {
      gear = 0;
      addToEl = 300;
      removefrom = 0;
    }
    // console.dir(skillsId);
    // console.dir(thisScrollToId1);


    const componentPosition = this.el.nativeElement.offsetTop;
    const scrollPosition = window.pageYOffset;
    // console.log(scrollPosition);

    if (scrollPosition >= expId - windHeight && scrollPosition <= expId + windHeight ) {
      this.state = 'show';
      this.navName = 'Experience';
      // this.animationService.changeNavStatus(thisScrollToId, this.navName);
    } else {
      this.state = 'hide';
    }
    if (scrollPosition >= skillsId - windHeight && scrollPosition <= skillsId + windHeight ) {
      this.navName = 'Skills';
      // this.animationService.changeNavStatus(thisScrollToId, this.navName);
      this.state2 = 'show';
    } else {
      this.state2 = 'hide';
    }
    if (scrollPosition >= educationId - windHeight && scrollPosition <= educationId + windHeight ) {
      this.navName = 'Education';
      // this.animationService.changeNavStatus(thisScrollToId, this.navName);
      this.state3 = 'show';
    } else {
      this.state3 = 'hide';
    }

    if (scrollPosition >= expId + removefrom && scrollPosition <= expId + windHeight + addToEl + removefrom) {
      // console.log('marker2');
      this.navName = 'Experience';
      this.animationService.changeNavStatus(thisScrollToId, this.navName);
    }
    if (scrollPosition >= skillsId + removefrom && scrollPosition <= skillsId + windHeight + addToEl + removefrom) {
      // console.log('marker2');
      this.navName = 'Skills';
      this.animationService.changeNavStatus(thisScrollToId, this.navName);
    }
    if (scrollPosition >= educationId + removefrom && scrollPosition <= educationId + windHeight + addToEl + removefrom) {
      // console.log('marker2');
      this.navName = 'Education';
      this.animationService.changeNavStatus(thisScrollToId, this.navName);
    }

  }


  ngOnInit() {
    this.apiServise.getData().subscribe(data => {
      this.experienceHeader = data.acf.experience_h;
      this.experienceDescription = data.acf.exp_description;
      this.experiences = data.acf.experience_rows;
      this.skillsHeader = data.acf.skills_header;
      this.skillsDescription = data.acf.skills_descripton;
      this.skills = data.acf.skills_row;
      this.educationHeader = data.acf.eduvation_header;
      this.educationDescription = data.acf.education_description;
      this.educationRows = data.acf.education_row;
      // return this.data;
    });
  }

}
