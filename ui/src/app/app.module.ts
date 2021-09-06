import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {BasicStatusBarComponent} from "./component/basic-status-bar/basic-status-bar.component";
import {DataPanelStatusBarComponent} from "./component/data-panel-status-bar/data-panel-status-bar.component";
import {DataPanelComponent} from "./component/data-panel/data-panel.component";
import {EditorStatusBarComponent} from "./component/editor-status-bar/editor-status-bar.component";
import {EditorComponent} from "./component/editor/editor.component";
import {HeaderBarComponent} from "./component/header-bar/header-bar.component";
import {StatusIconComponent} from "./component/status-icon/status-icon.component";

@NgModule({
    declarations: [
        AppComponent,
        EditorComponent,
        EditorStatusBarComponent,
        HeaderBarComponent,
        DataPanelComponent,
        BasicStatusBarComponent,
        DataPanelStatusBarComponent,
        StatusIconComponent,
    ],
    imports: [BrowserModule, CommonModule, HttpClientModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
