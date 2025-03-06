"use client"

import { ComponentProps } from "react"

export const Select = ({ ...props }: ComponentProps<"select">) => {
    return (
        <select {...props} className={`w-full p-2 bg-black text-white border border-gray-500 focus:border-white focus:outline-none ${props.className}`} />
    )
}