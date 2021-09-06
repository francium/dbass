import {Component, ChangeDetectionStrategy, Input, HostBinding} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

import {Status} from "@app/model";
import {statusToSvgIcon} from "@app/model/svg-icons";

@Component({
    selector: "app-status-icon",
    templateUrl: "./status-icon.component.html",
    styleUrls: ["./status-icon.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusIconComponent {
    @Input()
    status?: Status;

    @Input()
    @HostBinding("style.height")
    @HostBinding("style.width")
    height: string = "1rem";

    @HostBinding("innerHTML")
    get statusIcon(): SafeHtml {
        return this.sanitized.bypassSecurityTrustHtml(
            this.status ? statusToSvgIcon(this.status) : "",
        );
    }

    constructor(private sanitized: DomSanitizer) {}
}
