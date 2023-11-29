import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParseTreePageComponent} from "./pages/parse-tree-page/parse-tree-page.component";
import {SegmentationPageComponent} from "./pages/segmentation-page/segmentation-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {ProfileComponent} from "./pages/profile/profile.component";

const routes: Routes = [

  {
    path: 'parse-tree',
    component: ParseTreePageComponent,
  },
  {
    path: 'segmentation',
    component: SegmentationPageComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  { path: '',  component:ParseTreePageComponent  },
  { path: '**', component: ParseTreePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
