export function convertToInternationalCurrencySystem(labelValue) {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e+9
  ? (Math.abs(Number(labelValue)) / 1.0e+9).toFixed(2) + "MD"
  // Six Zeroes for Millions
  : Math.abs(Number(labelValue)) >= 1.0e+6
  ? (Math.abs(Number(labelValue)) / 1.0e+6).toFixed(2) + "M"
  // Three Zeroes for Thousands
  : Math.abs(Number(labelValue)) >= 1.0e+3
  ? (Math.abs(Number(labelValue)) / 1.0e+3).toFixed(2) + "K"
  : Math.abs(Number(labelValue));
}

export function format(n) {
const convertStringToNumber = Number(n)
  return convertStringToNumber.toFixed(2).replace('.', ',').replace(/\d{3}(?=(\d{3})*,)/g, function (s) {
    return '.' + s
  })
}

export function FormatUrlTitle(title) {
  const specialChars = /[^a-zA-Z0-9 -]/g;
  return title.replace(specialChars, "-").replace(/ /g, "-").replace("’", "-");
}