import './style.scss';
import { ReactNode } from 'react';

export enum ListType {
  ROW = 'row',
  COLUMN = 'column',
}

type Props = {
  type?: ListType;
  children: ReactNode | ReactNode[];
};

export const List = ({ type = ListType.ROW, children }: Props) => {
  return <section className={`list list--${type}`}>{children}</section>;
};
