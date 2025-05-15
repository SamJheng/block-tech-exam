"use client";
import { getTransactionsByAccount } from "@/lib/service/account";
import { use, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { getTransactionsByHash } from "@/lib/service/transaction";
interface Props {
  txhash:string;
}

export default function TransactionDetail({txhash}: Props) {
    const [transaction, setTransaction] = useState<any>({});
    useEffect(() => {
        const fetchTransactions = async () => {
            const t = await getTransactionsByHash(txhash);
            setTransaction(t.result);
        };
        fetchTransactions();
    }, [txhash]);
    
    return (
        <div>{transaction && Object.keys(transaction).length > 0 ?
            <Card style={{ margin: '10px', padding: '10px' }} key={transaction.hash}>
                <h3>Transaction Hash: {transaction.hash}</h3>
                <p>From: {transaction.from}</p>
                <p>To: {transaction.to}</p>
                <p>Value: {transaction.value} ETH</p>
                <p>Date: {new Date(transaction.timeStamp * 1000).toLocaleString()}</p>  
                <p>Block Number: {transaction.blockNumber}</p>
                <p>Gas Price: {transaction.gasPrice}</p>    
            </Card>:
            <div>Loading...</div>
            }
        </div>
    );
}