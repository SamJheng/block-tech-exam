import axios from "axios";
import { apiUrl } from "../model/etherscan";
import { ResponseResult } from "../model/response";
import { EthereumTransaction } from "../model/transaction";

export const getTransactionsByAccount = (
  address: string,
  page: number,
  offset: number
): Promise<ResponseResult<EthereumTransaction[]>> => {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const query = axios.get(`${apiUrl}`, {
    params: {
      module: "account",
      action: "txlist",
      address,
      startblock: 0,
      endblock: 99999999,
      page,
      offset,
      sort: "desc",
      apikey: apiKey,
    },
  });
  return query.then((res) => res.data);
};
export const getBalanceByAccount = (address: string): Promise<ResponseResult<string>> => {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const query = axios.get(`${apiUrl}`, {
    params: {
      module: "account",
      action: "balance",
      address,
      tag: "latest",
      apikey: apiKey,
    },
  });
  return query.then((res) => res.data);
};