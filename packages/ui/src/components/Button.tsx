"use client"

import type { ComponentProps } from "react"

export function Button({ children, ...props }: ComponentProps<"button">): React.JSX.Element {
    return (
        <button {...props} className={`w-full bg-red-500 text-white py-1 text-xl ${props.className}`}>{children}</button>
    )
}