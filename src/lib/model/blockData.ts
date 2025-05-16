export interface BlockData {
  difficulty: string; // 十六進位字串，需轉成 BigInt 處理
  extraData: string; // 其他資料（十六進位字串）
  gasLimit: string; // 區塊 gas 上限（hex string）
  gasUsed: string; // 此區塊實際用掉的 gas（hex string）
  hash: string; // 區塊哈希
  logsBloom: string; // 日誌 Bloom filter（hex string）
  miner: string; // 礦工地址
  mixHash: string; // 混合哈希（共識演算法用）
  nonce: string; // 隨機數（hex string）
  number: string; // 區塊高度（hex string）
  parentHash: string; // 上一個區塊的哈希
  receiptsRoot: string; // 收據根哈希
  sha3Uncles: string; // Uncles 區塊哈希
  size: string; // 區塊大小（bytes，hex string）
  stateRoot: string; // 狀態根哈希
  timestamp: string; // 區塊時間戳（hex string）
  transactions: string[]; // 此區塊包含的交易哈希陣列
  transactionsRoot: string; // 交易根哈希
  uncles: string[]; // Uncle 區塊哈希陣列
}
