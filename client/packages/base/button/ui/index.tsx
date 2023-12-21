import './style.scss';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type: 'primary' | 'secondary';
  bgColor?: string;
  onClick: () => void;
};

export const Button = ({ children, onClick, type, bgColor }: Props) => {
  return (
    <button
      style={{ backgroundColor: bgColor }}
      className={`btn btn__${type}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
