import localforage from "localforage";
import { matchSorter } from "match-sorter";
import { fakeScenarios, fakeRooms } from "./fakeConstants";

// 차후 exam.d.ts 로 옮김
export type Exam = {
    id: string;
    createdAt: number;
    // Datetime의 경우 date_fn 이나 momentjs를 사용합시다.
    mec_nm: string;
};

export type ExamsType = Exam[] | null;

// 여기 내용은 차후 exam.d.ts로 옮김.
// https://www.notion.so/SIMPREC_V2_1-6b206a7f9b2d45d9b267a5471205039d?p=a6dcb0660a4e425d85d3e46a0bfa7a07&pm=s
export type Room = {
    room_cd: string;
    room_nm: string;
};

export type RoomsType = Room[] | null;

export type Scenario = {
    scenario_cd: string;
    scenario_nm: string;
};

export type ScenariosType = Scenario[] | null;

export async function getExams(query?: string) {
    await fakeNetwork(`getContacts:${query}`);
    let exams: ExamsType | null = await localforage.getItem("exams");
    if (!exams) exams = [];
    if (query) {
        exams = matchSorter(exams, query, { keys: ["first", "last"] });
    }
    return exams;
}

export async function createExam(mec_nm: string) {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let exam: Exam = { id, createdAt: Date.now(), mec_nm };
    let exams = await getExams();
    exams = [exam, ...exams];
    await set(exams);
    return exam;
}

export async function getExam(id: string) {
    await fakeNetwork(`contact:${id}`);
    let exams: ExamsType = await localforage.getItem("exams");
    if (!exams) exams = [];
    let exam = exams.find((exam) => exam.id === id);
    return exam ?? null;
}

export async function updateExam(id: string, updates: Exam) {
    await fakeNetwork();
    let exams: ExamsType = await localforage.getItem("exams");
    if (!exams) exams = [];
    let exam = exams.find((exam) => exam.id === id);
    if (!exam) throw new Error("No exam found for " + id + ".");
    exam = { ...exam, ...updates };
    await set(exams);
    return exam;
}

export async function deleteContact(id: string) {
    let exams: ExamsType = await localforage.getItem("contacts");
    if (!exams) exams = [];
    let index = exams.findIndex((exam) => exam.id === id);
    if (index > -1) {
        exams.splice(index, 1);
        await set(exams);
        return true;
    }
    return false;
}

export async function getRooms() {
    await fakeNetwork('room');
    let rooms: RoomsType = await localforage.getItem("rooms");
    if (!rooms) rooms = fakeRooms;

    return rooms;
}

export async function getScenarios(rooms?: {Rooms: RoomsType}) {
    await fakeNetwork('scenario');
    let scenarios: ScenariosType = await localforage.getItem("scenarios");
    if (!scenarios) scenarios = fakeScenarios;

    if(rooms) return {scenarios, rooms};

    return scenarios;

    
}

function set(anyObject: any) {
    return localforage.setItem("exams", anyObject);
}

let fakeCache: Record<string, {}> = {};

async function fakeNetwork(key: string = "e_mec") {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, 500 * Math.random());
    });
}

