"use client"

import { ComponentProps } from "react"

export const Input = ({ ...props }: ComponentProps<"input">) => {
    return (
        <input {...props} className={`w-full p-2 bg-black text-white border border-gray-500 focus:border-white focus:outline-none ${props.className}`} />
    )
}