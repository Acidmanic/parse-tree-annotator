import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParseTreePageComponent} from "./pages/parse-tree-page/parse-tree-page.component";
import {SegmentationPageComponent} from "./pages/segmentation-page/segmentation-page.component";

const routes: Routes = [

  {
    path: 'parse-tree',
    component: ParseTreePageComponent,
  },
  {
    path: 'segmentation',
    component: SegmentationPageComponent,
  },
  { path: '',  component:ParseTreePageComponent  },
  { path: '**', component: ParseTreePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
