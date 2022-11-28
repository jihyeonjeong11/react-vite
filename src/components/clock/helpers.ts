import type { Props } from "react-rnd";

export type Size = NonNullable<Props["size"]>;

export type LocaleTimeDate = {
    date: string;
    time: string;
};

const DEFAULT_LOCALE = "en";

const dateFormat: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
};

const timeFormat: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    hour12: true,
    minute: "2-digit",
    second: "2-digit",
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

    // https://github.com/microsoft/TypeScript/issues/45745 타입스ㅜ크립트에서 지워짐
    return canvas.transferControlToOffscreen();
};
