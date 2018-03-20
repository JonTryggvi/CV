import { Component, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AnimationService } from '../animation.service';
// import { elementVisible, computedStyle, scrollTo, outerHeight, outerWidth } from '@ngui/utils';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  btnMenu(e) {
    const nav = document.getElementsByTagName('nav');
    // console.log(nav);
    console.dir(e.target);
    if (e.target.parentNode.classList.contains('btnActive')) {
      e.target.parentNode.classList.remove('btnActive');
      nav[0].classList.remove('setTop');
    } else {
      e.target.parentNode.classList.add('btnActive');
      nav[0].classList.add('setTop');
    }

  }

  whatBrowser() {
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let fullVersion = '' + parseFloat(navigator.appVersion);
    let majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset: any;
    let verOffset;
    let ix;

    // In Opera, the true version is after "Opera" or after "Version"
    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
      browserName = 'Opera';
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        fullVersion = nAgt.substring(verOffset + 8);
      }
      // return browserName;
    } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
      browserName = 'Microsoft Internet Explorer';
      fullVersion = nAgt.substring(verOffset + 5);
      // return browserName;
    } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
      browserName = 'Chrome';
      fullVersion = nAgt.substring(verOffset + 7);
      // return browserName;
    } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
      browserName = 'Safari';
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf('Version')) !== -1) {
        fullVersion = nAgt.substring(verOffset + 8);
      }
      // return browserName;
    } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
      browserName = 'Firefox';
      fullVersion = nAgt.substring(verOffset + 8);
      // return browserName;
    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
      (verOffset = nAgt.lastIndexOf('/'))) {
      browserName = nAgt.substring(nameOffset, verOffset);
      fullVersion = nAgt.substring(verOffset + 1);
      if (browserName.toLowerCase() === browserName.toUpperCase()) {
        browserName = navigator.appName;
      }


    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(';')) !== -1) {
      fullVersion = fullVersion.substring(0, ix);
    }
    if ((ix = fullVersion.indexOf(' ')) !== -1) {
      fullVersion = fullVersion.substring(0, ix);
    }

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }
    // console.log(browserName);

    return browserName;

  }

  scrollTo(id, e) {
    // console.log(id);
    const element = document.querySelector('#' + id);
    element.scrollIntoView({ behavior: 'smooth'});
  }


  scrollIt(destination, duration = 200, easing = 'linear', e, callback) {
    // console.log('s');

    const easings = {
      linear(t) {
        return t;
      },
      easeInQuad(t) {
        return t * t;
      },
      easeOutQuad(t) {
        return t * (2 - t);
      },
      easeInOutQuad(t) {
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
        return t * t * t;
      },
      easeOutCubic(t) {
        return (--t) * t * t + 1;
      },
      easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
        return t * t * t * t;
      },
      easeOutQuart(t) {
        return 1 - (--t) * t * t * t;
      },
      easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
      },
      easeInQuint(t) {
        return t * t * t * t * t;
      },
      easeOutQuint(t) {
        return 1 + (--t) * t * t * t * t;
      },
      easeInOutQuint(t) {
        return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
      }
    };

    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    const el = document.getElementById(destination);


    // tslint:disable-next-line:max-line-length
    const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    // tslint:disable-next-line:max-line-length
    const windowHeight = window.innerHeight; // || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
    console.dir(el);
    const destinationOffset = typeof el === 'number' ? el : el.offsetTop;
    // tslint:disable-next-line:max-line-length
    const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);
    // console.log(windowHeight);
    if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destinationOffsetToScroll);
      if (callback) {
        callback();
      }
      return;
    }

    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start ));

      if (window.pageYOffset === destinationOffsetToScroll) {
        if (callback) {
          callback();
        }
        return;
      }

      requestAnimationFrame(scroll);
    }
    scroll();
  }


  constructor() { }

  ngOnInit() {

  }

}
