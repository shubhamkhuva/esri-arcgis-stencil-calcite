import { r as registerInstance, h, F as Fragment, i as getElement } from './index-237c0fcb.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-15eb720d.js';
import { e as slotChangeHasAssignedElement, s as slotChangeGetAssignedElements } from './dom-a5def642.js';
import './observers-4b8b0132.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
const CSS = {
  main: "main",
  content: "content",
  contentBehind: "content--behind",
  footer: "footer",
  positionedSlotWrapper: "positioned-slot-wrapper",
  container: "container",
  contentBehindCenterContent: "center-content"
};
const SLOTS = {
  centerRow: "center-row",
  panelStart: "panel-start",
  panelEnd: "panel-end",
  panelTop: "panel-top",
  panelBottom: "panel-bottom",
  header: "header",
  footer: "footer",
  alerts: "alerts",
  modals: "modals"
};

const shellCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{position:absolute;inset:0px;display:flex;block-size:100%;inline-size:100%;flex-direction:column;overflow:hidden;--calcite-shell-tip-spacing:26vw}.main{position:relative;display:flex;block-size:100%;inline-size:100%;flex:1 1 auto;flex-direction:row;justify-content:space-between;overflow:hidden}.content{display:flex;block-size:100%;inline-size:100%;flex-direction:column;flex-wrap:nowrap;overflow:auto}.content ::slotted(calcite-shell-center-row),.content ::slotted(calcite-panel),.content ::slotted(calcite-flow){flex:1 1 auto;align-self:stretch;max-block-size:unset}.content--behind{position:absolute;inset:0px;border-width:0px;z-index:calc(1 - 1);display:initial}::slotted(calcite-shell-center-row){inline-size:unset}::slotted(.header .heading){font-size:var(--calcite-font-size--2);line-height:1.375;font-weight:var(--calcite-font-weight-normal)}slot[name=panel-end]::slotted(calcite-shell-panel){margin-inline-start:auto}::slotted(calcite-panel),::slotted(calcite-flow){border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-ui-border-3)}slot[name=center-row]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-top]::slotted(calcite-shell-center-row:not([detached])),slot[name=panel-bottom]::slotted(calcite-shell-center-row:not([detached])){border-inline-start-width:1px;border-inline-end-width:1px;border-color:var(--calcite-ui-border-3)}.center-content{display:flex;flex-direction:column;justify-content:space-between;block-size:100%;inline-size:100%;min-inline-size:0}::slotted(calcite-shell-center-row){flex:none;align-self:stretch}::slotted(calcite-tip-manager){position:absolute;z-index:500;box-sizing:border-box}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}::slotted(calcite-tip-manager){animation:in-up var(--calcite-internal-animation-timing-slow) ease-in-out;border-radius:0.25rem;--tw-shadow:0 6px 20px -4px rgba(0, 0, 0, 0.1), 0 4px 12px -2px rgba(0, 0, 0, 0.08);--tw-shadow-colored:0 6px 20px -4px var(--tw-shadow-color), 0 4px 12px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);inset-block-end:0.5rem;inset-inline:var(--calcite-shell-tip-spacing)}slot[name=center-row]::slotted(calcite-shell-center-row),slot[name=panel-bottom]::slotted(calcite-shell-center-row){margin-block-start:auto}slot[name=panel-top]::slotted(calcite-shell-center-row){margin-block-end:auto}.position-wrapper{position:absolute;pointer-events:none;inset:0}";

let Shell = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleHeaderSlotChange = (event) => {
      this.hasHeader = !!slotChangeHasAssignedElement(event);
    };
    this.handleFooterSlotChange = (event) => {
      this.hasFooter = !!slotChangeHasAssignedElement(event);
    };
    this.handleAlertsSlotChange = (event) => {
      var _a;
      this.hasAlerts = !!slotChangeHasAssignedElement(event);
      (_a = slotChangeGetAssignedElements(event)) === null || _a === void 0 ? void 0 : _a.map((el) => {
        if (el.nodeName === "CALCITE-ALERT") {
          el.slottedInShell = true;
        }
      });
    };
    this.handleModalsSlotChange = (event) => {
      var _a;
      this.hasModals = !!slotChangeHasAssignedElement(event);
      (_a = slotChangeGetAssignedElements(event)) === null || _a === void 0 ? void 0 : _a.map((el) => {
        if (el.nodeName === "CALCITE-MODAL") {
          el.slottedInShell = true;
        }
      });
    };
    this.contentBehind = false;
    this.hasHeader = false;
    this.hasFooter = false;
    this.hasAlerts = false;
    this.hasModals = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectConditionalSlotComponent(this);
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    return (h("div", { hidden: !this.hasHeader }, h("slot", { key: "header", name: SLOTS.header, onSlotchange: this.handleHeaderSlotChange })));
  }
  renderFooter() {
    return (h("div", { class: CSS.footer, hidden: !this.hasFooter, key: "footer" }, h("slot", { name: SLOTS.footer, onSlotchange: this.handleFooterSlotChange })));
  }
  renderAlerts() {
    return (h("div", { hidden: !this.hasAlerts }, h("slot", { key: "alerts", name: SLOTS.alerts, onSlotchange: this.handleAlertsSlotChange })));
  }
  renderModals() {
    return (h("div", { hidden: !this.hasModals }, h("slot", { key: "modals", name: SLOTS.modals, onSlotchange: this.handleModalsSlotChange })));
  }
  renderContent() {
    const defaultSlotNode = h("slot", { key: "default-slot" });
    const deprecatedCenterRowSlotNode = (h("slot", { key: "center-row-slot", name: SLOTS.centerRow }));
    const panelBottomSlotNode = h("slot", { key: "panel-bottom-slot", name: SLOTS.panelBottom });
    const panelTopSlotNode = h("slot", { key: "panel-top-slot", name: SLOTS.panelTop });
    const contentContainerKey = "content-container";
    const content = !!this.contentBehind
      ? [
        h("div", { class: {
            [CSS.content]: true,
            [CSS.contentBehind]: true
          }, key: contentContainerKey }, defaultSlotNode),
        h("div", { class: CSS.contentBehindCenterContent }, panelTopSlotNode, panelBottomSlotNode, deprecatedCenterRowSlotNode)
      ]
      : [
        h("div", { class: CSS.content, key: contentContainerKey }, panelTopSlotNode, defaultSlotNode, panelBottomSlotNode, deprecatedCenterRowSlotNode)
      ];
    return content;
  }
  renderMain() {
    return (h("div", { class: CSS.main }, h("slot", { name: SLOTS.panelStart }), this.renderContent(), h("slot", { name: SLOTS.panelEnd })));
  }
  renderPositionedSlots() {
    return (h("div", { class: CSS.positionedSlotWrapper }, this.renderAlerts(), this.renderModals()));
  }
  render() {
    return (h(Fragment, null, this.renderHeader(), this.renderMain(), this.renderFooter(), this.renderPositionedSlots()));
  }
  get el() { return getElement(this); }
};
Shell.style = shellCss;

export { Shell as calcite_shell };
