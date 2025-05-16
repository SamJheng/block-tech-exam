import axios from "axios";
import { apiUrl } from "../model/etherscan";
import { BlockData } from "../model/blockData";
import { ResponseResult } from "../model/response";

export const getBlockByNumber = (
  blockNumber: string
): Promise<ResponseResult<BlockData>> => {
  const apiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
  const query = axios.get(`${apiUrl}`, {
    params: {
      module: "proxy",
      action: "eth_getBlockByNumber",
      tag: blockNumber,
      boolean: true,
      apikey: apiKey,
    },
  });
  return query.then((res) => res.data);
};