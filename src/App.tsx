import React, { Component } from 'react';

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


interface AppStateInterface {
    changedTask: TaskInterface | null,
    tasks: TaskInterface[],
}

class App extends Component<{}, AppStateInterface> {

    constructor(props: {}) {
        super(props);

        this.state = {
            changedTask: null,
            tasks: [
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
            ]
        };
    }

    createTask = (task: TaskInterface) => {
        const id = Math.floor(Math.random() * 100);

        const createdTask = {
            ...task,
            id,
            createdAt: new Date().toJSON(),
        };

        this.setState({ tasks: [...this.state.tasks, createdTask] });
    }

    removeTask: RemoveTask = (taskId) => {
        this.setState({ tasks: this.state.tasks.filter(task => task.id !== taskId) });
    }

    onSaveChangedTask: OnSaveChangedTask = (changedTask) => {
        this.setState({
            tasks: this.state.tasks.map(task => task.id === this.state.changedTask?.id ? changedTask : task),
            changedTask: null
        });
    }

    openChangeTask: OpenChangeTask = (taskId) => {
        this.setState({ changedTask: this.state.tasks.find(task => task.id === taskId) || null });
    }

    onMarkCompletedTask: OnMarkCompletedTask = () => {
        const checkAllForCompleted = this.state.tasks.every(task => task.checked);

        if (!checkAllForCompleted) {
            this.setState({ tasks: this.state.tasks.map(task => !task.checked ? ({ ...task, checked: true }) : task) });
        }
    }

    onRemoveCompletedTask: OnRemoveCompletedTask = () => {
        const checkOneCompleted = this.state.tasks.some(task => task.checked);

        if (this.state.tasks.length !== 0 && checkOneCompleted) {
            this.setState({ tasks: this.state.tasks.filter(task => !task.checked) });
        }
    }

    render() {
        const { tasks, changedTask } = this.state;

        return (
            <>
                <ManageCompletedTasks
                    onMarkCompleted={this.onMarkCompletedTask}
                    onRemoveCompleted={this.onRemoveCompletedTask}
                />
                <TasksList
                    tasks={tasks}
                    removeTask={this.removeTask}
                    openChangeTask={this.openChangeTask}
                />
                <CreateTask createTask={this.createTask}/>

                {changedTask !== null && (
                    <ChangeTask
                        changedTask={changedTask}
                        onSave={this.onSaveChangedTask}
                    />
                )}
            </>
        );
    }
}


export default App;