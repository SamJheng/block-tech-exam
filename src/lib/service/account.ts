import axios from "axios";
import { apiUrl } from "../model/etherscan";

export const getTransactionsByAccount = (address:string) => {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const query = axios.get(`${apiUrl}`, {
    params: {
      module: "account",
      action: "txlist",
      address,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 10,
      sort: "asc",
      apikey: apiKey,
    },
  });
  return query.then((res) => res.data);
};