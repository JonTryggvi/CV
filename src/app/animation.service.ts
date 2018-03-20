import { Injectable, HostListener, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
@Injectable()
export class AnimationService {
  serviceNavName;
  constructor() { }
  public changeNavStatus(id, navName = '') {
    // tslint:disable-next-line:prefer-const
    // console.log(id);
    // tslint:disable-next-line:prefer-const
    let newNavName = navName;

    const element = document.querySelector('#' + id);
    // console.log(element);

    // tslint:disable-next-line:prefer-const
    let elementClass = document.querySelectorAll('.nav');
    for (let i = 0; i < elementClass.length; i++) {
      elementClass[i].classList.remove('aActive');
    }
    const navElement = document.querySelectorAll('[data-id="' + id + '"]');
    if (id === 'experience') {
      navElement[0].innerHTML = newNavName;
    }
    navElement[0].classList.add('aActive');

    if (navName !== '') {
      this.serviceNavName = navName;
    }
  }
}
