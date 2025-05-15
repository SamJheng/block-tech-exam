import TransactionDetail from "@/components/layout/transactionDetail";

interface Props {
  params: { hash: string };
}

export default async function AccountPage({ params }: Props) {
  const { hash } = await params;

  return (
    <div>
      <TransactionDetail txhash={hash} />
    </div>
  );
}