// app/account/[address]/page.tsx
import TransactionsList from '@/components/layout/transactionsList';
import { use } from 'react';

interface Props {
  params: { address: string };
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;
  
  return (
    <div>
      <TransactionsList address={address} />
    </div>
  );
}