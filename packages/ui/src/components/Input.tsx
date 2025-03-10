"use client"

import type { ComponentProps } from "react"

export function Input({ ...props }: ComponentProps<"input">): React.JSX.Element {
    return (
        <input {...props} className={`w-full p-2 bg-black text-white border border-gray-500 focus:border-white focus:outline-none ${props.className}`} />
    )
}