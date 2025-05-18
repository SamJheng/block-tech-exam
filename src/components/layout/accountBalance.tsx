"use client";
import { getBalanceByAccount, getTransactionsByAccount } from "@/lib/service/account";
import { Card } from "@mui/material";
import { useState, useEffect } from "react";
import { formatEther } from 'ethers';
import ErrorDailog from "../ui/error";
import { useRouter } from "next/router";

interface Props {
  address:string;
}

export default function AccountBalance({address}: Props) {
    const [balance , setBalance ] = useState<string>('0');
    const [errorOpen, setErrorOpen] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const fetchData = async () => {
            const list = await getBalanceByAccount(address);
            if (list.status==='0') {
                setErrorOpen(true);
                return;
            }
            if (list.result && !isNaN(Number(list.result))) {
                setBalance(list.result);
            }
            
        };
        fetchData();
    }, [address]);
    
    return (
        <div>
            <ErrorDailog
                isOpen={errorOpen}
                errorContent="No found balance for this address"
                errorTitle="Something went wrong!"
                onClose={() => {
                    router.push('/');
                }}
                closeText="Close"
            />
            <Card style={{ margin: '10px', padding: '10px' }}>
                <h3 className='text-2xl'>Account Address: {address}</h3>
                <p>Balance: <b className=" text-orange-600">{balance!=='0'?formatEther(balance):balance} ETH</b></p>
            </Card>
        </div>
    );
}