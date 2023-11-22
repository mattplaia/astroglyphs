var originalAstroGlyphsMap = {
  A: "  *  \n * * \n*   *\n*****\n*   *",
  B: "**** \n*   *\n**** \n*   *\n**** ",
  C: " *** \n*   *\n*    \n*   *\n *** ",
  D: "**** \n*   *\n*   *\n*   *\n**** ",
  E: "*****\n*    \n**** \n*    \n*****",
  F: "*****\n*    \n**** \n*    \n*    ",
  G: " ****\n*    \n*  **\n*   *\n ****",
  H: "*   *\n*   *\n*****\n*   *\n*   *",
  I: "*****\n  *  \n  *  \n  *  \n*****",
  J: " ****\n   * \n   * \n*  * \n **  ",
  K: "*   *\n*  * \n***  \n*  * \n*   *",
  L: "*    \n*    \n*    \n*    \n*****",
  M: "*   *\n** **\n* * *\n*   *\n*   *",
  N: "*   *\n**  *\n* * *\n*  **\n*   *",
  O: " *** \n*   *\n*   *\n*   *\n *** ",
  P: "**** \n*   *\n**** \n*    \n*    ",
  Q: " *** \n*   *\n* * *\n*  **\n ** *",
  R: "**** \n*   *\n**** \n*  * \n*   *",
  S: " ****\n*    \n *** \n    *\n**** ",
  T: "*****\n  *  \n  *  \n  *  \n  *  ",
  U: "*   *\n*   *\n*   *\n*   *\n *** ",
  V: "*   *\n*   *\n * * \n * * \n  *  ",
  W: "*   *\n*   *\n* * *\n** **\n*   *",
  X: "*   *\n * * \n  *  \n * * \n*   *",
  Y: "*   *\n * * \n  *  \n  *  \n  *  ",
  Z: "*****\n   * \n  *  \n *   \n*****",
  " ": "     \n     \n     \n     \n     ", // Space
  "!": "  *  \n  *  \n  *  \n     \n  *  ", // Exclamation mark
  "?": " *** \n   * \n  *  \n     \n  *  ", // Question mark
  ",": "     \n     \n     \n  ** \n  *  ", // Comma
  ":": "  ** \n  ** \n     \n  ** \n  ** ", // Colon
  ";": "  ** \n  ** \n     \n  ** \n  *  ", // Semi-Colon
  ".": "     \n     \n     \n **  \n **  ", // Period
  "'": "  ** \n  *  \n     \n     \n     ", // Apostrophe
  "-": "     \n     \n*****\n     \n     ", // Dash
  "(": "  *  \n *   \n *   \n *   \n  *  ", // Paraenthesis Left
  ")": " *   \n  *  \n  *  \n  *  \n *   ", // Parenthesis Right
  "/": "    *\n   * \n  *  \n *   \n*    ", // Back Slash
  "#": " * * \n*****\n * * \n*****\n * * ", // Hashtag
  "$": " ****\n* *  \n *** \n  * *\n**** ", // Dollar Sign
  "%": "**  *\n** * \n  *  \n * **\n*  **", // Back Slash
  "*": "* * *\n *** \n*****\n *** \n* * *", // Asterisk
  "=": "     \n*****\n     \n*****\n     ", // Equals Sign
  0: " *** \n*   *\n*   *\n*   *\n *** ",
  1: "  *  \n **  \n  *  \n  *  \n *** ",
  2: " *** \n*   *\n   * \n  *  \n*****",
  3: " *** \n*   *\n  ** \n*   *\n *** ",
  4: "*  *\n*  *\n****\n   *\n   *",
  5: "*****\n*    \n *** \n    *\n**** ",
  6: " *** \n*    \n**** \n*   *\n *** ",
  7: "*****\n    *\n   * \n  *  \n *   ",
  8: " *** \n*   *\n *** \n*   *\n *** ",
  9: " *** \n*   *\n ****\n    *\n *** ",
};

var currentColor = "#FFFFFF"; // Default color

function convertToAstroGlyphs() {
  var input = document.getElementById("inputText").value.toUpperCase();
  var output = convertText(input);
  document.getElementById("output").innerHTML = output;
}

function convertText(text) {
  var lines = text.split("\n");
  var convertedLines = [];

  for (var i = 0; i < lines.length; i++) {
    var lineGlyphs = Array(5).fill("");

    for (var j = 0; j < lines[i].length; j++) {
      var glyph = convertCharacter(lines[i][j]);
      for (var line = 0; line < 5; line++) {
        lineGlyphs[line] += glyph.split("\n")[line] + " ";
      }
    }

    convertedLines.push(...lineGlyphs, "     ");
  }

  return convertedLines.join("\n");
}

function convertCharacter(char) {
  return originalAstroGlyphsMap[char] || "     \n     \n     \n     \n     ";
}

function colorizeAstroGlyphs() {
  var colorPopup = document.getElementById("colorPopup");
  colorPopup.style.display = "block";

  var colorPicker = document.getElementById("colorPicker");
  colorPicker.addEventListener("input", function () {
    currentColor = colorPicker.value;
    convertToAstroGlyphs();
  });
}

function saveAstroGlyphs() {
  html2canvas(document.getElementById("output"), {
    backgroundColor: "#000000", // Explicitly set the background color
  })
    .then((canvas) => {
      var link = document.createElement("a");
      link.download = "astroglyphs.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    })
    .catch((err) => {
      console.error("Error in saving:", err);
    });
}

function clearInput() {
  document.getElementById("inputText").value = ""; // Clear the input field
  convertToAstroGlyphs(); // Update the output to reflect the cleared input
}

// Call convertToAstroGlyphs initially to show the default text in AstroGlyph style
convertToAstroGlyphs();
