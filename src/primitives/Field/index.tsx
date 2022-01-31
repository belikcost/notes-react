import React, { ChangeEventHandler } from "react";
import styled from "styled-components";


interface FieldPropsInterface {
    value: string,
    placeholder: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

const Input = styled.input`
  padding: 14px;
  margin: 8px 0;

  border: 1px solid lightslategray;
  border-radius: 20px;
  outline: none;
`;

const Field = (props: FieldPropsInterface) => {
    const { placeholder, value, onChange } = props;

    return (
        <label>
            <Input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                type="text"
            />
        </label>
    );
};

export default React.memo(Field);