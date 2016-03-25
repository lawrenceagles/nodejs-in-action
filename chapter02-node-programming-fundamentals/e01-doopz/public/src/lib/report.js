"use strict";

function report(items, title, label) {
  console.log("# " + title);
  for (var item in items) {
    if (items[item].length > 1) {
      printDups(item, items[item], label);
      console.log();
    }
  }
  console.log();
}

function printDups(item, itemInfos, label) {
  console.log("## " + item + ":" );
  itemInfos.forEach(function (itemInfo) {
    console.log("+ " + itemInfo[label] + "\n\t" + JSON.stringify(itemInfo));
  });
}

module.exports = report;
