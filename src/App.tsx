import React, { useState } from 'react';

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
    const [changedTask, setChangedTask] = useState<TaskInterface | null>(null);
    const [tasks, setTasks] = useState<TaskInterface[]>(INITIAL_TASKS);

    const createTask = (task: TaskInterface) => {
        const id = Math.floor(Math.random() * 100);

        const createdTask = {
            ...task,
            id,
            createdAt: new Date().toJSON(),
        };

        setTasks([...tasks, createdTask]);
    }

    const removeTask: RemoveTask = (taskId) => setTasks(tasks.filter(task => task.id !== taskId));

    const onSaveChangedTask: OnSaveChangedTask = (changedTask) => {
        setTasks(tasks.map(task => task.id === changedTask?.id ? changedTask : task));
        setChangedTask(null);
    }

    const openChangeTask: OpenChangeTask = (taskId) => {
        setChangedTask(tasks.find(task => task.id === taskId) || null);
    }

    const onMarkCompletedTask: OnMarkCompletedTask = () => {
        const checkAllForCompleted = tasks.every(task => task.checked);

        if (!checkAllForCompleted) {
            setTasks(tasks.map(task => !task.checked ? ({ ...task, checked: true }) : task));
        }
    }

    const onRemoveCompletedTask: OnRemoveCompletedTask = () => {
        const checkOneCompleted = tasks.some(task => task.checked);

        if (tasks.length !== 0 && checkOneCompleted) {
            setTasks(tasks.filter(task => !task.checked));
        }
    }

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
                    changedTask={changedTask}
                    onSaveTask={onSaveChangedTask}
                />
            )}
        </>
    );
};

export default App;