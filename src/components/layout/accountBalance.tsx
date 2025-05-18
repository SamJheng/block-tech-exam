"use client";
import { getBalanceByAccount, getTransactionsByAccount } from "@/lib/service/account";
import { Card } from "@mui/material";
import { useState, useEffect } from "react";
import { formatEther } from 'ethers';
import ErrorDailog from "../ui/error";

interface Props {
  address:string;
}

export default function AccountBalance({address}: Props) {
    const [balance , setBalance ] = useState<string>('0');
    
    useEffect(() => {
        const fetchData = async () => {
            const list = await getBalanceByAccount(address);
            
            if (list.result) {
                setBalance(list.result);
            }
            
        };
        fetchData();
    }, [address]);
    
    return (
        <div>
            <Card style={{ margin: '10px', padding: '10px' }}>
                <h3 className='text-2xl'>Account Address: {address}</h3>
                <p>Balance: <b className=" text-orange-600">{balance!=='0'?formatEther(balance):balance} ETH</b></p>
            </Card>
        </div>
    );
}