import { ChangeEvent, PureComponent } from "react";

import Field from "../../primitives/Field";
import Button from "../../primitives/Button";
import { OnSaveChangedTask, TaskInterface } from "../../types";

import './index.scss';


interface ChangeTaskProps {
    changedTask: TaskInterface,
    onSave: OnSaveChangedTask,
}

class ChangeTask extends PureComponent<ChangeTaskProps, { task: TaskInterface }> {

    constructor(props: ChangeTaskProps) {
        super(props);

        this.state = {
            task: this.props.changedTask
        };
    }

    onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, task: {...this.state.task, title: e.target.value} });
    }

    onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ ...this.state, task: {...this.state.task, description: e.target.value} });
    }

    onSave = () => {
        this.props.onSave(this.state.task);
    }

    render() {
        const task = this.state.task;

        return (
            <div className="change-task-container">
                <div className="change-task">
                    <Field
                        value={task.title}
                        onChange={this.onChangeTitle}
                        placeholder="Title"
                    />
                    <Field
                        value={task.description}
                        onChange={this.onChangeDescription}
                        placeholder="Description"
                    />
                    <Button onClick={this.onSave}>
                        Save
                    </Button>
                </div>
            </div>
        );
    }
}

export default ChangeTask;