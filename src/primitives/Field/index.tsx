import { ChangeEventHandler, PureComponent, } from "react";

import './index.scss';


interface FieldPropsInterface {
    value: string,
    placeholder: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
}

class Field extends PureComponent<FieldPropsInterface> {

    render() {
        const { placeholder, value, onChange } = this.props;

        return (
            <label className="field">
                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className="field_input"
                    type="text"
                />
            </label>
        );
    }
}

export default Field;