import './style.scss';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { Item } from '@zocom/types';
import { List, Separator } from '@zocom/list';
import { ConfirmButton } from '@zocom/confirm-button';
import { useData } from '..';

type Props = {
  id: string;
  items: Item[];
  done: boolean;
  startTime: string;
  endTime?: string;
  onClick: () => void;
};

export const Order = ({
  id,
  items,
  done,
  startTime,
  endTime = dayjs().toISOString(),
  onClick,
}: Props) => {
  const { useRefresher, timeDifference } = useData();

  if (!done) {
    useRefresher(1000);
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        height: 0,
        padding: 0,
      }}
      style={{ overflow: 'hidden' }}
      className={`order order--${done ? 'done' : 'ongoing'}`}
    >
      <header>
        <h2 className="order__id">#{id}</h2>
      </header>

      <section className="order__items">
        {items.map((item) => (
          <Fragment key={item.name}>
            <article className="order__item">
              <List>
                <p className="order__product">{item.name}</p>

                <Separator />

                <p className="order__item-quantity">{item.count} st</p>
              </List>
            </article>

            <p className="order__item-total">{item.totalPrice} sek</p>
          </Fragment>
        ))}
        <hr className="order__separator" />

        <h3 className="order__total">
          {items.reduce((acc, item) => acc + item.totalPrice, 0)} sek
        </h3>
      </section>

      <section className="order__time">
        <p>
          {done ? 'Tillagningstid' : 'Väntat i'}{' '}
          {timeDifference(startTime, endTime)}
        </p>
      </section>

      <ConfirmButton onConfirm={onClick} type={done ? 'success' : 'alert'}>
        {done ? 'Serverad' : 'Redo att serveras'}
      </ConfirmButton>
    </motion.article>
  );
};
