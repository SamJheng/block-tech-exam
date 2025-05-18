"use client";
import { getTransactionsByAccount } from "@/lib/service/account";
import { use, useEffect, useState } from "react";
import { formatEther } from 'ethers';
import { Link, Skeleton, TablePagination } from "@mui/material";
import { EthereumTransaction } from "@/lib/model/transaction";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ErrorDailog from "../ui/error";
import { useRouter } from "next/navigation";

interface Props {
  address:string;
}

export default function TransactionsList({address}: Props) {
    const [transactions, setTransactions] = useState<EthereumTransaction[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [total, setTotal] = useState(9999);
    const [errorOpen, setErrorOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const list = await getTransactionsByAccount(address, page + 1, rowsPerPage);
            if (list.status==='0') {
                setErrorOpen(true);
                return;
            }
            if (list.result) {
                setTransactions(list.result);
            }
            
        };
        fetchData();
    },  [address, page, rowsPerPage]);
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
        <>
            <ErrorDailog
                isOpen={errorOpen}
                errorContent="No found transaction for this address"
                errorTitle="Something went wrong!"
                onClose={() => {
                    router.push('/');
                }}
                closeText="Close"
            />
            <TableContainer component={Paper}>
                <Table stickyHeader sx={{ minWidth: 650 }} aria-label="transactions table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>Transaction Hash</b>
                            </TableCell>
                            <TableCell>
                                <b>From</b>
                            </TableCell>
                            <TableCell>
                                <b>To</b>
                            </TableCell>
                            <TableCell align="right">
                                <b>Balance (ETH)</b>
                            </TableCell>
                            <TableCell>
                                <b>Date</b>
                            </TableCell>
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
            <TablePagination
                component="div"
                count={total}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setPage(0);
                }}
                rowsPerPageOptions={[5, 10, 25, 50]}
            />
        </>
        
        
    );
}