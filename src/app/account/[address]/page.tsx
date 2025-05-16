"use client";
import AccountBalance from '@/components/layout/accountBalance';
import TransactionsList from '@/components/layout/transactionsList';
import { use } from 'react';

type Params = Promise<{ address: string }>;
export default function AccountPage(props: { params: Params } ) {
  const params = use(props.params);
  const { address } =  params;
  
  return (
    <div className="max-w-[1200px] mx-auto min-h-screen">
      <AccountBalance address={address} />
      <TransactionsList address={address} />
    </div>
  );
}