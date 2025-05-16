/**
 * 判斷 Ethereum 交易類型
 * @param typeHex 交易類型的十六進位字串（如 "0x0", "0x1", "0x2"）
 * @returns 類型名稱字串
 */
export function getTransactionType(typeHex: string): string {
  const type = parseInt(typeHex, 16);

  switch (type) {
    case 0:
      return "Legacy Transaction (type 0)";
    case 1:
      return "EIP-2930 Access List Transaction (type 1)";
    case 2:
      return "EIP-1559 Dynamic Fee Transaction (type 2)";
    default:
      return `Unknown Transaction Type (type ${type})`;
  }
}
