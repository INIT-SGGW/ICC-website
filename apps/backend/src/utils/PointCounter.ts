export function pointCounter(finishedUsers: number) {
    const maxPoints = 200;

    return Math.max(maxPoints - finishedUsers, 20);
}