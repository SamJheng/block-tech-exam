import TransactionDetail from "@/components/layout/transactionDetail";

interface Props {
  params: { hash: string };
}

export default async function AccountPage({ params }: Props) {
  const { hash } = await params;

  return (
    <div className="flex items-center justify-center max-w-[1200px] mx-auto min-h-screen">
      <TransactionDetail txhash={hash} />
    </div>
  );
}