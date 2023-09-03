export const toRupiah = (nominal = 0) => {
  const prefix = "Rp.";
  if (isNaN(nominal)) return `${prefix}0`;
  return prefix + nominal.toLocaleString("id-id");
};
