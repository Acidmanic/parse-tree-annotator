import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ParseTreePageComponent} from "./pages/parse-tree-page/parse-tree-page.component";

const routes: Routes = [

  {
    path: 'parse-tree',
    component: ParseTreePageComponent,
  },
  { path: '',  component:ParseTreePageComponent  },
  { path: '**', component: ParseTreePageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
