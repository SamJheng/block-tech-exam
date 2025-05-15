import axios from "axios";
import { apiUrl } from "../model/etherscan";

export const getTransactionsByHash = (txhash: string) => {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const query = axios.get(`${apiUrl}`, {
    params: {
      chainid: 1,
      module: "proxy",
      action: "eth_getTransactionByHash",
      txhash,
      apikey: "HQRSZ2SAWFKJYC6W413PC8PK6W5UZNG82G",
    },
  });
  return query.then((res) => res.data);
};
