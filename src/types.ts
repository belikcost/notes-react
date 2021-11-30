interface KeysInterface {
    [key: string]: any;
}

interface TaskInterface extends KeysInterface {
    id: number | null,
    title: string,
    checked: boolean,
    description: string,
    createdAt: string
}

type RemoveTask = (taskId: TaskInterface['id']) => void;

type OpenChangeTask = (taskId: TaskInterface['id']) => void;

type OnSaveChangedTask = (changedTask: TaskInterface) => void;

type OnMarkCompletedTask = () => void;

type OnRemoveCompletedTask = () => void;

export type {
    TaskInterface,
    RemoveTask,
    OpenChangeTask,
    OnSaveChangedTask,
    OnMarkCompletedTask,
    OnRemoveCompletedTask
}