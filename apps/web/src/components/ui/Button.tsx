"use client"

import { ComponentProps } from "react"

export const Button = ({ children, ...props }: ComponentProps<"button">) => {
    return (
        <button {...props} className={`w-full bg-red-500 text-white py-1 text-xl ${props.className}`}>{children}</button>
    )
}