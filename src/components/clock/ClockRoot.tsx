import React from "react";
import type { LocaleTimeDate, Size } from "./helpers";
import { getNtpAdjustedTime } from "./ntp";
import { createOffscreenCanvas } from "./helpers";
import useWorker from "./hooks/useWorker";

import ClockWorker from "./clock.worker?worker&url";


// @vite-ignore
// import * as worker from "./clock.worker";

// const StyledClock = styled.div`
//   color: ${({ theme }) => theme.colors.text};
//   display: flex;
//   font-size: ${({ theme }) => theme.sizes.clock.fontSize};
//   height: 100%;
//   max-width: ${({ theme }) => `calc(${theme.sizes.clock.width} + 10px)}`};
//   min-width: ${({ theme }) => theme.sizes.clock.width};
//   padding: 0 5px;
//   place-content: center;
//   place-items: center;
//   position: absolute;
//   right: 0;

//   &:hover {
//     background-color: ${({ theme }) => theme.colors.taskbar.hover};
//   }

//   &:active {
//     background-color: ${({ theme }) => theme.colors.taskbar.foreground};
//   }
// `;

type ClockWorkerResponse = LocaleTimeDate | "source";

export const ONE_TIME_PASSIVE_EVENT = {
    once: true,
    passive: true,
} as AddEventListenerOptions;

export type ClockSource = "local" | "ntp";

const clockSize: Size = {
    height: 30,
    width: 66,
};

const styledClock = "height-full absolute right-0 bg-red-300";

const MILLISECONDS_IN_SECOND = 1000;

const fontSize = "12px";
const textColor = "rgba(255, 255, 255, 90%)";

const ClockSourceMap = {
    local: "Local",
    ntp: "Server",
};



const ClockRoot = () => {
    const [now, setNow] = React.useState<LocaleTimeDate>({} as LocaleTimeDate);
    const { date, time } = now;
    // 일단 context하나로 따로 빼서 넣기.
    //const { clockSource } = useSession();
    const clockWorkerInit = React.useCallback(
        () =>
            //@vite-ignore
            new Worker(new URL("/clockWorker", import.meta.url), {type: "module"}),
        []
    );
    // 일단 ntp소스만 구현하ㅣ므ㅏ로 필요없음.
    //const clockContextMenu = useClockContextMenu();

    const supportsOffscreenCanvas = React.useMemo(
        () => typeof window !== "undefined" && "OffscreenCanvas" in window,
        []
    );

    const offScreenClockCanvas = React.useRef<OffscreenCanvas>();

    console.log(now)

    const updateTime = React.useCallback(
        ({ data, target: clockWorker }: MessageEvent<ClockWorkerResponse>) => {
            if (data === "source") {
                (clockWorker as Worker).postMessage("ntp");
            } else {
                setNow((currentNow) =>
                    !offScreenClockCanvas.current ||
                    currentNow.date !== data.date
                        ? data
                        : currentNow
                );
            }
        },
        []
    );

    const currentWorker = useWorker<ClockWorkerResponse>(
        clockWorkerInit,
        updateTime
    );

    const clockCallbackRef = React.useCallback(
        (clockContainer: HTMLDivElement | null) => {
            if (
                !offScreenClockCanvas.current &&
                currentWorker.current &&
                clockContainer instanceof HTMLDivElement
            ) {
                [...clockContainer.children].forEach((element) =>
                    element.remove()
                );

                offScreenClockCanvas.current = createOffscreenCanvas(
                    clockContainer,
                    window.devicePixelRatio,
                    clockSize
                );

                currentWorker.current.postMessage(
                    {
                        canvas: offScreenClockCanvas.current,
                        devicePixelRatio: window.devicePixelRatio,
                    },
                    [offScreenClockCanvas.current]
                );
            }
        },
        [currentWorker, now]
    );

    React.useEffect(() => {
        if (supportsOffscreenCanvas) {
            const monitorPixelRatio = (): void =>
                window
                    .matchMedia(`(resolution: ${window.devicePixelRatio}x)`)
                    .addEventListener(
                        "change",
                        () => {
                            currentWorker.current?.postMessage({
                                clockSize,
                                devicePixelRatio: window.devicePixelRatio,
                            });
                            monitorPixelRatio();
                        },
                        ONE_TIME_PASSIVE_EVENT // passive, once로 offscreen에서의 불필요한 버블링 제거
                    );

            monitorPixelRatio();
        }
    }, [currentWorker, supportsOffscreenCanvas]);

    console.log("clock");


    if (!time) return <></>;


    return (
        <div
            className={styledClock}
            ref={supportsOffscreenCanvas ? clockCallbackRef : undefined}
            aria-label={!supportsOffscreenCanvas ? "Clock" : undefined}
            title={date}
            suppressHydrationWarning
        >
            {!supportsOffscreenCanvas ? time : undefined}
        </div>
    );
};

export default ClockRoot;
