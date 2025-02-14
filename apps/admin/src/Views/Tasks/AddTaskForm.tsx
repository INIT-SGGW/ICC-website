"use client";

import { Button, Input } from "@repo/ui";
import { Dispatch, SetStateAction, useState } from "react";

export function AddTaskForm() {
    const [title, setTitle] = useState<string>("");
    const [releaseDate, setReleaseDate] = useState<Date>(new Date());
    const [partA, setPartA] = useState<File>();
    const [partB, setPartB] = useState<File>();
    const [error, setError] = useState<string | undefined>(undefined);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<File | undefined>>) => {
        if (e.target.files) {
            setValue(e.target.files[0]);
        }
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Reset error message and input borders
        setError(undefined);
        const form = e.currentTarget as HTMLFormElement;
        form.querySelectorAll("input").forEach((input) => {
            input.classList.remove("border-red-500");
            input.classList.add("border-gray-500");
        });

        // Check if form is valid
        if (form.checkValidity() === false) {
            const firstInvalidElement = form.querySelector(":invalid") as HTMLInputElement;
            firstInvalidElement.classList.remove("border-gray-500");
            firstInvalidElement.classList.add("border-red-500");

            setError(firstInvalidElement?.validationMessage || "Invalid input.");
            return;
        }
        if (partA?.name.match(/\.md$/) === null || partB?.name.match(/\.md$/) === null) {
            setError("Plik musi być w formacie .md");
            return;
        }

        console.log(title, releaseDate, partA!, partB!);
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { handleSubmit(e) }}>
            <Input required type="text" placeholder="Tytuł" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input required type="date" placeholder="Data wydania" value={releaseDate?.toISOString().split("T")[0]} onChange={(e) => setReleaseDate(new Date(e.target.value))} />
            <div className="flex gap-2 flex-wrap">
                <div className="flex-grow min-w-[200px]">
                    <label htmlFor="part-a" className="text-white">Część A</label>
                    <Input required id="part-a" type="file" placeholder="Opis zadania" accept=".md" onChange={(e) => handleFileChange(e, setPartA)} />
                </div>
                <div className="flex-grow min-w-[200px]">
                    <label htmlFor="part-b" className="text-white">Część B</label>
                    <Input required id="part-b" type="file" placeholder="Opis zadania" accept=".md" onChange={(e) => handleFileChange(e, setPartB)} />
                </div>
            </div>
            <Button type="submit">Dodaj zadanie</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}