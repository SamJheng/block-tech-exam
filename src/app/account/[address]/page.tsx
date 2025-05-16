// app/account/[address]/page.tsx
import AccountBalance from '@/components/layout/accountBalance';
import TransactionsList from '@/components/layout/transactionsList';
import { use } from 'react';

interface Props {
  params: { address: string };
}

export default async function AccountPage({ params }: Props) {
  const { address } = await params;
  
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen">
      <AccountBalance address={address} />
      <TransactionsList address={address} />
    </div>
  );
}