import './style.scss';

type Props = {
  label: string;
  children: React.ReactNode | React.ReactNode[];
};

export const CardList = ({ label, children }: Props) => {
  return (
    <section className="card-list">
      <article className="card-list__label">
        <h2>{label}</h2>
        <hr />
      </article>

      <section className="card-list__items">{children}</section>
    </section>
  );
};
