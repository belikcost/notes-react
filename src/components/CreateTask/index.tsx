import { ChangeEvent, PureComponent } from "react";

import Field from "../../primitives/Field";
import { TaskInterface } from "../../types";

import './index.scss';


const INITIAL_TASK: TaskInterface = {
    id: null,
    title: '',
    checked: false,
    description: '',
    createdAt: ''
};

interface CreateTaskProps {
    createTask: (task: TaskInterface) => void
}

class CreateTask extends PureComponent<CreateTaskProps, { task: TaskInterface, error: boolean }> {

    constructor(props: CreateTaskProps) {
        super(props);

        this.state = {
            task: INITIAL_TASK,
            error: false,
        };
    }

    isTaskValid = () => {
        return this.state.task.title.length !== 0;
    }

    onClick = () => {
        if (this.isTaskValid()) {
            this.props.createTask(this.state.task);
            this.setState({ task: INITIAL_TASK, error: false });

        } else {
            this.setState({ error: true });
        }
    }

    onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ task: { ...this.state.task, title: e.target.value } })
    };

    onChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({ task: { ...this.state.task, description: e.target.value } })
    };

    render() {
        const { title, description } = this.state.task;

        return (
            <div className="create-task">
                <Field
                    value={title}
                    onChange={this.onChangeTitle}
                    placeholder="Title"
                />
                <Field
                    value={description}
                    onChange={this.onChangeDescription}
                    placeholder="Description"
                />
                <span className="create-task_icon" onClick={this.onClick}>
                    <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px"
                         height="24px">
                        <path
                            d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"/>
                    </svg>
                </span>

                {this.state.error && (
                    <h3>Ошибка, проверьте правильность данных!</h3>
                )}
            </div>
        );
    }
}

export default CreateTask;