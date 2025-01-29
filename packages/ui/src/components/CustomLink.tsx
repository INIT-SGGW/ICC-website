"use client"

import { ComponentProps } from "react"

export const CustomLink = ({ children, ...props }: ComponentProps<"a">) => {
    return (
        <a {...props} className={`w-full bg-red-500 text-white py-1 text-xl text-center ${props.className}`}>{children}</a>
    )
}