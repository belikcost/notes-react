import React, { ChangeEvent, useCallback, useState } from "react";
import styled from "styled-components";

import Field from "../../primitives/Field";
import Button from "../../primitives/Button";
import { OnSaveChangedTask, TaskInterface } from "../../types";


interface ChangeTaskProps {
    changedTask: TaskInterface,
    onSaveTask: OnSaveChangedTask,
}

const Container = styled.div`
  position: fixed;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;

  top: 0;
  right: 0;

  background-color: rgba(0, 0, 0, .3);
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  background-color: #fff;

  padding: 2rem 4rem;
`;

const ChangeTask = ({ changedTask, onSaveTask }: ChangeTaskProps) => {
    const [task, setTask] = useState(changedTask);

    const onChangeTitle = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTask((prevTask) => ({ ...prevTask, title: e.target.value })), []
    );
    const onChangeDescription = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => setTask((prevTask) => ({ ...prevTask, description: e.target.value })), []
    );

    const onSave = () => onSaveTask(task);

    return (
        <Container>
            <Content>
                <Field
                    value={task.title}
                    onChange={onChangeTitle}
                    placeholder="Title"
                />
                <Field
                    value={task.description}
                    onChange={onChangeDescription}
                    placeholder="Description"
                />
                <Button onClick={onSave}>
                    Save
                </Button>
            </Content>
        </Container>
    );
};

export default React.memo(ChangeTask);