import { d as darkMode, a as autoMode } from './resources-96bbaa96.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
/**
 * Emits when the mode is dynamically toggled between light and dark on <body> or in OS preferences.
 */
function initModeChangeEvent() {
  const { classList } = document.body;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const getMode = () => classList.contains(darkMode) || (classList.contains(autoMode) && prefersDark) ? "dark" : "light";
  const emitModeChange = (mode) => document.body.dispatchEvent(new CustomEvent("calciteModeChange", { bubbles: true, detail: { mode } }));
  const modeChangeHandler = (newMode) => {
    currentMode !== newMode && emitModeChange(newMode);
    currentMode = newMode;
  };
  let currentMode = getMode();
  // emits event on page load
  emitModeChange(currentMode);
  // emits event when changing OS mode preferences
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => modeChangeHandler(event.matches ? "dark" : "light"));
  // emits event when toggling between mode classes on <body>
  new MutationObserver(() => modeChangeHandler(getMode())).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"]
  });
}

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript}
 */
function esriCalciteComponentsGlobalScript () {
  const isBrowser = typeof window !== "undefined" &&
    typeof location !== "undefined" &&
    typeof document !== "undefined" &&
    window.location === location &&
    window.document === document;
  if (isBrowser) {
    if (document.readyState === "interactive") {
      initModeChangeEvent();
    }
    else {
      document.addEventListener("DOMContentLoaded", () => initModeChangeEvent(), { once: true });
    }
  }
}

const appGlobalScript = async () => {
  /**
   * The code to be executed should be placed within a default function that is
   * exported by the global script. Ensure all of the code in the global script
   * is wrapped in the function() that is exported.
   */
};

const globalScripts = () => {
  appGlobalScript();
  esriCalciteComponentsGlobalScript();
};

export { globalScripts as g };
