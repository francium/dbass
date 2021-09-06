import {Status} from ".";

export const loading = `
<svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    style="margin: auto; display: block"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    preserveAspectRatio="xMidYMid"
>
    <circle
        cx="50"
        cy="50"
        r="32"
        stroke-width="11"
        stroke="#fc6f09"
        stroke-dasharray="50.26548245743669 50.26548245743669"
        fill="none"
        stroke-linecap="round"
    >
        <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            keyTimes="0;1"
            values="0 50 50;360 50 50"
        ></animateTransform>
    </circle>
</svg>
`;

export const checkmark = `
<svg
        xml:space="preserve"
        viewBox="0 0 100 100"
        y="0"
        x="0"
        xmlns="http://www.w3.org/2000/svg"
        id="圖層_1"
        version="1.1"
        style="height: 100%; width: 100%"
        width="136px"
        height="136px"
    >
        <g
            style="transform-origin: 50% 50% 0px; transform: rotate(0deg) scale(1)"
            class="ldl-scale"
        >
            <g class="ldl-ani">
                <g class="ldl-layer">
                    <g class="ldl-ani">
                        <g>
                            <g class="ldl-layer">
                                <g
                                    class="ldl-ani"
                                    style="
                                        transform-origin: 50px 50px 0px;
                                        transform: matrix(1, 0, 0, 1, 0, 0);
                                        animation: 0.429185s linear 0s 1 normal forwards
                                            running
                                            float-btt-in-1447d733-c778-4007-9ea0-155adec1fa1e;
                                    "
                                >
                                    <path
                                        fill="#849b87"
                                        d="M45.459 77.819l44.795-44.794A7.668 7.668 0 1 0 79.409 22.18L40.037 61.553 20.591 42.107A7.668 7.668 0 1 0 9.746 52.952L34.614 77.82a7.647 7.647 0 0 0 5.422 2.246 7.653 7.653 0 0 0 5.423-2.247z"
                                        style="fill: rgb(252, 111, 9)"
                                    ></path>
                                </g>
                            </g>
                        </g>
                    </g>
                </g>
            </g>
        </g>
</svg>
`;

export const cross = `
<svg
    xml:space="preserve"
    viewBox="0 0 100 100"
    y="0"
    x="0"
    xmlns="http://www.w3.org/2000/svg"
    id="圖層_1"
    version="1.1"
    style="height: 100%; width: 100%;"
    width="100%"
    height="100%"
>
    <g
        style="transform-origin: 50% 50% 0px; transform: rotate(0deg)"
        class="ldl-scale"
    >
        <g class="ldl-ani">
            <g class="ldl-layer">
                <g
                    class="ldl-ani"
                    style="
                        transform-origin: 50px 50px 0px;
                        animation: 1.11111s linear -1.11111s infinite normal forwards running
                            static-6ea39f17-dd6a-4710-9379-f96dc3e71045;
                    "
                >
                    <path
                        fill="#e15b64"
                        d="M69.863 19.947L50 39.81 30.137 19.946c-2.809-2.809-7.379-2.809-10.189 0s-2.809 7.38 0 10.189l19.863 19.863-19.863 19.864c-2.809 2.809-2.809 7.38 0 10.189s7.379 2.809 10.189 0L50 60.188l19.863 19.863c2.809 2.809 7.379 2.809 10.189 0s2.809-7.38 0-10.189L60.189 49.998l19.863-19.863c2.809-2.809 2.809-7.38 0-10.189s-7.379-2.808-10.189.001z"
                        style="fill: rgb(252, 111, 9)"
                    ></path>
                </g>
            </g>
        </g>
    </g>
</svg>
`;

export function statusToSvgIcon(status: Status): string {
    switch (status) {
        case "error":
            return cross;
        case "ok":
            return checkmark;
        case "processing":
            return loading;
    }
}
