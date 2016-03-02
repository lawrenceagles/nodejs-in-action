"use strict";

var eurosRupee = 0.01360544217687074829931972789116; /* 2016-03-02 */

function roundTwoDecimals(amount) {
  return Math.round(amount * 100) / 100;
}

exports.rupeeToEuro = function (rupeesAmount) {
  return roundTwoDecimals(rupeesAmount * eurosRupee);
};

exports.euroToRupee = function (eurosAmount) {
  return roundTwoDecimals(eurosAmount / eurosRupee);
};
