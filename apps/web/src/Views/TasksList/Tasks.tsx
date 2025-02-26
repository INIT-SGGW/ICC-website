import { TaskSquare } from "./TaskSquare";

type Props = {
    year: number
}

const useTaskData = (year: number): { index: number, unlocked: boolean }[] => {
    return Array.from({ length: 12 }, (_, index) => ({
        index: index,
        unlocked: false
    }));
}

export const Tasks = ({ year }: Props) => {
    const taskData = useTaskData(year);

    return (
        <div className="mt-4 grid grid-cols-3 sm:grid-cols-4 gap-4">
            {taskData.map((task) => (
                <TaskSquare key={task.index} index={task.index} unlocked={task.unlocked} />
            ))}
        </div>
    )
}