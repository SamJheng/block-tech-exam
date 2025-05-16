"use client";
import { getTransactionsByAccount } from "@/lib/service/account";
import { use, useEffect, useState } from "react";
import { formatEther } from 'ethers';
import { Link, Skeleton } from "@mui/material";
import { EthereumTransaction } from "@/lib/model/transaction";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {
  address:string;
}

export default function TransactionsList({address}: Props) {
    const [transactions, setTransactions] = useState<EthereumTransaction[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            const list = await getTransactionsByAccount(address);
            if (list.result) {
                setTransactions(list.result);
            }
        };
        fetchData();
    }, [address]);
    const loading = ()=>(
        <>
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={300} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
            <Skeleton variant="rectangular" className="rounded my-2" width={600} height={20} />
        </>
    );
    return (
        <TableContainer component={Paper}>
            <Table stickyHeader sx={{ minWidth: 650 }} aria-label="transactions table">
                <TableHead>
                    <TableRow>
                        <TableCell>Transaction Hash</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell align="right">Balance (ETH)</TableCell>
                        <TableCell>Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.length === 0 ? (loading()) : (
                        transactions.map((transaction) => (
                            <TableRow key={transaction.hash}>
                                <TableCell>
                                    <Link 
                                        target="_blank"
                                        rel="noopener noreferrer" 
                                        href={'/transaction/'+transaction.hash}>
                                            <p title={transaction.hash} className="overflow-hidden text-ellipsis max-w-20">{transaction.hash}</p>
                                    </Link>
                                </TableCell>
                                <TableCell>{transaction.from}</TableCell>
                                <TableCell>{transaction.to}</TableCell>
                                <TableCell align="right">{formatEther(transaction.value)}</TableCell>
                                <TableCell>{new Date(parseInt(transaction.timeStamp) * 1000).toLocaleString()}</TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}