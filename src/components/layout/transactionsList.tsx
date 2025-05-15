"use client";
import { getTransactionsByAccount } from "@/lib/service/account";
import { use, useEffect, useState } from "react";
import Card from '@mui/material/Card';
interface Props {
  address:string;
}

export default function TransactionsList({address}: Props) {
    const [transactions, setTransactions] = useState<any[]>([]);
    useEffect(() => {
        const fetchTransactions = async () => {
            const list = await getTransactionsByAccount(address);
            setTransactions(list.result);
        };
        fetchTransactions();
    }, [address]);
    
    return (
        <div>
            {transactions.map((transaction) => (
                <Card key={transaction.hash} style={{ margin: '10px', padding: '10px' }}>
                    <h3>Transaction Hash: {transaction.hash}</h3>
                    <p>From: {transaction.from}</p>
                    <p>To: {transaction.to}</p>
                    <p>Value: {transaction.value} ETH</p>
                    <p>Date: {new Date(transaction.timeStamp * 1000).toLocaleString()}</p>
                </Card>
            ))}
        </div>
    );
}