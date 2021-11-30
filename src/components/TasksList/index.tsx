import React from "react";
import styled from "styled-components";

import ListItem from "./Elements/ListItem";
import { OpenChangeTask, RemoveTask, TaskInterface } from "../../types";


interface TasksListPropsInterface {
    tasks: TaskInterface[],
    removeTask: RemoveTask,
    openChangeTask: OpenChangeTask
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const TasksList = (props: TasksListPropsInterface) => {
    const { tasks, removeTask, openChangeTask } = props;

    return (
        <Container>
            {tasks.length !== 0 ? tasks.map(task => (
                <ListItem
                    {...task}
                    key={task.id}
                    removeTask={removeTask}
                    openChangeTask={openChangeTask}
                />
            )) : (
                <h2>Список пуст</h2>
            )}
        </Container>
    );
};

export default React.memo(TasksList);