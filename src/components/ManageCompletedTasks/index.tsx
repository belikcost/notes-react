import React  from "react";
import styled from "styled-components";

import ButtonComponent from "../../primitives/Button";
import { OnMarkCompletedTask, OnRemoveCompletedTask } from "../../types";


interface ManageCompletedTasksPropsInterface {
    onMarkCompleted: OnMarkCompletedTask,
    onRemoveCompleted: OnRemoveCompletedTask
}

const Container = styled.div`
  display: flex;

  margin-bottom: 3rem;
`;

const Button = styled(ButtonComponent)`
  margin-right: 2rem;
`;

const ManageCompletedTasks = (props: ManageCompletedTasksPropsInterface) => {
    const { onMarkCompleted, onRemoveCompleted } = props;

    return (
        <Container>
            <Button onClick={onMarkCompleted}>
                Отметить все выполненными
            </Button>
            <Button onClick={onRemoveCompleted}>
                Удалить все выполненные
            </Button>
        </Container>
    );
};

export default React.memo(ManageCompletedTasks);