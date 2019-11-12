import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AppSharedModule } from 'app/shared/shared.module';
import { AppCoreModule } from 'app/core/core.module';
import { AppAppRoutingModule } from './app-routing.module';
import { AppHomeModule } from './home/home.module';
import { AppEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AppSharedModule,
    AppCoreModule,
    AppHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AppEntityModule,
    AppAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class AppAppModule {}
