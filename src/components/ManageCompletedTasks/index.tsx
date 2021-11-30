import { PureComponent } from "react";

import Button from "../../primitives/Button";
import { OnMarkCompletedTask, OnRemoveCompletedTask } from "../../types";

import './index.scss';


interface ManageCompletedTasksPropsInterface {
    onMarkCompleted: OnMarkCompletedTask,
    onRemoveCompleted: OnRemoveCompletedTask
}

class ManageCompletedTasks extends PureComponent<ManageCompletedTasksPropsInterface> {

    render() {

        return (
            <div className="manage-completed-tasks">
                <Button className="manage-completed-tasks_button" onClick={this.props.onMarkCompleted}>
                    Отметить все выполненными
                </Button>
                <Button className="manage-completed-tasks_button" onClick={this.props.onRemoveCompleted}>
                    Удалить все выполненные
                </Button>
            </div>
        );
    }
}

export default ManageCompletedTasks;