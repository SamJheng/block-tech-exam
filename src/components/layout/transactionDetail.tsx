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
import { Link, Skeleton } from "@mui/material";
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
                <h3 className="text-2xl mb-2"><b>Transaction Hash:</b> {transaction.hash}</h3>
                <p className="mb-2">
                    <b>From:</b> 
                    <Link 
                        target="_blank"
                        rel="noopener noreferrer" 
                        href={'/account/'+transaction.from}>
                           {transaction.from}
                    </Link>
                </p>
                <p className="mb-2">
                    <b>To:</b>  
                    <Link 
                        target="_blank"
                        rel="noopener noreferrer" 
                        href={'/account/'+transaction.to}>
                           {transaction.to}
                    </Link>
                    
                </p>
                <p className=" text-orange-600 mb-2">
                    <b>Value:</b>  
                    {formatEther(transaction.value)} ETH
                </p>
                <p className="mb-2">
                    <b>Block Number:</b> 
                    {transaction.blockNumber}
                </p>
                <p className="mb-2">
                    <b>Gas:</b>  
                    {formatEther(transaction.gas)}
                </p>    
                <p className="mb-2">
                    <b>Gas Price:</b>  
                    {formatEther(transaction.gasPrice)} ETH
                </p>  
                <p className="mb-2">
                    <b>Type:</b>  
                    {getTransactionType(transaction.type)}
                </p> 
                {block && 
                <p>
                    <b>Date:</b>  
                    {new Date(parseInt(block!.timestamp) * 1000).toLocaleString()}
                </p>}
                
            </Card>:
            <Card>
                {loading()}
            </Card>
            }
        </div>
    );
}