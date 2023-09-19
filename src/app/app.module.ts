import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutComponent} from "./components/layout/layout.component";
import {NavigationComponent} from "./components/layout/navigation/navigation.component";
import {HeaderComponent} from "./components/layout/header/header.component";
import {FooterComponent} from "./components/layout/footer/footer.component";
import {NgbModule, NgbToastModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgxSpinnerModule} from "ngx-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastContainerComponent} from "./components/toast-container/toast-container.component";
import {HomeComponent} from "./components/home/home.component";
import { EmailComponent } from './components/email/email.component';
import { ChatComponent } from './components/chat/chat.component';
import {HeaderInterceptor} from "./interceptors/header-interceptor";
import {AutosizeModule} from "ngx-autosize";

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    NavigationComponent,
    HeaderComponent,
    FooterComponent,
    ToastContainerComponent,
    HomeComponent,
    EmailComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    NgbToastModule,
    NgbTooltipModule,
    HttpClientModule,
    NgbModule,
    AutosizeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
