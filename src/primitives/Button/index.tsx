import React, { MouseEventHandler, ReactChildren } from "react";
import styled from "styled-components";


interface ButtonPropsInterface {
    onClick: MouseEventHandler<HTMLButtonElement>,
    children: ReactChildren | string
}

const StyledButton = styled.button`
  background: #000;
  color: #fff;

  border: none;
  border-radius: 20px;

  padding: 14px;
  margin-top: 16px;
  margin-right: 16px;
  
  cursor: pointer;
`;

const Button = (props: ButtonPropsInterface) => {
    const { onClick, children } = props;

    return (
        <StyledButton onClick={onClick}>
            {children}
        </StyledButton>
    );
};


export default React.memo(Button);