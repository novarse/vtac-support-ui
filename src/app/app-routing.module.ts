import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {LayoutComponent} from "./components/layout/layout.component";
import {EmailComponent} from "./components/email/email.component";
import {ChatComponent} from "./components/chat/chat.component";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'email',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'email',
        component: EmailComponent
      },
      {
        path: 'chat',
        component: ChatComponent
      },
      {
        path: '**',
        component: HomeComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
