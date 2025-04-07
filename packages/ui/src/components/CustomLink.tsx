"use client"

import type { ComponentProps } from "react"

export function CustomLink({ children, ...props }: ComponentProps<"a">): React.JSX.Element {
    return (
        <a {...props} className={`w-full bg-red-500 text-white py-1 text-xl text-center ${props.className}`}>{children}</a>
    )
}