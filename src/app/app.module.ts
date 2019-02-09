import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import 'hammerjs';
import 'hammer-timejs';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { ApiService } from './api.service';

import { CdkTableModule } from '@angular/cdk/table';
import { IntroductionComponent } from './introduction/introduction.component';

import { ExperienceComponent } from './experience/experience.component';
import { MyWorkComponent } from './my-work/my-work.component';
import { ContactComponent } from './contact/contact.component';
import { RefsAndCoworkersComponent } from './refs-and-coworkers/refs-and-coworkers.component';
import { NavComponent } from './nav/nav.component';
import { ILoveComponent } from './i-love/i-love.component';
import { Ng2ScrollableModule } from 'ng2-scrollable';
// import { NguiUtilsModule } from '@ngui/utils';
import { AnimationService } from './animation.service';
import { OwlModule } from 'ngx-owl-carousel';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    IntroductionComponent,
    ExperienceComponent,
    MyWorkComponent,
    ContactComponent,
    RefsAndCoworkersComponent,
    NavComponent,
    ILoveComponent,
    FooterComponent,

  ],
  imports: [
    HttpModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CdkTableModule,
    Ng2ScrollableModule,
    OwlModule
  ],
  providers: [ApiService, AnimationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
