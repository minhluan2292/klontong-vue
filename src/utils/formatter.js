export const toRupiah = (nominal = 0) => {
  const prefix = "Rp.";
  if (isNaN(nominal)) return `${prefix}0`;
  return prefix + nominal.toLocaleString("id-id");
};

export function nl2br(str, replaceMode = false, isXhtml = false) {
  var breakTag = isXhtml ? "<br />" : "<br>";
  var replaceStr = replaceMode ? "$1" + breakTag : "$1" + breakTag + "$2";
  return (str + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, replaceStr);
}
