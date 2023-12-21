import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenGroupComponent } from './components/token-group/token-group.component';
import {HttpClientModule} from "@angular/common/http";
import {NgbModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { SpanOrDetailsComponent } from './components/span-or-details/span-or-details.component';
import { PopperLimitedTextComponent } from './components/popper-limited-text/popper-limited-text.component';
import { PhraseHighlighterComponent } from './components/phrase-highlighter/phrase-highlighter.component';
import { FlattenTokenTreeComponent } from './components/flatten-token-tree/flatten-token-tree.component';
import { TokenGroupPlaceHolderComponent } from './components/flatten-token-tree/token-group-place-holder/token-group-place-holder.component';
import { TokenGroupNodeComponent } from './components/flatten-token-tree/token-group-node/token-group-node.component';
import { ParseTreePageComponent } from './pages/parse-tree-page/parse-tree-page.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { ThemeSwitchComponent } from './components/theme-switch/theme-switch.component';
import { LanguageDropdownComponent } from './components/language-dropdown/language-dropdown.component';
import { SegmentationPageComponent } from './pages/segmentation-page/segmentation-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { UserButtonComponent } from './components/user-button/user-button.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProgressableConfirmButtonComponent } from './components/progressable-confirm-button/progressable-confirm-button.component';
import {HotToastModule} from "@ngneat/hot-toast";

@NgModule({
  declarations: [
    AppComponent,
    TokenGroupComponent,
    SpanOrDetailsComponent,
    PopperLimitedTextComponent,
    PhraseHighlighterComponent,
    FlattenTokenTreeComponent,
    TokenGroupPlaceHolderComponent,
    TokenGroupNodeComponent,
    ParseTreePageComponent,
    SideBarComponent,
    ThemeSwitchComponent,
    LanguageDropdownComponent,
    SegmentationPageComponent,
    LoginPageComponent,
    UserButtonComponent,
    ProfileComponent,
    ProgressableConfirmButtonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    HotToastModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
