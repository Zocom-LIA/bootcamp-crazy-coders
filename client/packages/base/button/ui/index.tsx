import './style.scss';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  type: 'primary' | 'secondary' | 'success' | 'alert';
  onClick: () => void;
  disabled?: boolean;
};

export const Button = ({
  children,
  onClick,
  type,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`btn btn__${type}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
