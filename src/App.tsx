import React, { useCallback, useMemo, useState } from 'react';

import TasksList from "./components/TasksList";
import CreateTask from "./components/CreateTask";
import ChangeTask from "./components/ChangeTask";
import ManageCompletedTasks from "./components/ManageCompletedTasks";
import {
    OnMarkCompletedTask,
    OnRemoveCompletedTask,
    OnSaveChangedTask,
    OpenChangeTask,
    RemoveTask,
    TaskInterface
} from "./types";


const INITIAL_TASKS = [
    {
        id: 1,
        title: 'Hello world',
        checked: true,
        description: 'Say hello world',
        createdAt: '2021-11-18T09:55:07.172Z'
    },
    {
        id: 2,
        title: 'Hello world',
        checked: false,
        description: 'Say hello world',
        createdAt: '2021-11-18T09:55:07.172Z'
    },
    {
        id: 3,
        title: 'Hello world',
        checked: true,
        description: 'Say hello world',
        createdAt: '2021-11-18T09:55:07.172Z'
    },
];

const App = () => {
    const [tasks, setTasks] = useState<TaskInterface[]>(INITIAL_TASKS);

    const [changedTaskId, setChangedTaskId] = useState<number | null>(null);

    const changedTask = useMemo(() => {
        if (changedTaskId !== null) {
            return tasks.find(task => task.id === changedTaskId);
        }

        return null;
    }, [changedTaskId, tasks])

    const createTask = useCallback(
        (task: TaskInterface) => {
            const id = Math.floor(Math.random() * 100);

            const createdTask = {
                ...task,
                id,
                createdAt: new Date().toJSON(),
            };

            setTasks((tasks) => [...tasks, createdTask]);
        }, []
    );

    const removeTask: RemoveTask = useCallback(
        (taskId) => setTasks((tasks) => tasks.filter(task => task.id !== taskId)), []
    );

    const onSaveChangedTask: OnSaveChangedTask = useCallback(
        (changedTask) => {
            setTasks((tasks) => tasks.map(task => task.id === changedTaskId ? changedTask : task));
            setChangedTaskId(null);
        }, [changedTaskId]
    );

    const openChangeTask: OpenChangeTask = useCallback(
        (taskId) => setChangedTaskId(taskId), []
    );

    const onMarkCompletedTask: OnMarkCompletedTask = useCallback(
        () => setTasks((tasks) => {
            const checkAllForCompleted = tasks.every(task => task.checked);

            if (!checkAllForCompleted) {
                return tasks.map(task => !task.checked ? ({ ...task, checked: true }) : task)
            }

            return tasks;
        }), []
    );

    const onRemoveCompletedTask: OnRemoveCompletedTask = useCallback(
        () => setTasks((tasks) => {
            const checkOneCompleted = tasks.some(task => task.checked);

            if (tasks.length !== 0 && checkOneCompleted) {
                return tasks.filter(task => !task.checked);
            }

            return tasks;
        }), []
    );

    return (
        <>
            <ManageCompletedTasks
                onMarkCompleted={onMarkCompletedTask}
                onRemoveCompleted={onRemoveCompletedTask}
            />
            <TasksList
                tasks={tasks}
                removeTask={removeTask}
                openChangeTask={openChangeTask}
            />
            <CreateTask createTask={createTask}/>

            {changedTask !== null && (
                <ChangeTask
                    changedTask={changedTask!}
                    onSaveTask={onSaveChangedTask}
                />
            )}
        </>
    );
};

export default App;