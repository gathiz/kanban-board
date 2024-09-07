export type Board = {
    name: string;
    columns: Column[]
}

export type Column = {
    name: string,
    tasks: Task[],
}

export type Task = {
    title: string;
    status: string;
    description: string;
    subtasks: Subtask[];
}

export type Subtask = {
    title: string;
    isCompleted: boolean;
};