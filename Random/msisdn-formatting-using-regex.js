console.clear();

/**
 * Formats a given MSISDN with the optional formats below.
 *
 * - 'compact' => Sample output: 9132058092
 * - 'compact-int' => Sample output: 2349132058092
 * - 'compact-leading' => Sample output: 09132058092
 * - 'default' => Sample output: 0913 205 8092
 * - 'int' => Sample output: (+234) 913 205 8092
 *
 * @param string a string input of 10, 11 or 13 characters.
 * @param format either 'compact', 'compact-int', 'compact-leading', 'default', or 'int'.
 * When no format is specified, the 'default' option is applied.
 * @returns string
 */
const formatMsisdn = (string, format) => {
  format = format ? format : "default"; // handled

  // Ensure the string provided is valid.
  if (string.length === 10 || string.length === 11 || string.length === 13) {
    let msisdn = "";

    if (format === "compact") {
      // 9132058092
      if (string.match(/^(?=[0-9]{10})([0-9]{10})$/)) {
        msisdn = string;
      } else if (string.match(/^(?=[0-9]{11})(0)([0-9]{10})$/)) {
        msisdn = string.replace(/^(?=[0-9]{11})(0)([0-9]{10})$/, "$2");
      } else if (string.match(/^(?=[0-9]{13})(234)([0-9]{10})$/)) {
        msisdn = string.replace(/^(?=[0-9]{13})(234)([0-9]{10})$/, "$2");
      }
    } else if (format === "compact-int") {
      // 2349132058092
      if (string.match(/^(?=[0-9]{10})([0-9]{10})$/)) {
        msisdn = string.replace(/^(?=[0-9]{10})([0-9]{10})$/, "234$1");
      } else if (string.match(/^(?=[0-9]{11})(0)([0-9]{10})$/)) {
        msisdn = string.replace(/^(?=[0-9]{11})(0)([0-9]{10})$/, "234$2");
      } else if (string.match(/^(?=[0-9]{13})(234)([0-9]{10})$/)) {
        msisdn = string;
      }
    } else if (format === "compact-leading") {
      // 09132058092
      if (string.match(/^(?=[0-9]{10})([0-9]{10})$/)) {
        msisdn = string.replace(/^(?=[0-9]{10})([0-9]{10})$/, "0$1");
      } else if (string.match(/^(?=[0-9]{11})(0)([0-9]{10})$/)) {
        msisdn = string;
      } else if (string.match(/^(?=[0-9]{13})(234)([0-9]{10})$/)) {
        msisdn = string.replace(/^(?=[0-9]{13})(234)([0-9]{10})$/, "0$2");
      }
    } else if (format === "default") {
      // 0913 205 8092
      if (string.match(/^(?=[0-9]{10})([0-9]{10})$/)) {
        msisdn = string.replace(
          /^(?=[0-9]{10})([0-9]{3})([0-9]{3})([0-9]{4})$/,
          "0$1 $2 $3"
        );
      } else if (string.match(/^(?=[0-9]{11})(0)([0-9]{10})$/)) {
        msisdn = string.replace(
          /^(?=[0-9]{11})([0-9]{4})([0-9]{3})([0-9]{4})$/,
          "$1 $2 $3"
        );
      } else if (string.match(/^(?=[0-9]{13})(234)([0-9]{10})$/)) {
        msisdn = string.replace(
          /^(?=[0-9]{13})(234)([0-9]{3})([0-9]{3})([0-9]{4})$/,
          "0$2 $3 $4"
        );
      }
    } else if (format === "int") {
      // (+234) 913 205 8092
      if (string.match(/^(?=[0-9]{10})([0-9]{10})$/)) {
        msisdn = string.replace(
          /^(?=[0-9]{10})([0-9]{3})([0-9]{3})([0-9]{4})$/,
          "(+234) $1 $2 $3"
        );
      } else if (string.match(/^(?=[0-9]{11})(0)([0-9]{10})$/)) {
        msisdn = string.replace(
          /^(?=[0-9]{11})(0)([0-9]{3})([0-9]{3})([0-9]{4})$/,
          "(+234) $2 $3 $4"
        );
      } else if (string.match(/^(?=[0-9]{13})(234)([0-9]{10})$/)) {
        msisdn = string.replace(
          /^(?=[0-9]{13})(234)([0-9]{3})([0-9]{3})([0-9]{4})$/,
          "(+234) $2 $3 $4"
        );
      }
    }

    return msisdn;
  }

  throw new Error("Invalid MSISDN provided."); // handled
};

const formatMsisdn2 = (msisdn, format = "default") => {
  const validLengths = [10, 11, 13];

  if (!validLengths.includes(msisdn.length)) {
    throw new Error("Invalid MSISDN provided.");
  }

  const patterns = {
    compact: /^(?:0|234)?([0-9]{10})$/,
    "compact-int": /^(?:0|234)?([0-9]{10})$/,
    "compact-leading": /^(?:0|234)?([0-9]{10})$/,
    default: /^(?:0|234)?([0-9]{3})([0-9]{3})([0-9]{4})$/,
    int: /^(?:0|234)?([0-9]{3})([0-9]{3})([0-9]{4})$/,
  };

  const replacements = {
    compact: "$1",
    "compact-int": "234$1",
    "compact-leading": "0$1",
    default: "0$1 $2 $3",
    int: "(+234) $1 $2 $3",
  };

  if (!patterns[format]) {
    throw new Error("Invalid format type.");
  }

  const match = msisdn.match(patterns[format]);

  if (!match) {
    throw new Error("Invalid MSISDN provided.");
  }

  return msisdn.replace(patterns[format], replacements[format]);
};

console.log(formatMsisdn("2349132058092", "int"));

console.log(formatMsisdn2("09132058092", "int"));
