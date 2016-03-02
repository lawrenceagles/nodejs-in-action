"use strict";


module.exports = CurrencyConverter;

function CurrencyConverter(oneRupeeInEuros) {
  this.eurosRupee = oneRupeeInEuros;
}

CurrencyConverter.prototype = {
  rupeeToEuro: function (rupeesAmount) {
    return roundTwoDecimals(rupeesAmount * this.eurosRupee);
  },
  euroToRupee: function (eurosAmount) {
    return roundTwoDecimals(eurosAmount / this.eurosRupee);
  }
};

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}
