import React, { useState, useEffect } from 'react';
import { Logo } from '@zocom/logo';
import './style.scss';
import { getReceiptData } from '..';

import { Receipt } from '@zocom/receipt';
import { Button } from '@zocom/button';
import { useParams } from 'react-router-dom';
interface ReceiptItem {
  product: string;
  quantity: number;
  total: number;
}

interface IReceiptData {
  Items: [
    {
      totalSum: number;
      orderId: string;
      createdAt: string;
      SK: string;
      selection: SelectionItem[];
      PK: string;
      customerId: string;
    }
  ];
  Count: number;
  ScannedCount: number;
}

interface SelectionItem {
  name: string;
  count: number;
  totalPrice: number;
}

export const ReceiptPage = () => {
  const { fetchReceipt } = getReceiptData();
  const [receipt, setReceipt] = useState<IReceiptData | null>(null);
  const { orderId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const receiptData: IReceiptData = await fetchReceipt(orderId!);
        setReceipt(receiptData);
      } catch (error) {
        console.error('Error fetching receipt:', error);
      }
    };

    fetchData();
  }, []);

  if (!receipt) {
    return <div>Loading...</div>;
  }

  if (receipt.Items.length < 1) {
    return <div>No receipt found</div>;
  }

  const receiptItem = receipt.Items[0];

  // Map the receipt data
  const items: ReceiptItem[] = receiptItem.selection.map(
    (item: SelectionItem) => ({
      product: item.name,
      quantity: item.count,
      total: item.totalPrice,
    })
  );

  console.log(receiptItem);

  return (
    <main className="receipt-page">
      <section className="receipt-page__logo">
        <Logo />
      </section>
      <Receipt
        items={items}
        total={items.reduce((acc, item) => acc + item.total, 0)}
        orderId={receiptItem.orderId}
      />
      <Button type="primary">Gör en ny beställning</Button>
    </main>
  );
};
