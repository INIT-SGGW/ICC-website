import { Button } from "@repo/ui"

const navItems = [{
    label: 'Admin',
    href: 'admin/admin',
}, {
    label: 'Zadania',
    href: 'admin/tasks',
}, {
    label: 'Użytkownicy',
    href: 'admin/users',
}, {
    label: 'Markdown test',
    href: 'admin/markdown-test'
}
]

export function HomeNav() {
    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-row justify-center items-center gap-2 max-w-[600px] flex-wrap mt-8">
                {
                    navItems.map((item) => (
                        <a key={item.href} href={item.href} className="text-cred border-cred border-2 px-8 py-2 text-2xl text-nowrap flex-1 text-center">{item.label}</a>
                    ))
                }
            </div>
            <Button className="!bg-cred">Wyloguj się</Button>
        </div>
    )
}