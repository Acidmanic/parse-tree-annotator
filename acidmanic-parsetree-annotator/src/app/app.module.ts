import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenGroupComponent } from './components/token-group/token-group.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SpanOrDetailsComponent } from './components/span-or-details/span-or-details.component';
import { PopperLimitedTextComponent } from './components/popper-limited-text/popper-limited-text.component';
import { PhraseHighlighterComponent } from './components/phrase-highlighter/phrase-highlighter.component';
import { TokenTreeComponent } from './components/token-tree/token-tree.component';
import { TokenTreeUplevelComponent } from './components/token-tree-uplevel/token-tree-uplevel.component';

@NgModule({
  declarations: [
    AppComponent,
    TokenGroupComponent,
    SpanOrDetailsComponent,
    PopperLimitedTextComponent,
    PhraseHighlighterComponent,
    TokenTreeComponent,
    TokenTreeUplevelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
