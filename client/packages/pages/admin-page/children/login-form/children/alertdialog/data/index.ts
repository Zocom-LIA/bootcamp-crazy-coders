import { useEffect, useRef } from "react";

/*
 ****************************************** TYPE ********************************************************************
 */

export type ActionAlertDialogProps = {
  success: boolean;
  title: string;
  isOpened: boolean;
  onAction: (() => void) | null;
  onClose: () => void;
};

/*
 ****************************************** HELPER ********************************************************************
 */

export const isClickInsideRectangle = (
  e: React.MouseEvent<HTMLDialogElement, MouseEvent>,
  element: HTMLElement
): boolean => {
  const r = element.getBoundingClientRect();

  return (
    e.clientX > r.left &&
    e.clientX < r.right &&
    e.clientY > r.top &&
    e.clientY < r.bottom
  );
};

/*
 ****************************************** USE DATA ********************************************************************
 */

export const useData = (props: ActionAlertDialogProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (props.isOpened) {
      ref.current?.showModal();
      document.body.classList.add("modal-open");
    } else {
      ref.current?.close();
      document.body.classList.remove("modal-open");
    }
  }, [props.isOpened]);

  return {
    ref,
    handleAction() {
      props.onClose();
      if (props.onAction) {
        props.onAction();
      }
    },
  };
};
