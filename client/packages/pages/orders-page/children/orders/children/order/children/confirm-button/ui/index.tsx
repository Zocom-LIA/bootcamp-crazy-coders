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

  return (
    <>
      {state === State.NORMAL ? (
        <Button onClick={() => setState(State.CONFIRM)} type={type}>
          {children}
        </Button>
      ) : (
        <Button onClick={onConfirm} type="primary">
          Bekräfta
        </Button>
      )}
    </>
  );
};
