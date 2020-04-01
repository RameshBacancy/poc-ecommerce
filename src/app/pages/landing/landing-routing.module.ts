import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing.component';
import { GuideTestComponent } from './guide-test/guide-test.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
    children: [
      {
        path: 'ivr-number-list',
        loadChildren: './ivr-call-list/ivr-call-list.module#IvrCallListModule',
      },
    ]
  },
  {
    path: 'guide-test',
    component: GuideTestComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingRoutingModule { }
