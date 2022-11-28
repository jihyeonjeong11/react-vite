import React from 'react';

const doSomething = () => {
    console.log('eeor')
    return 'anything'
}


// //Size는 useRnd로 갈것
// import type { LocaleTimeDate, Size } from "./helpers";
// import { formatLocaleDateTime } from "./helpers";
// import { getNtpAdjustedTime } from "./ntp";

// export type OffscreenRenderProps = {
//     canvas: OffscreenCanvas;
//     clockSize?: Size;
//     devicePixelRatio: number;
// };

// const formats = {
//     dateModified: {
//         hour: "numeric",
//         hour12: true,
//         minute: "2-digit",
//     } as Intl.DateTimeFormatOptions,
//     systemFont:
//         "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
// };

// const MILLISECONDS_IN_SECOND = 1000;

// const fontSize = "12px";
// const textColor = "rgba(255, 255, 255, 90%)";

// export type ClockSource = "ntp" | "local";

// let mode: ClockSource;
// let offscreenCanvas: OffscreenCanvas;
// let offscreenContext: OffscreenCanvasRenderingContext2D;

// const getNow = (): Date =>
//     !mode || mode === "local" ? new Date() : getNtpAdjustedTime();

// const textPosition = {
//     x: 0,
//     y: 0,
// };

// const TEXT_HEIGHT_OFFSET = 1;

// const styleClock = (): void => {
//     offscreenContext.scale(global.devicePixelRatio, global.devicePixelRatio);
//     offscreenContext.fillStyle = textColor;
//     offscreenContext.font = `${fontSize} ${formats.systemFont}`;
//     offscreenContext.textAlign = "center";
//     offscreenContext.textBaseline = "middle";

//     textPosition.y =
//         Math.floor(offscreenCanvas.height / global.devicePixelRatio / 2) +
//         TEXT_HEIGHT_OFFSET;
//     textPosition.x = Math.floor(
//         offscreenCanvas.width / global.devicePixelRatio / 2
//     );
// };

// const drawClockText = (dateTime: LocaleTimeDate): void => {
//     if (!offscreenContext) {
//         offscreenContext = offscreenCanvas.getContext(
//             "2d"
//         ) as OffscreenCanvasRenderingContext2D;

//         if (!offscreenContext) return;

//         styleClock();
//     }

//     offscreenContext.clearRect(
//         0,
//         0,
//         offscreenCanvas.width,
//         offscreenCanvas.height
//     );
//     offscreenContext.fillText(dateTime.time, textPosition.x, textPosition.y);
// };

// const sendTick = (): void => {
//     const now = getNow();

//     const dateTime = formatLocaleDateTime(now);

//     globalThis.postMessage(dateTime);
//     if (offscreenCanvas) drawClockText(dateTime);
// };

// let initialized = false;

// globalThis.addEventListener(
//     "message",
//     ({ data }: { data: ClockSource | OffscreenRenderProps | "init" }) => {
//         if (!initialized) {
//             if (data === "init") {
//                 initialized = true;
//                 globalThis.postMessage("source");
//             }
//             return;
//         }

//         if (
//             "OffscreenCanvas" in global &&
//             (data as OffscreenRenderProps)?.devicePixelRatio
//         ) {
//             const { canvas, clockSize, devicePixelRatio } =
//                 data as OffscreenRenderProps;

//             global.devicePixelRatio = devicePixelRatio;

//             if (canvas instanceof OffscreenCanvas) {
//                 offscreenCanvas = canvas;
//             } else if (clockSize && devicePixelRatio) {
//                 offscreenCanvas.height = Math.floor(
//                     Number(clockSize.height) * devicePixelRatio
//                 );
//                 offscreenCanvas.width = Math.floor(
//                     Number(clockSize.width) * devicePixelRatio
//                 );
//                 styleClock();
//             }

//             sendTick();

//             return;
//         }

//         if (data === "local" || data === "ntp") mode = data;

//         sendTick();
//         globalThis.setTimeout(() => {
//             sendTick();
//             globalThis.setInterval(sendTick, MILLISECONDS_IN_SECOND);
//         }, MILLISECONDS_IN_SECOND - new Date().getMilliseconds());
//     },
//     { passive: true }
// );

// //Size는 useRnd로 갈것
// import type { LocaleTimeDate, Size } from "./helpers";
// import { formatLocaleDateTime } from "./helpers";
// import { getNtpAdjustedTime } from "./ntp";

// export type OffscreenRenderProps = {
//     canvas: OffscreenCanvas;
//     clockSize?: Size;
//     devicePixelRatio: number;
// };

// const formats = {
//     dateModified: {
//         hour: "numeric",
//         hour12: true,
//         minute: "2-digit",
//     } as Intl.DateTimeFormatOptions,
//     systemFont:
//         "-apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
// };

// const MILLISECONDS_IN_SECOND = 1000;

// const fontSize = "12px";
// const textColor = "rgba(255, 255, 255, 90%)";

// export type ClockSource = "ntp" | "local";

// let mode: ClockSource;
// let offscreenCanvas: OffscreenCanvas;
// let offscreenContext: OffscreenCanvasRenderingContext2D;

// const getNow = (): Date =>
//     !mode || mode === "local" ? new Date() : getNtpAdjustedTime();

// const textPosition = {
//     x: 0,
//     y: 0,
// };

// const TEXT_HEIGHT_OFFSET = 1;

// const styleClock = (): void => {
//     offscreenContext.scale(global.devicePixelRatio, global.devicePixelRatio);
//     offscreenContext.fillStyle = textColor;
//     offscreenContext.font = `${fontSize} ${formats.systemFont}`;
//     offscreenContext.textAlign = "center";
//     offscreenContext.textBaseline = "middle";

//     textPosition.y =
//         Math.floor(offscreenCanvas.height / global.devicePixelRatio / 2) +
//         TEXT_HEIGHT_OFFSET;
//     textPosition.x = Math.floor(
//         offscreenCanvas.width / global.devicePixelRatio / 2
//     );
// };

// const drawClockText = (dateTime: LocaleTimeDate): void => {
//     if (!offscreenContext) {
//         offscreenContext = offscreenCanvas.getContext(
//             "2d"
//         ) as OffscreenCanvasRenderingContext2D;

//         if (!offscreenContext) return;

//         styleClock();
//     }

//     offscreenContext.clearRect(
//         0,
//         0,
//         offscreenCanvas.width,
//         offscreenCanvas.height
//     );
//     offscreenContext.fillText(dateTime.time, textPosition.x, textPosition.y);
// };

// const sendTick = (): void => {
//     const now = getNow();

//     const dateTime = formatLocaleDateTime(now);

//     globalThis.postMessage(dateTime);
//     if (offscreenCanvas) drawClockText(dateTime);
// };

// let initialized = false;

// globalThis.addEventListener(
//     "message",
//     ({ data }: { data: ClockSource | OffscreenRenderProps | "init" }) => {
//         if (!initialized) {
//             if (data === "init") {
//                 initialized = true;
//                 globalThis.postMessage("source");
//             }
//             return;
//         }

//         if (
//             "OffscreenCanvas" in global &&
//             (data as OffscreenRenderProps)?.devicePixelRatio
//         ) {
//             const { canvas, clockSize, devicePixelRatio } =
//                 data as OffscreenRenderProps;

//             global.devicePixelRatio = devicePixelRatio;

//             if (canvas instanceof OffscreenCanvas) {
//                 offscreenCanvas = canvas;
//             } else if (clockSize && devicePixelRatio) {
//                 offscreenCanvas.height = Math.floor(
//                     Number(clockSize.height) * devicePixelRatio
//                 );
//                 offscreenCanvas.width = Math.floor(
//                     Number(clockSize.width) * devicePixelRatio
//                 );
//                 styleClock();
//             }

//             sendTick();

//             return;
//         }

//         if (data === "local" || data === "ntp") mode = data;

//         sendTick();
//         globalThis.setTimeout(() => {
//             sendTick();
//             globalThis.setInterval(sendTick, MILLISECONDS_IN_SECOND);
//         }, MILLISECONDS_IN_SECOND - new Date().getMilliseconds());
//     },
//     { passive: true }
// );
