import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";

import Field from "../../primitives/Field";
import { TaskInterface } from "../../types";


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

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;

  margin-top: 3rem;
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const CreateTask = ({ createTask }: CreateTaskProps) => {
    const [task, setTask] = useState(INITIAL_TASK);
    const [error, setError] = useState(false);


    const isTaskValid = () => {
        return task.title.length !== 0;
    };

    const onClick = () => {
        if (isTaskValid()) {
            createTask(task);

            setTask(INITIAL_TASK);
            setError(false);

        } else {
            setError(true);
        }
    };

    const onChangeTitle = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTask({ ...task, title: e.target.value }), []
    );

    const onChangeDescription = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTask({ ...task, description: e.target.value }), []
    );

    const { title, description } = task;

    return (
        <Container>
            <Field
                value={title}
                onChange={onChangeTitle}
                placeholder="Title"
            />
            <Field
                value={description}
                onChange={onChangeDescription}
                placeholder="Description"
            />
            <IconContainer onClick={onClick}>
                <svg fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
                    <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"/>
                </svg>
            </IconContainer>

            {error && (
                <h3>Ошибка, проверьте правильность данных!</h3>
            )}
        </Container>
    );
};

export default React.memo(CreateTask);