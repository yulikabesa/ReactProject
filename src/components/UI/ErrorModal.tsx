import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";
import { Fragment } from "react";
import ReactDOM from "react-dom";

const Backdrop: React.FC<{onConfirm: () => void}> = (props) => {
  return <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay: React.FC<{title: string; message: string; onConfirm: () => void}> = (props) => {
  return (
    <Card className={classes.modal}>
      <header className={classes.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={classes.content}>
        <p>{props.message}</p>
      </div>
      <footer className={classes.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};

const portalElement: HTMLElement = document.getElementById('overlays')!;

const ErrorModal: React.FC<{onConfirm: () => void; message: string ; title: string}> = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} message={props.message} title={props.title} />,
        portalElement
      )}
    </Fragment>
  );
};

export default ErrorModal;
