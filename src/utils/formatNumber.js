import numeral from 'numeral';

// ----------------------------------------------------------------------

export function fCurrency(number) {
  return numeral(number).format(Number.isInteger(number) ? '$0,0' : '$0,0.00');
}

export function fCurrencyShort(number) {
  return numeral(number).format('$0,0');
}

export function fPercent(number) {
  return numeral(number / 100).format('0.0%');
}

export function fPercentChange(number) {
  const prefix = number >= 0 ? "+ " : "- ";
  number = number >= 0 ? number : number * -1;
  return prefix + numeral(number / 100).format('0.0%');
}

export function fNumber(number) {
  return numeral(number).format();
}

export function fShortenNumber(number) {
  return numeral(number).format('0.00a').replace('.00', '');
}

export function fROAS(number) {
  return number == -1 ? "-" : numeral(number).format('0.00a');
}

export function fEPC(number) {
  return number == -1 ? "-" : fCurrency(number);
}

export function fData(number) {
  return numeral(number).format('0.0 b');
}
