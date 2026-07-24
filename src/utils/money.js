export const formatKes = (amount) =>
  `Ksh ${new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount)}`;
