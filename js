var originalAstroGlyphsMap = {
  A: "  *  \n * * \n*   *\n*****\n*   *",
  B: "**** \n*   *\n**** \n*   *\n**** ",
  C: " *** \n*   *\n*    \n*   *\n *** ",
  D: "**** \n*   *\n*   *\n*   *\n**** ",
  E: "*****\n*    \n*****\n*    \n*****",
  F: "*****\n*    \n**** \n*    \n*    ",
  G: " ****\n*    \n*  **\n*   *\n ****",
  H: "*   *\n*   *\n*****\n*   *\n*   *",
  I: "*****\n  *  \n  *  \n  *  \n*****",
  J: "*****\n   * \n   * \n*  * \n **  ",
  K: "*   *\n*  * \n**   \n*  * \n*   *",
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
  ":": "     \n  *  \n     \n  *  \n     ", // Colon
  ".": "     \n     \n     \n **  \n **  ", // Period
  "'": "  ** \n  *  \n     \n     \n     ", // Apostrophe
  "-": "     \n     \n*****\n     \n     ", // Dash
  "(": " *   \n*    \n*    \n*    \n *   ", // Paraenthesis Left
  ")": "   * \n    *\n    *\n    *\n   * ", // Parenthesis Right
  0: " *** \n*   *\n*   *\n*   *\n *** ",
  1: "  *  \n **  \n  *  \n  *  \n *** ",
  2: " *** \n*   *\n   * \n  *  \n*****",
  3: "**** \n   * \n  *  \n   * \n**** ",
  4: "*  *\n*  *\n****\n   *\n   *",
  5: "**** \n*    \n *** \n    *\n**** ",
  6: " *** \n*    \n**** \n*   *\n *** ",
  7: "*****\n    *\n   * \n  *  \n *   ",
  8: " *** \n*   *\n *** \n*   *\n *** ",
  9: " ****\n*   *\n ****\n    *\n *** ",
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
      if (glyph) {
        var glyphLines = glyph.split("\n");
        for (var line = 0; line < 5; line++) {
          // Add the asterisk element with color style
          lineGlyphs[
            line
          ] += `<span class="asterisk" style="color: ${currentColor}">${glyphLines[line]}</span> `;
        }
      }
    }

    convertedLines.push(...lineGlyphs);

    if (i < lines.length - 1) {
      convertedLines.push("          ", "          ");
    }
  }

  return convertedLines.join("\n");
}

function convertCharacter(char) {
  return originalAstroGlyphsMap[char] || "     \n     \n     \n     \n     "; // Default for undefined chars
}

function limitTextarea() {
  var textarea = document.getElementById("inputText");
  var lines = textarea.value.split("\n");

  for (var i = 0; i < lines.length; i++) {
    if (lines[i].length > 15) {
      var overflow = lines[i].substring(15); // Get the overflow text
      lines[i] = lines[i].substring(0, 15); // Truncate the line
      if (i < lines.length - 1) {
        // Add the overflow text to the next line
        lines[i + 1] = overflow + lines[i + 1];
      }
    }
  }

  textarea.value = lines.join("\n");
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

function closeColorPicker() {
  var colorPopup = document.getElementById("colorPopup");
  colorPopup.style.display = "none";
}
