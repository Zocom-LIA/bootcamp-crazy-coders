import './style.scss';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type: 'primary' | 'secondary' | 'success' | 'alert';
  onClick: () => void;
};

export const Button = ({ children, onClick, type }: Props) => {
  return (
    <button className={`btn btn__${type}`} onClick={onClick}>
      {children}
    </button>
  );
};
