import classes from './Button.module.css'; // ton CSS Module

const Button = ({
                    children,
                    className = '',
                    type = "button",
                    id,
                    ...rest
                }) => {
    return (
        <button
            type={type}
            id={id}
            className={classes[className] || ''}
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;
