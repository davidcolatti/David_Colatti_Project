export const formatMillionCurrency = (amount: number) => {
  if (amount >= 1000) {
    const formattedNum = amount / 1000;
    return `$${formattedNum.toFixed(2)}B`;
  }

  return `$${amount.toFixed(2)}M`;
};
