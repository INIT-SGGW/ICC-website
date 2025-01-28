import Image from "next/image"
import { jerseyFont } from "@/assets/fonts"

export const SectionTitle = ({ title, icon }: { title: string, icon: string }) => {
  return (
    <div className="flex flex-row items-end justify-start gap-2 relative">
      <Image src={icon} alt={title} width={35} height={35} />
      <h1 className={`text-white text-4xl ${jerseyFont.className} relative -bottom-[10px]`}>{title}</h1>
    </div>
  )
}