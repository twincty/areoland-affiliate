export const formatMoney = (
  amount,
  decimalCount = 2,
  decimal = ".",
  thousands = ","
) => {
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? "-" : "";

    let i = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : "") +
      i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : "")
    );
  } catch (e) {
    console.log(e);
  }
};

export const numberFormat = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatPhoneNumber = (phoneNumberString) => {
  var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
  var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    var intlCode = match[1] ? "+" + match[1] + " " : "+1 ";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  } else {
    var match = cleaned.match(/(\d{2})(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? "+" + match[1] + " " : "+1 ";
      return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
  }
  return null;
};
