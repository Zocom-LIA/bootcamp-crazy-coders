import "./style.scss";
import { ActionAlertDialogProps, useData } from "../data";

export const ActionAlertDialog: React.FC<ActionAlertDialogProps> = (props) => {
  const { ref, handleAction } = useData(props);

  return (
    <dialog className="dialog" ref={ref} onCancel={props.onClose}>
      <h3>{props.title}</h3>
      <section className="dialog__section">
        <button
          className={
            props.success
              ? "dialog__section__positive"
              : "dialog__section__negative"
          }
          onClick={handleAction}
        >
          OK
        </button>
      </section>
    </dialog>
  );
};
