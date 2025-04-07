"use client";

import type { CreateTaskFormDTO } from "@repo/types";
import { Semester } from "@repo/types";
import { Button, Input, Select } from "@repo/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CustomError from "../../utils/CustomError";
import { useAddTask } from "../../services/api";
import { HttpMethods } from "../../types/enums";

const validateData = (data: CreateTaskFormDTO): string | null => {
    if (data.title.length === 0) return "Tytuł nie może być pusty";
    if (data.taskNumber <= 0 && data.taskNumber <= 12) return "Numer zadania musi być większy od 0 i mniejszy od 12";
    if (data.partA === null) return "Musisz dodać plik z częścią A";
    if (/\.md$/.exec(data.partA.name) === null) return "Plik z części A musi być w formacie .md";
    if (data.partB === null) return "Musisz dodać plik z częścią B";
    if (/\.md$/.exec(data.partB.name) === null) return "Plik z części B musi być w formacie .md";
    if (data.answers === null) return "Musisz dodać plik z odpowiedziami";
    if ((/\.zip$/.exec(data.answers.name)) === null) return "Plik z odpowiedziami musi być w formacie .zip";

    return null;
}

export function AddTaskForm(): React.JSX.Element {
    const router = useRouter();
    const { trigger, isMutating } = useAddTask();
    const [formData, setFormData] = useState<CreateTaskFormDTO>({
        title: "",
        semester: Semester.LETNI,
        taskNumber: 0,
        releaseDate: new Date(),
        partA: null,
        partB: null,
        answers: null
    });
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: (file: File | null) => void): void => {
        if (e.target.files && e.target.files.length > 0) {
            setValue(e.target.files[0]);
        } else {
            setValue(null);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);

        const validationError = validateData(formData);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Release time is 18:00
        const correctTimeDate = new Date(formData.releaseDate);
        correctTimeDate.setHours(18, 0, 0, 0);

        const partAContent = await formData.partA!.text(); //eslint-disable-line @typescript-eslint/no-non-null-assertion -- checked by validation
        const partBContent = await formData.partB!.text(); //eslint-disable-line @typescript-eslint/no-non-null-assertion -- checked by validation
        const data = new FormData();
        data.append("title", formData.title);
        data.append("taskNumber", formData.taskNumber.toString());
        data.append("releaseDate", correctTimeDate.toUTCString());
        data.append("semester", formData.semester);
        data.append("partA", partAContent);
        data.append("partB", partBContent);
        data.append("answers", formData.answers as Blob);

        try {
            await trigger({ body: data, method: HttpMethods.POST });
            router.push("/tasks");
        } catch (er: unknown) {
            if (er instanceof Error || er instanceof CustomError) {
                setError(er.message);
            } else {
                setError("Wystąpił błąd podczas dodawania zadania");
            }
        }
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { void handleSubmit(e) }} >
            <Input type="text" placeholder="Tytuł" value={formData.title} onChange={(e) => { setFormData((prev) => ({ ...prev, title: e.target.value })); }} />
            <div >
                <label htmlFor="task-number" className="text-white">Numer zadania</label>
                <Input min={1} max={12} id="task-number" type="number" placeholder="Numer zadania" value={formData.taskNumber} onChange={(e) => { setFormData((prev) => ({ ...prev, taskNumber: Number(e.target.value) })); }} />
            </div>
            <div >
                <label htmlFor="release-date" className="text-white">Data wydania</label>
                <Input id="release-date" type="date" placeholder="Data wydania" value={formData.releaseDate.toISOString().split("T")[0]} onChange={(e) => { setFormData((prev) => ({ ...prev, releaseDate: new Date(e.target.value) })); }} />
            </div>
            <div>
                <label htmlFor="semester" className="text-white">Semestr</label>
                <Select id="semester" value={formData.semester} onChange={(e) => { setFormData((prev) => ({ ...prev, semester: e.target.value as Semester })) }}>
                    <option value={Semester.ZIMOWY}>{Semester.ZIMOWY}</option>
                    <option value={Semester.LETNI}>{Semester.LETNI}</option>
                </Select>
            </div>
            <div>
                <label htmlFor="part-a" className="text-white">Część A</label>
                <Input id="part-a" type="file" placeholder="Opis zadania" accept=".md" onChange={(e) => { handleFileChange(e, (file: File | null) => { setFormData((prev) => ({ ...prev, partA: file })) }); }} />
            </div>
            <div>
                <label htmlFor="part-b" className="text-white">Część B</label>
                <Input id="part-b" type="file" placeholder="Opis zadania" accept=".md" onChange={(e) => { handleFileChange(e, (file: File | null) => { setFormData((prev) => ({ ...prev, partB: file })) }); }} />
            </div>
            <div>
                <label htmlFor="answers" className="text-white">Input i odpowiedzi</label>
                <Input id="answers" type="file" placeholder="Opis zadania" accept=".zip" onChange={(e) => { handleFileChange(e, (file: File | null) => { setFormData((prev) => ({ ...prev, answers: file })) }); }} />
            </div>
            <Button type="submit" disabled={isMutating} className="mt-4">{isMutating ? "..." : "Dodaj zadanie"}</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}