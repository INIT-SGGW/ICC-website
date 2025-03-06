"use client"

import { useRegister } from "@/services/api"
import CustomError from "@/utils/CustomError"
import { Button, Input, Select } from "@repo/ui"
import { useState } from "react"
import { Degree, Faculty, type RegisterForm } from "@repo/types"
import { HttpMethods } from "@/types/enums"

const validateData = (data: RegisterForm, repeatPassword: string): string | null => {
    if (data.firstName.length < 2) return "Imię musi mieć co najmniej 2 znaki"
    if ((/^[a-z]\d{6}@sggw.edu.pl$/.exec(data.email)) === null) return "Email musi być z domeny sggw.edu.pl"
    if (data.password.length < 8) return "Hasło musi mieć co najmniej 8 znaków"
    if (data.academicYear < 1 || data.academicYear > 6) return "Rok studiów jest nieprawidłowy"
    if (data.faculity.length < 2) return "Nazwa wydziału musi mieć co najmniej 2 znaki"
    if (data.password !== repeatPassword) return "Hasła muszą być takie same"
    if (!data.aggrement) return "Musisz zaakceptować regulamin"
    return null;
}

export function RegisterCard(): React.JSX.Element {
    const { trigger, isMutating } = useRegister()

    const [formData, setFormData] = useState<RegisterForm>({
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

    const handleRegister = async (): Promise<void> => {
        setError(undefined)

        const validationError = validateData(formData, repeatPassword)
        if (validationError) { setError(validationError); return; }

        const studentIndex = (/\d{6}/.exec(formData.email))?.[0]
        formData.studentIndex = String(studentIndex)
        try {
            await trigger({ body: formData, method: HttpMethods.POST })
            window.location.href = "/register/pending";
        } catch (e: unknown) {
            if (e instanceof CustomError) {
                setError(e.getMessage()); return;
            } else if (e instanceof Error) {
                setError(e.message); return;
            }
            setError("Wystąpił błąd podczas rejestracji.");
        }
    }

    const handleSetAcademicYear = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // all this acrobatics so that input field can be a string and placeholder can be shown
        const value = e.target.value
        if (value === "") { setFormData((prev: RegisterForm) => ({ ...prev, academicYear: 0 })); return; }
        const intValue = Number(value)
        if (isNaN(intValue)) { setError("Rok studiów musi być liczbą"); return; }
        setFormData((prev: RegisterForm) => ({ ...prev, academicYear: intValue }))
    }

    return (
        <div className="bg-black p-4 flex flex-col items-start justify-start gap-4 w-full max-w-[350px]">
            <Input type="text" autoComplete="given-name" placeholder="Imię*" value={formData.firstName} onChange={(e) => { setFormData((prev: RegisterForm) => ({ ...prev, firstName: e.target.value })); }} />
            <Input type="text" autoComplete="family-name" placeholder="Nazwisko" value={formData.lastName} onChange={(e) => { setFormData((prev: RegisterForm) => ({ ...prev, lastName: e.target.value })); }} />
            <Input type="email" autoComplete="email" placeholder="E-mail*" value={formData.email} onChange={(e) => { setFormData((prev: RegisterForm) => ({ ...prev, email: e.target.value })); }} />
            <Input type="string" placeholder="Rok studiów*" value={formData.academicYear === 0 ? "" : formData.academicYear} onChange={handleSetAcademicYear} />
            <Select name="degree" value={formData.degree} onChange={(e) => { setFormData((prev: RegisterForm) => ({ ...prev, degree: e.target.value })); }} >
                {Object.values(Degree).map((degree) => <option key={degree} value={degree}>{degree}</option>)}
            </Select>
            <Select name="faculty" value={formData.faculity} onChange={(e) => { setFormData((prev: RegisterForm) => ({ ...prev, faculity: e.target.value })); }} >
                {Object.values(Faculty).map((faculty) => <option key={faculty} value={faculty}>{faculty}</option>)}
            </Select>
            <Input type="password" autoComplete="new-password" placeholder="Hasło*" value={formData.password} onChange={(e) => { setFormData((prev: RegisterForm) => ({ ...prev, password: e.target.value })); }} />
            <Input type="password" autoComplete="new-password" placeholder="Powtórz hasło*" value={repeatPassword} onChange={(e) => { setRepeatPassword(e.target.value); }} />
            <div className="flex items-start justify-start gap-2 w-full">
                <Input className="!w-min" type="checkbox" id="terms" checked={formData.aggrement} onChange={() => { setFormData((prev: RegisterForm) => ({ ...prev, aggrement: !formData.aggrement })) }} />
                <label className="text-white w-full leading-4" htmlFor="terms">Akceptuję regulamin i politykę przetwarzania danych</label>
            </div>
            <Button onClick={() => { void handleRegister() }} disabled={isMutating}>{isMutating ? "..." : "Zarejestruj się"}</Button>
            {error ? <p className="text-red-500 text-sm">{error}</p> : null}
        </div>
    )
}