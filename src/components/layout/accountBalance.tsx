"use client";
import { getBalanceByAccount, getTransactionsByAccount } from "@/lib/service/account";
import { Card } from "@mui/material";
import { useState, useEffect } from "react";
import { formatEther } from 'ethers';

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
                <h3>Account Address: {address}</h3>
                <p>Balance: {formatEther(balance)} ETH</p>
            </Card>
        </div>
    );
}