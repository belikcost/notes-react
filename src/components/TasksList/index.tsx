import { PureComponent } from "react";

import ListItem from "./Elements/ListItem";
import { OpenChangeTask, RemoveTask, TaskInterface } from "../../types";

import './index.scss';


interface TasksListPropsInterface {
    tasks: TaskInterface[],
    removeTask: RemoveTask,
    openChangeTask: OpenChangeTask
}

class TasksList extends PureComponent<TasksListPropsInterface> {

    render() {

        return (
            <div className="tasks-list">
                {this.props.tasks.length !== 0 ? this.props.tasks.map(task => (
                    <ListItem
                        {...task}
                        key={task.id}
                        removeTask={this.props.removeTask}
                        openChangeTask={this.props.openChangeTask}
                    />
                )) : (
                    <h2>Список пуст</h2>
                )}
            </div>
        );
    }
}

export default TasksList;