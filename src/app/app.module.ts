import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppComponent} from "./app.component";
import {EditorComponent} from "./component/editor/editor.component";

@NgModule({
    declarations: [AppComponent, EditorComponent],
    imports: [BrowserModule],
    bootstrap: [AppComponent],
})
export class AppModule {}
