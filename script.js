$(document).ready(function () {
  $('input[name="multiply"]').click(function () {
    multiply();
  });
});

function multiply() {
  var results = $("#results tbody");
  results.html("");
  document.getElementById("product").innerHTML = "";

  var factor1 = parseInt($('input[name="factor1"]').val());
  var factor2 = parseInt($('input[name="factor2"]').val());
  var bitLength = parseInt($('input[name="bitLength"]').val());

  var maxNum = Math.pow(2, bitLength - 1) - 1;

  if (
    factor1 > maxNum ||
    factor1 < -maxNum ||
    factor2 > maxNum ||
    factor2 < -maxNum
  ) {
    document.getElementById("product").innerHTML =
      "one of the numbers you have provided cannot be expressed as an binary " +
      bitLength +
      "-bit number";
    return;
  }

  var pLeft = pad(0, bitLength);
  var pRight = invert(factor2, bitLength);
  var addedBit = "0";
  var m_and = invert(factor1, bitLength);

  writeOut(results, pLeft, pRight, addedBit, m_and, "Initialization", 0);

  for (var i = 0; i < bitLength; i++) {
    if (addedBit == "0" && pRight.substring(pRight.length - 1) == "1") {
      var tempA = parseInt(pLeft, 2);
      var tempM = parseInt(m_and, 2);

      tempA = tempA - tempM;
      pLeft = invert(tempA, bitLength);

      writeOut(
        results,
        pLeft,
        pRight,
        addedBit,
        m_and,
        "subtract multiplicand from product`",
        i
      );
    } else if (addedBit == "1" && pRight.substring(pRight.length - 1) == "0") {
      var tempA = parseInt(pLeft, 2);
      var tempM = parseInt(m_and, 2);

      tempA = tempA + tempM;
      pLeft = invert(tempA, bitLength);
      pLeft = pLeft.substring(pLeft.length - bitLength);

      writeOut(
        results,
        pLeft,
        pRight,
        addedBit,
        m_and,
        "add multiplicand to product`",
        i
      );
    }

    addedBit = pRight.substring(pRight.length - 1);
    pRight =
      pLeft.charAt(pLeft.length - 1) + pRight.substring(0, pRight.length - 1);
    pLeft = pLeft.charAt(0) + pLeft.substring(0, pLeft.length - 1);

    writeOut(results, pLeft, pRight, addedBit, m_and, "asr", i);
  }

  document.getElementById("product").innerHTML +=
    "Binary: " + pLeft + pRight + "\t\tDecimal: ";

  if (pLeft[0] == 1) {
    document.getElementById("product").innerHTML +=
      "-" +
      parseInt(
        invert(parseInt(parseInt(pLeft + "" + pRight), 2) * -1, bitLength * 2),
        2
      );
  } else {
    document.getElementById("product").innerHTML += parseInt(
      parseInt(pLeft + "" + pRight),
      2
    );
  }
}

function invert(number, bitLength) {
  if (number < 0) {
    // Negate
    var bin = number.toString(2);
    bin = pad(bin.substring(1, bin.length), bitLength);
    bin = bin.replace(/1/g, "x");
    bin = bin.replace(/0/g, "1");
    bin = bin.replace(/x/g, "0");

    // Add 1
    number = parseInt(bin, 2);
    number += 1;
    bin = number.toString(2);
    return pad(bin, bitLength);
  } else {
    return pad(number.toString(2), bitLength);
  }
}

function writeOut(table, pLeft, pRight, addedBit, m_and, log, i) {
  table.append(
    "<tr><td>" +
      (i + 1) +
      "</td><td>" +
      log +
      "</td><td>" +
      m_and +
      "</td><td>" +
      pLeft +
      "\t" +
      pRight +
      "\t" +
      addedBit +
      "</td></tr>"
  );
}

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }

  return str;
}
