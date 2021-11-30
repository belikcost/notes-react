import { MouseEventHandler, PureComponent } from "react";

import './index.scss';


interface ButtonPropsInterface {
    onClick: MouseEventHandler<HTMLButtonElement>,
    className?: string,
}

class Button extends PureComponent<ButtonPropsInterface> {

    render() {
        const { onClick, className } = this.props;

        return (
            <button className={`button ${className ? className : ''}`} onClick={onClick}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;