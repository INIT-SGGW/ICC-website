import { use } from "react"; //eslint-disable-line import/named -- Temporary
import { TaskDetails } from "../../../../Views/Tasks/TaskDetails";

type Props = {
    params: Promise<{ id: number }>
}

export default function Page({ params }: Props): React.JSX.Element {
    const id = use(params).id;

    return (
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
            <TaskDetails id={id} />
        </div>
    )
}