"use client";

import { CreateTaskFormDTO, GetTaskAdminResponse, GetTaskUpdateResponse, Semester } from "@repo/types";
import { Button, Input, Select } from "@repo/ui";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import CustomError from "../../utils/CustomError";
import { HttpMethods } from "../../types/enums";
import { useRouter } from "next/navigation";
import { useGetTask } from "../../services/api";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- Temporary
export function UpdateTaskForm({ id }: Props): React.JSX.Element {
    const router = useRouter();
    const { data, error, isLoading } = useGetTask(`/admin/tasks/${id}`);
    const [isFetching, setIsFetching] = useState<boolean>(false);
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
        setIsFetching(true);
        setErrorMessage(null);

        const validationError = validateData(formData);
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        const data = new FormData();
        data.append("title", formData.title);
        data.append("taskNumber", formData.taskNumber.toString());
        data.append("releaseDate", formData.releaseDate.toISOString());
        data.append("semester", formData.semester);
        if (formData.partA) {
            const partAContent = await formData.partA.text();
            data.append("partA", partAContent);
        }
        if (formData.partB) {
            const partBContent = await formData.partB.text();
            data.append("partB", partBContent);
        }
        if (formData.answers) {
            data.append("answers", formData.answers as Blob);
        } else {
            data.append("answers", "false");
        }

        try {
            const url = process.env.NEXT_PUBLIC_ICC_API_URL || "";
            // formData type is garantued by validation check
            const response: Response = await fetch(`${url}/admin/tasks/${id}`, {
                method: HttpMethods.PATCH,
                body: data,
                credentials: "include"
            });

            if (!response.ok) {
                const res = await response.json();
                let message = "Wystąpił błąd podczas komunikacji z serwerem.";
                if (res.errors && res.errors.length > 0 && res.errors[0].message) {
                    message = res.errors[0].message;
                } else if (res.detail) {
                    message = res.detail;
                } else if (res.status) {
                    message = res.status;
                }

                const error = new CustomError(message);
                error.status = response.status;
                throw error;
            }

            const res = await response.json() as GetTaskUpdateResponse;
            setFormData((prev) => ({
                title: res.title,
                semester: res.semester,
                taskNumber: res.taskNumber,
                releaseDate: new Date(res.releaseDate),
                partA: prev.partA,
                partB: prev.partB,
                answers: prev.answers
            }))
            // router.push("/tasks");
        } catch (e: unknown) {
            if (e instanceof Error || e instanceof CustomError) {
                setErrorMessage(e.message);
                setIsFetching(false);
                return;
            }
        }
        setIsFetching(false);
    }

    if (isLoading) return <p className="text-white text-center">{error ? `Error: ${error.message}` : "Loading..."}</p>

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { handleSubmit(e) }} >
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
            <Button type="submit" disabled={isFetching} className="mt-4">{isFetching ? "..." : "Modyfikuj zadanie"}</Button>
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
        </form>
    )
}