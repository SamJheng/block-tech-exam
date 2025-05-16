"use client";
import TransactionDetail from "@/components/layout/transactionDetail";
import { use } from 'react';
type Params = Promise<{ hash: string }>;
export default function AccountPage(props: { params: Params }) {
  const params = use(props.params);
  const { hash } =  params;

  return (
    <div className="flex items-center justify-center max-w-[1200px] mx-auto min-h-screen">
      <TransactionDetail txhash={hash} />
    </div>
  );
}