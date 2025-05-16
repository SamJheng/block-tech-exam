"use client";
import { getTransactionsByAccount } from "@/lib/service/account";
import { use, useEffect, useState } from "react";
import Card from '@mui/material/Card';
import { getTransactionsByHash } from "@/lib/service/transaction";
import { formatEther } from 'ethers';
import { EthereumEIP1559Transaction } from "@/lib/model/transaction";
import { getTransactionType } from "@/lib/transactionType";
import { BlockData } from "@/lib/model/blockData";
import { getBlockByNumber } from "@/lib/service/block";
import { Skeleton } from "@mui/material";
interface Props {
  txhash:string;
}

export default function TransactionDetail({txhash}: Props) {
    const [transaction, setTransaction] = useState<EthereumEIP1559Transaction<any[]>>();
    const [block, setBlock] = useState<BlockData>();
    useEffect(() => {
        const fetchData = async () => {
            const t = await getTransactionsByHash(txhash);
            if (t.result) {
                setTransaction(t.result);
                const b = await getBlockByNumber(t.result.blockNumber);
                if (b.result) {
                    setBlock(b.result);
                }
            }
            
        };
        fetchData();
    }, [txhash]);
    const loading = ()=>(
        <>
            <Skeleton variant="rectangular" className="rounded my-2" width={200} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={200} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
        </>
    );
    return (
        <div>{transaction && Object.keys(transaction).length > 0 ?
            <Card style={{ margin: '10px', padding: '10px' }} key={transaction.hash}>
                <h3>Transaction Hash: {transaction.hash}</h3>
                <p>From: {transaction.from}</p>
                <p>To: {transaction.to}</p>
                <p>Value: {formatEther(transaction.value)} ETH</p>
                <p>Block Number: {transaction.blockNumber}</p>
                <p>Gas: {formatEther(transaction.gas)}</p>    
                <p>Gas Price: {formatEther(transaction.gasPrice)} ETH</p>  
                <p>Type: {getTransactionType(transaction.type)}</p> 
                {block && <p>Date: {new Date(parseInt(block!.timestamp) * 1000).toLocaleString()}</p>}
                
            </Card>:
            <Card>
                {loading()}
            </Card>
            }
        </div>
    );
}