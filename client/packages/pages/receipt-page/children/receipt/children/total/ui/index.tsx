import './style.scss';

type ReceiptTotalProps = {
  total: number;
  currency?: string;
};

export const ReceiptTotal = ({
  total,
  currency = 'sek',
}: ReceiptTotalProps) => {
  return (
    <article className="total">
      <section>
        <h3 className="total__title">Total</h3>
        <p className="total__vat">inkl 20% moms</p>
      </section>

      <p className="total__sum">
        {total} {currency}
      </p>
    </article>
  );
};
