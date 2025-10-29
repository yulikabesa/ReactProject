import classes from "./Button.module.css";

const Button = (props) => {
  const btnClass = `${classes.button} ${props.className}`;
  return (
    <button
      className={btnClass}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
