"use client"

import { useRegister } from "@/services/api"
import CustomError from "@/utils/CustomError"
import { Button, Input, Select } from "@repo/ui"
import type { FormEvent } from "react";
import { useState } from "react"
import { Degree, Faculty, type RegisterFormDTO } from "@repo/types"
import { HttpMethods } from "@/types/enums"
import { useRouter } from "next/navigation"
import Link from "next/link"

const validateData = (data: RegisterFormDTO, repeatPassword: string): string | null => {
    if (data.firstName.length < 2) return "Imię musi mieć co najmniej 2 znaki"
    if ((/^[a-z]\d{6}@sggw.edu.pl$/.exec(data.email)) === null) return "Email musi być z domeny sggw.edu.pl"
    if (data.academicYear < 1 || data.academicYear > 5) return "Rok studiów jest nieprawidłowy"
    if (data.password.length < 8) return "Hasło musi mieć co najmniej 8 znaków"
    if (data.faculity.length < 2) return "Nazwa wydziału musi mieć co najmniej 2 znaki"
    if (data.password !== repeatPassword) return "Hasła muszą być takie same"
    if (!data.aggrement) return "Musisz zaakceptować regulamin"
    return null;
}

export function RegisterCard(): React.JSX.Element {
    const router = useRouter();
    const { trigger, isMutating } = useRegister()

    const [formData, setFormData] = useState<RegisterFormDTO>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        academicYear: 0,
        dateOfBirth: new Date(),
        degree: Degree.INNY,
        faculity: Faculty.INF,
        studentIndex: "",
        aggrement: false
    })
    const [repeatPassword, setRepeatPassword] = useState<string>("")

    const [error, setError] = useState<string | undefined>(undefined)

    const handleRegister = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setError(undefined)

        const validationError = validateData(formData, repeatPassword)
        if (validationError) { setError(validationError); return; }

        const studentIndex = (/\d{6}/.exec(formData.email))?.[0]
        formData.studentIndex = String(studentIndex)
        try {
            await trigger({ body: { ...formData, service: "icc" }, method: HttpMethods.POST })
            router.push("/register/pending");
        } catch (e: unknown) {
            if (e instanceof CustomError || e instanceof Error) {
                setError(e.message); return;
            }
            setError("Wystąpił błąd podczas rejestracji.");
        }
    }

    const handleSetAcademicYear = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // all this acrobatics so that input field can be a string and placeholder can be shown
        const value = e.target.value
        if (value === "") { setFormData((prev: RegisterFormDTO) => ({ ...prev, academicYear: 0 })); return; }
        const intValue = Number(value)
        if (isNaN(intValue)) { setError("Rok studiów musi być liczbą"); return; }
        setFormData((prev: RegisterFormDTO) => ({ ...prev, academicYear: intValue }))
    }

    return (
        <form onSubmit={(e) => { void handleRegister(e) }} onInvalid={(e) => { e.preventDefault(); }} className="bg-black p-4 flex flex-col items-start justify-start gap-4 w-full max-w-[350px]">
            <Input type="text" autoComplete="given-name" placeholder="Imię*" value={formData.firstName} onChange={(e) => { setFormData((prev: RegisterFormDTO) => ({ ...prev, firstName: e.target.value })); }} />
            <Input type="text" autoComplete="family-name" placeholder="Nazwisko" value={formData.lastName} onChange={(e) => { setFormData((prev: RegisterFormDTO) => ({ ...prev, lastName: e.target.value })); }} />
            <Input type="email" autoComplete="email" placeholder="E-mail*" value={formData.email} onChange={(e) => { setFormData((prev: RegisterFormDTO) => ({ ...prev, email: e.target.value })); }} />
            <Input type="string" placeholder="Rok studiów*" value={formData.academicYear === 0 ? "" : formData.academicYear} onChange={handleSetAcademicYear} />
            <Select name="degree" value={formData.degree} onChange={(e) => { setFormData((prev: RegisterFormDTO) => ({ ...prev, degree: e.target.value })); }} >
                {Object.values(Degree).map((degree) => <option key={degree} value={degree}>{degree}</option>)}
            </Select>
            <Select name="faculty" value={formData.faculity} onChange={(e) => { setFormData((prev: RegisterFormDTO) => ({ ...prev, faculity: e.target.value })); }} >
                {Object.values(Faculty).map((faculty) => <option key={faculty} value={faculty}>{faculty}</option>)}
            </Select>
            <Input type="password" autoComplete="new-password" placeholder="Hasło*" value={formData.password} onChange={(e) => { setFormData((prev: RegisterFormDTO) => ({ ...prev, password: e.target.value })); }} />
            <Input type="password" autoComplete="new-password" placeholder="Powtórz hasło*" value={repeatPassword} onChange={(e) => { setRepeatPassword(e.target.value); }} />
            <div className="flex items-start justify-start gap-2 w-full">
                <Input className="!w-min" type="checkbox" id="terms" checked={formData.aggrement} onChange={() => { setFormData((prev: RegisterFormDTO) => ({ ...prev, aggrement: !formData.aggrement })) }} />
                <label className="text-white w-full leading-4" htmlFor="terms">Akceptuję <Link href="/Regulamin.pdf" target="_blank" className="text-red-500">regulamin</Link> i <Link href="/Polityka prywatności.pdf" target="_blank" className="text-red-500">politykę przetwarzania danych</Link></label>
            </div>
            <Button type="submit" disabled={isMutating}>{isMutating ? "..." : "Zarejestruj się"}</Button>
            {error ? <p className="text-red-500 text-sm">{error}</p> : null}
        </form>
    )
}