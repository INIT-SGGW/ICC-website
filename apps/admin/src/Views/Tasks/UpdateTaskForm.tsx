"use client";

import type { CreateTaskFormDTO } from "@repo/types";
import { Semester } from "@repo/types";
import { Button, Input, Select } from "@repo/ui";
import { useEffect, useState } from "react";
import CustomError from "../../utils/CustomError";
import { HttpMethods } from "../../types/enums";
import { useRouter } from "next/navigation";
import { useGetTask, useUpdateTask } from "../../services/api";

type Props = {
    id: number
}

const validateData = (data: CreateTaskFormDTO): string | null => {
    if (data.title.length === 0) return "Tytuł nie może być pusty";
    if (data.taskNumber <= 0 && data.taskNumber <= 12) return "Numer zadania musi być większy od 0 i mniejszy od 12";
    if (data.partA?.name.match(/\.md$/) === null) return "Plik z części A musi być w formacie .md";
    if (data.partB?.name.match(/\.md$/) === null) return "Plik z części B musi być w formacie .md";
    if (data.answers?.name.match(/\.zip$/) === null) return "Plik z odpowiedziami musi być w formacie .zip";

    return null;
}


export function UpdateTaskForm({ id }: Props): React.JSX.Element {
    const router = useRouter();
    const { data, error, isLoading } = useGetTask(`/admin/tasks/${id}`);
    const { trigger, isMutating } = useUpdateTask(id.toString());

    const [formData, setFormData] = useState<CreateTaskFormDTO>({
        title: "",
        semester: Semester.LETNI,
        taskNumber: 0,
        releaseDate: new Date(),
        partA: null,
        partB: null,
        answers: null
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    useEffect(() => {
        if (data) {
            setFormData({
                title: data.title,
                semester: data.semester,
                taskNumber: data.taskNumber,
                releaseDate: new Date(data.releaseDate),
                partA: null,
                partB: null,
                answers: null
            });
        }
    }, [data]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: (file: File | null) => void): void => {
        if (e.target.files && e.target.files.length > 0) {
            setValue(e.target.files[0]);
        } else {
            setValue(null);
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErrorMessage(null);

        const validationError = validateData(formData);
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        const correctTimeDate = new Date(formData.releaseDate);
        correctTimeDate.setHours(18, 0, 0, 0);

        const updateData = new FormData();
        updateData.append("title", formData.title);
        updateData.append("taskNumber", formData.taskNumber.toString());
        updateData.append("releaseDate", correctTimeDate.toUTCString());
        updateData.append("semester", formData.semester);

        if (formData.partA) {
            const partAContent = await formData.partA.text();
            updateData.append("partA", partAContent);
        }
        if (formData.partB) {
            const partBContent = await formData.partB.text();
            updateData.append("partB", partBContent);
        }
        if (formData.answers) {
            updateData.append("answers", formData.answers as Blob);
        } else {
            updateData.append("answers", "false");
        }

        try {
            await trigger({ body: updateData, method: HttpMethods.PATCH });
            router.push("/tasks");
        } catch (er: unknown) {
            if (er instanceof Error || er instanceof CustomError) {
                setErrorMessage(er.message);
            } else {
                setErrorMessage("Wystąpił błąd podczas modyfikacji zadania");
            }
        }
    }

    if (isLoading) return <p className="text-white text-center">{error ? `Error: ${error.message}` : "Loading..."}</p>

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { void handleSubmit(e) }} >
            <Input name="title" type="text" placeholder="Tytuł" value={formData.title} onChange={(e) => { setFormData((prev) => ({ ...prev, title: e.target.value })); }} />
            <div >
                <label htmlFor="task-number" className="text-white">Numer zadania</label>
                <Input name="taskNumber" min={1} max={12} id="task-number" type="number" placeholder="Numer zadania" value={formData.taskNumber} onChange={(e) => { setFormData((prev) => ({ ...prev, taskNumber: Number(e.target.value) })); }} />
            </div>
            <div >
                <label htmlFor="release-date" className="text-white">Data wydania</label>
                <Input name="realeaseDate" id="release-date" type="date" placeholder="Data wydania" value={formData.releaseDate.toISOString().split("T")[0]} onChange={(e) => { setFormData((prev) => ({ ...prev, releaseDate: new Date(e.target.value) })); }} />
            </div>
            <div>
                <label htmlFor="semester" className="text-white">Semestr</label>
                <Select name="semester" id="semester" value={formData.semester} onChange={(e) => { setFormData((prev) => ({ ...prev, semester: e.target.value as Semester })) }}>
                    <option value={Semester.ZIMOWY}>{Semester.ZIMOWY}</option>
                    <option value={Semester.LETNI}>{Semester.LETNI}</option>
                </Select>
            </div>
            <div>
                <label htmlFor="part-a" className="text-white">Część A</label>
                <Input name="partA" id="part-a" type="file" placeholder="Opis zadania" accept=".md" onChange={(e) => { handleFileChange(e, (file: File | null) => { setFormData((prev) => ({ ...prev, partA: file })) }); }} />
            </div>
            <div>
                <label htmlFor="part-b" className="text-white">Część B</label>
                <Input name="partB" id="part-b" type="file" placeholder="Opis zadania" accept=".md" onChange={(e) => { handleFileChange(e, (file: File | null) => { setFormData((prev) => ({ ...prev, partB: file })) }); }} />
            </div>
            <div>
                <label htmlFor="answers" className="text-white">Input i odpowiedzi</label>
                <Input name="answers" id="answers" type="file" placeholder="Opis zadania" accept=".zip" onChange={(e) => { handleFileChange(e, (file: File | null) => { setFormData((prev) => ({ ...prev, answers: file })) }); }} />
            </div>
            <Button type="submit" disabled={isMutating} className="mt-4">{isMutating ? "..." : "Modyfikuj zadanie"}</Button>
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        </form>
    )
}