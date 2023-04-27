import { r as registerInstance, h } from './index-237c0fcb.js';

const appRootCss = "@font-face{font-family:\"Avenir\";src:url(\"/assets/fonts/AvenirLTStd-Book.otf\")}@font-face{font-family:\"Avenir-Bold\";src:url(\"/assets/fonts/AvenirLTStd-Black.otf\")}header{background:#2d2670;color:#fff;height:56px;display:flex;align-items:center}h1{font-size:1.4rem;font-weight:500;color:#fff;padding:0 12px}";

let AppRoot = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
  }
  render() {
    return (h("div", null, h("header", null, h("h1", null, "Esri ArcGIS - Assessment")), h("main", null, h("stencil-router", null, h("stencil-route-switch", { scrollTopOffset: 0 }, h("stencil-route", { url: "/", component: "app-home", exact: true }))))));
  }
};
AppRoot.style = appRootCss;

export { AppRoot as app_root };
