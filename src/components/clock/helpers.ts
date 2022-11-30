import type { Props } from "react-rnd";

export type Size = NonNullable<Props["size"]>;

export type LocaleTimeDate = {
    date: string;
    time: string;
};

//INTL object의 경우, i18n을 대체할 수도 있을 것으로 보임..

const DEFAULT_LOCALE = "ko";

const dateFormat: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
};

const timeFormat: Intl.DateTimeFormatOptions = {
    // hour: "numeric",
    // hour12: true,
    // minute: "2-digit",
    // second: "2-digit",
    timeStyle: "medium"
};

const dayFormat: Intl.DateTimeFormatOptions = {
    weekday: "long",
};

export const formatLocaleDateTime = (now: Date): LocaleTimeDate => {
    const date = new Intl.DateTimeFormat(DEFAULT_LOCALE, dateFormat).format(
        now
    );
    const day = new Intl.DateTimeFormat(DEFAULT_LOCALE, dayFormat).format(now);
    const time = new Intl.DateTimeFormat(DEFAULT_LOCALE, timeFormat).format(
        now
    );

    return {
        date: `${date}\n${day}`,
        time,
    };
};

// https://medium.com/samsung-internet-dev/offscreencanvas-workers-and-performance-3023ca15d7c7
// 워커 + 오프스크린캔버스로 퍼포먼스 향상 article
// 위 url에서는 worker에서 캔버스를 그렸음. 무엇이 더 나은지?? 하지만 캔버스 자체가 그렇게 계산량이 많지는 않다고 생각함(내 생각)

export const createOffscreenCanvas = (
    containerElement: HTMLElement,
    devicePixelRatio = 1,
    customSize: Size = {} as Size
)  => {
    const canvas = document.createElement("canvas");
    const height = Number(customSize?.height) || containerElement.offsetHeight;
    const width = Number(customSize?.width) || containerElement.offsetWidth;

    canvas.style.height = `${height}px`;
    canvas.style.width = `${width}px`;

    canvas.height = Math.floor(height * devicePixelRatio);
    canvas.width = Math.floor(width * devicePixelRatio);

    containerElement.appendChild(canvas);

    return canvas.transferControlToOffscreen();
};
