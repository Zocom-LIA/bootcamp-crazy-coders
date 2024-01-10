import { useState } from 'react';
import { Button } from '@zocom/button';
import { useData } from '..';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  onConfirm: () => void;
  type: React.ComponentProps<typeof Button>['type'];
};

enum State {
  NORMAL,
  CONFIRM,
}

export const ConfirmButton = ({ children, onConfirm, type }: Props) => {
  const { useStateRestorer } = useData();

  const [state, setState] = useStateRestorer(State.NORMAL, 3000);
  const [confirmed, setConfirmed] = useState(false);

  return (
    <>
      {state === State.NORMAL ? (
        <Button onClick={() => setState(State.CONFIRM)} type={type}>
          {children}
        </Button>
      ) : (
        <Button
          onClick={() => {
            setConfirmed(true);
            onConfirm();
          }}
          type="primary"
          disabled={confirmed}
        >
          Bekräfta
        </Button>
      )}
    </>
  );
};
