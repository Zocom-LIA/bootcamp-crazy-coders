import { ReactNode } from 'react';
import './style.scss';

type Props = {
  children: ReactNode;
};

export const Modal = ({ children }: Props) => {
  return <section className="modal">{children}</section>;
};
