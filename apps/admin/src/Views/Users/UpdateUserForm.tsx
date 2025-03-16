"use client";

import type { UpdateUserRequest } from "@repo/types";
import { Degree, Faculty } from "@repo/types";
import { Button, Input, Select } from "@repo/ui";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useGetSingleUser, useUpdateUser } from "../../services/api";
import { HttpMethods } from "../../types/enums";

type Props = {
    id: string;
}

const validate = (formData: UpdateUserRequest): string | null => {
    const emailRegex = /^[a-z]\d{6}@sggw.edu.pl$/;
    const invalidEmailsIndexes = formData.emails.map((elem, index) => emailRegex.test(elem) ? -1 : index).filter((elem) => elem !== -1);
    if (invalidEmailsIndexes.length > 0) return `Niepoprawny format adresu email: ${invalidEmailsIndexes.map((elem) => formData.emails[elem]).join(", ")}`;
    if (formData.firstName.length < 2) return "Imię musi mieć co najmniej 2 znaki";
    if (formData.lastName.length < 2) return "Nazwisko musi mieć co najmniej 2 znaki";
    if (formData.academicYear < 1 || formData.academicYear > 5) return "Rok studiów jest nieprawidłowy";
    if (!Object.values(Degree).includes(formData.degree)) return "Niepoprawny stopień naukowy";
    if (!Object.values(Faculty).includes(formData.faculty)) return "Niepoprawny wydział";
    return null;
}

export function UpdateUserForm({ id }: Props): React.JSX.Element {
    const [formData, setFormData] = useState<UpdateUserRequest>({
        emails: [],
        firstName: "",
        lastName: "",
        academicYear: 0,
        degree: Degree.INNY,
        faculty: Faculty.INF
    })
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const { data, error: getError } = useGetSingleUser(id);
    const { trigger, isMutating } = useUpdateUser(id);

    useEffect(() => {
        if (data) {
            setFormData({
                emails: data.emails,
                firstName: data.firstName,
                lastName: data.lastName,
                academicYear: data.academicYear,
                degree: data.degree,
                faculty: data.faculty
            });
        }
    }, [data])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError(null);

        const validationErrors = validate(formData);
        if (validationErrors) {
            setError(validationErrors);
            return;
        }

        try {
            await trigger({ method: HttpMethods.PATCH, body: formData, credentials: true });
            setError(null);
            router.push("/users");
        } catch (err: unknown) {
            setError("Nie udało się zaktualizować danych");
        }
    }

    const handleSetAcademicYear = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // all this acrobatics so that input field can be a string and placeholder can be shown
        const value = e.target.value
        if (value === "") { setFormData((prev) => ({ ...prev, academicYear: 0 })); return; }
        const intValue = Number(value)
        if (isNaN(intValue)) { setError("Rok studiów musi być liczbą"); return; }
        setFormData((prev) => ({ ...prev, academicYear: intValue }))
    }

    const handleSetEmails = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const value = e.target.value.split(",");
        const emails = value.map((elem) => elem.trim());
        setFormData((prev) => ({ ...prev, emails }));
    }

    if (getError) {
        return <div className="text-center">
            <h1 className="text-cred text-4xl">Ups...</h1>
            <p className="text-white text-lg">Wystąpił problem podczas pobierania danych</p>
        </div>
    }

    return (
        <form className="w-full max-w-[600px] flex flex-col gap-2" noValidate onSubmit={(e) => { void handleSubmit(e) }}>
            <Input required type="email" placeholder="Email*" value={formData.emails} onChange={handleSetEmails} />
            <Input required type="text" placeholder="Imię" value={formData.firstName} onChange={(e) => { setFormData((prev) => ({ ...prev, firstName: e.target.value })) }} />
            <Input required type="text" placeholder="Nazwisko" value={formData.lastName} onChange={(e) => { setFormData((prev) => ({ ...prev, lastName: e.target.value })) }} />
            <Input type="string" placeholder="Rok studiów*" value={formData.academicYear === 0 ? "" : formData.academicYear} onChange={handleSetAcademicYear} />
            <Select name="degree" value={formData.degree} onChange={(e) => { setFormData((prev) => ({ ...prev, degree: e.target.value as Degree })); }} >
                {Object.values(Degree).map((degree) => <option key={degree} value={degree}>{degree}</option>)}
            </Select>
            <Select name="faculty" value={formData.faculty} onChange={(e) => { setFormData((prev) => ({ ...prev, faculty: e.target.value as Faculty })); }} >
                {Object.values(Faculty).map((faculty) => <option key={faculty} value={faculty}>{faculty}</option>)}
            </Select>
            <Button type="submit" disabled={isMutating}>{isMutating ? "..." : "Modyfikuj dane"}</Button>
            <p className="text-red-500 text-sm text-center">{error}</p>
        </form>
    )
}