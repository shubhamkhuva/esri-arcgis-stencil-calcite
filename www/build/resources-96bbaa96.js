/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
const autoMode = "calcite-mode-auto";
const darkMode = "calcite-mode-dark";
const lightMode = "calcite-mode-light";
const MODES = [
  {
    name: "light",
    className: lightMode
  },
  {
    name: "dark",
    className: darkMode
  },
  {
    name: "auto",
    className: autoMode
  }
];
const CSS_UTILITY = {
  autoMode,
  darkMode,
  lightMode,
  rtl: "calcite--rtl"
};
const TEXT = {
  loading: "Loading"
};

export { CSS_UTILITY as C, autoMode as a, darkMode as d };
