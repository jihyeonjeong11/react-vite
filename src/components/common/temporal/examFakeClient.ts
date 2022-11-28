import localforage from "localforage";
import { matchSorter } from "match-sorter";

export async function getExams(query) {
    await fakeNetwork(`getContacts:${query}`);
    let exams = await localforage.getItem("exams");
    if (!exams) exams = [];
    if (query) {
        exams = matchSorter(exams, query, { keys: ["first", "last"] });
    }
    return exams;
}

export async function createExam(mec_nm) {
    await fakeNetwork();
    let id = Math.random().toString(36).substring(2, 9);
    let exam = { id, createdAt: Date.now(), mec_nm };
    let exams = await getExams();
    console.log(exams, Array.isArray(exams))
    exams = [exam, ...exams]
    await set(exams);
    return exam;
}

export async function getExam(id) {
    await fakeNetwork(`contact:${id}`);
    let exams = await localforage.getItem("exams");
    let exam = exams.find((exam) => exam.id === id);
    return exam ?? null;
}

export async function updateExam(id, updates) {
    await fakeNetwork();
    let exams = await localforage.getItem("exams");
    let exam = exams.find((exam) => exam.id === id);
    if (!exam) throw new Error("No exam found for", id);
    exam = {...exam, ...updates};
    await set(exams);
    return exam;
}

export async function deleteContact(id) {
    let exams = await localforage.getItem("contacts");
    let index = exams.findIndex((exam) => exam.id === id);
    if (index > -1) {
        exams.splice(index, 1);
        await set(exams);
        return true;
    }
    return false;
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
        setTimeout(res, Math.random() * 800);
    });
}
