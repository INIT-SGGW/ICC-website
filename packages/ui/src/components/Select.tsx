"use client"

import type { ComponentProps } from "react"

export function Select({ ...props }: ComponentProps<"select">): React.JSX.Element {
    return (
        <select {...props} className={`w-full p-2 bg-black text-white border border-gray-500 focus:border-white focus:outline-none ${props.className}`} />
    )
}