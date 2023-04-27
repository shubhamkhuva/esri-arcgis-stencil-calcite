import { r as registerInstance, h, f as forceUpdate, i as getElement } from './index-237c0fcb.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-15eb720d.js';
import { b as getElementDir, j as isPrimaryPointerButton, s as slotChangeGetAssignedElements, a as getSlotted } from './dom-a5def642.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-aa6cf18a.js';
import { c as clamp } from './math-14fe26f7.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages, u as updateMessages } from './t9n-061592dc.js';
import './observers-4b8b0132.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';
import './key-e4bfd54e.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
const CSS = {
  container: "container",
  content: "content",
  contentHeader: "content__header",
  contentBody: "content__body",
  contentDetached: "content--detached",
  separator: "separator"
};
const SLOTS = {
  actionBar: "action-bar",
  header: "header"
};

const shellPanelCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{pointer-events:none;position:relative;display:flex;flex:0 1 auto;align-items:stretch;--calcite-shell-panel-detached-max-height:unset;z-index:var(--calcite-shell-panel-z-index, 1)}:host([layout=vertical]){z-index:var(--calcite-shell-panel-z-index, calc(1 + 1))}:host([layout=horizontal]) .content{--calcite-shell-panel-height-internal:var(--calcite-shell-panel-height, 20vh);--calcite-shell-panel-max-height-internal:var(--calcite-shell-panel-max-height, 420px);--calcite-shell-panel-min-height-internal:var(--calcite-shell-panel-min-height, 240px)}:host([layout=vertical][width-scale=s]) .content{--calcite-shell-panel-width-internal:var(--calcite-shell-panel-width, 12vw);--calcite-shell-panel-max-width-internal:var(--calcite-shell-panel-max-width, 300px);--calcite-shell-panel-min-width-internal:var(--calcite-shell-panel-min-width, 150px)}:host([layout=vertical][width-scale=m]) .content{--calcite-shell-panel-width-internal:var(--calcite-shell-panel-width, 20vw);--calcite-shell-panel-max-width-internal:var(--calcite-shell-panel-max-width, 420px);--calcite-shell-panel-min-width-internal:var(--calcite-shell-panel-min-width, 240px)}:host([layout=vertical][width-scale=l]) .content{--calcite-shell-panel-width-internal:var(--calcite-shell-panel-width, 45vw);--calcite-shell-panel-max-width-internal:var(--calcite-shell-panel-max-width, 680px);--calcite-shell-panel-min-width-internal:var(--calcite-shell-panel-min-width, 340px)}:host([detached-height-scale=s]) .content--detached{--calcite-shell-panel-detached-max-height-internal:var(--calcite-shell-panel-detached-max-height, 40vh)}:host([detached-height-scale=m]) .content--detached{--calcite-shell-panel-detached-max-height-internal:var(--calcite-shell-panel-detached-max-height, 60vh)}:host([detached-height-scale=l]) .content--detached{--calcite-shell-panel-detached-max-height-internal:var(--calcite-shell-panel-detached-max-height, 80vh)}.container{pointer-events:none;box-sizing:border-box;display:flex;flex:1 1 auto;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);color:var(--calcite-ui-text-2)}.container *{box-sizing:border-box}:host([layout=horizontal]) .container{flex-direction:column}:host(:hover) .separator:not(:hover):not(:focus),:host(:focus-within) .separator:not(:hover):not(:focus){opacity:1;background-color:var(--calcite-ui-border-3)}.separator{pointer-events:auto;position:absolute;display:flex;background-color:transparent;opacity:0;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;cursor:col-resize;outline:none}.separator:hover{opacity:1;background-color:var(--calcite-ui-border-2)}.separator:focus{background-color:var(--calcite-ui-brand);opacity:1}:host([layout=vertical]) .separator{inset-block:0px;block-size:100%;inline-size:0.125rem;cursor:col-resize}:host([layout=horizontal][position=start]) .separator{inset-block-end:0px}:host([layout=horizontal][position=end]) .separator{inset-block-start:0px}:host([layout=horizontal]) .separator{inset-inline-end:0px;block-size:0.125rem;inline-size:100%;cursor:row-resize}:host([layout=vertical][position=start]) .separator{inset-inline-end:-2px}:host([layout=horizontal][position=start]) .separator{inset-block-end:-2px}:host([layout=vertical][position=end]) .separator{inset-inline-start:-2px}:host([layout=horizontal][position=end]) .separator{inset-block-start:-2px}::slotted(calcite-panel),::slotted(calcite-flow){block-size:100%;inline-size:100%;flex:1 1 auto;max-block-size:unset;max-inline-size:unset}::slotted(.calcite-match-height){display:flex;flex:1 1 auto;overflow:hidden}.content{pointer-events:auto;display:flex;flex-direction:column;flex-wrap:nowrap;align-items:stretch;align-self:stretch;background-color:var(--calcite-ui-background);padding:0px;transition:max-block-size var(--calcite-animation-timing), max-inline-size var(--calcite-animation-timing)}:host([layout=vertical]) .content{inline-size:var(--calcite-shell-panel-width-internal);max-inline-size:var(--calcite-shell-panel-max-width-internal);min-inline-size:var(--calcite-shell-panel-min-width-internal)}:host([layout=horizontal]) .content{block-size:var(--calcite-shell-panel-height-internal);max-block-size:var(--calcite-shell-panel-max-height-internal);min-block-size:var(--calcite-shell-panel-min-height-internal)}.content__header{display:flex;flex:0 1 auto;flex-direction:column;flex-wrap:nowrap;align-items:stretch}.content__body{display:flex;flex:1 1 auto;flex-direction:column;overflow:hidden}.content--detached{margin-inline:0.5rem;margin-block:0.5rem auto;block-size:auto;overflow:hidden;border-radius:0.25rem;--tw-shadow:0 4px 8px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -1px rgba(0, 0, 0, 0.04);--tw-shadow-colored:0 4px 8px -1px var(--tw-shadow-color), 0 2px 4px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);max-block-size:var(--calcite-shell-panel-detached-max-height-internal)}.content--detached ::slotted(calcite-panel),.content--detached ::slotted(calcite-flow){max-block-size:unset}:host([position=start]) .content--detached ::slotted(calcite-panel),:host([position=start]) .content--detached ::slotted(calcite-flow),:host([position=end]) .content--detached ::slotted(calcite-panel),:host([position=end]) .content--detached ::slotted(calcite-flow){border-style:none}.content[hidden]{display:none}slot[name=action-bar]::slotted(calcite-action-bar),.content ::slotted(calcite-flow),.content ::slotted(calcite-panel:not([closed])){border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}:host([position=start]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=start]) .content ::slotted(calcite-flow),:host([position=start]) .content ::slotted(calcite-panel){border-inline-start:none}:host([position=end]) slot[name=action-bar]::slotted(calcite-action-bar),:host([position=end]) .content ::slotted(calcite-flow),:host([position=end]) .content ::slotted(calcite-panel){border-inline-end:none}:host([layout=horizontal]) slot[name=action-bar]::slotted(calcite-action-bar){border-inline:0}:host([layout=horizontal][position=start]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=start]) .content ::slotted(calcite-panel){border-inline:0;border-block-start:0}:host([layout=horizontal][position=end]) .content ::slotted(calcite-flow),:host([layout=horizontal][position=end]) .content ::slotted(calcite-panel){border-inline:0;border-block-end:0}";

let ShellPanel = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.initialContentWidth = null;
    this.initialContentHeight = null;
    this.initialClientX = null;
    this.initialClientY = null;
    this.contentWidthMax = null;
    this.contentWidthMin = null;
    this.contentHeightMax = null;
    this.contentHeightMin = null;
    this.step = 1;
    this.stepMultiplier = 10;
    this.actionBars = [];
    this.storeContentEl = (contentEl) => {
      this.contentEl = contentEl;
    };
    this.getKeyAdjustedSize = (event) => {
      const { key } = event;
      const { el, step, stepMultiplier, layout, contentWidthMin, contentWidthMax, initialContentWidth, initialContentHeight, contentHeightMin, contentHeightMax, position } = this;
      const multipliedStep = step * stepMultiplier;
      const MOVEMENT_KEYS = [
        "ArrowUp",
        "ArrowDown",
        "ArrowLeft",
        "ArrowRight",
        "Home",
        "End",
        "PageUp",
        "PageDown"
      ];
      if (MOVEMENT_KEYS.indexOf(key) > -1) {
        event.preventDefault();
      }
      const dir = getElementDir(el);
      const horizontalKeys = ["ArrowLeft", "ArrowRight"];
      const verticalKeys = ["ArrowDown", "ArrowUp"];
      const directionFactor = dir === "rtl" && horizontalKeys.includes(key) ? -1 : 1;
      const increaseKeys = layout === "horizontal"
        ? position === "end"
          ? key === verticalKeys[1] || key === horizontalKeys[0]
          : key === verticalKeys[0] || key === horizontalKeys[1]
        : key === verticalKeys[1] ||
          (position === "end" ? key === horizontalKeys[0] : key === horizontalKeys[1]);
      if (increaseKeys) {
        const stepValue = event.shiftKey ? multipliedStep : step;
        return layout === "horizontal"
          ? initialContentHeight + directionFactor * stepValue
          : initialContentWidth + directionFactor * stepValue;
      }
      const decreaseKeys = layout === "horizontal"
        ? position === "end"
          ? key === verticalKeys[0] || key === horizontalKeys[0]
          : key === verticalKeys[1] || key === horizontalKeys[1]
        : key === verticalKeys[0] ||
          (position === "end" ? key === horizontalKeys[1] : key === horizontalKeys[0]);
      if (decreaseKeys) {
        const stepValue = event.shiftKey ? multipliedStep : step;
        return layout === "horizontal"
          ? initialContentHeight - directionFactor * stepValue
          : initialContentWidth - directionFactor * stepValue;
      }
      if (key === "Home" && layout === "horizontal" && typeof contentHeightMin === "number") {
        return contentHeightMin;
      }
      if (key === "Home" && layout === "vertical" && typeof contentWidthMin === "number") {
        return contentWidthMin;
      }
      if (key === "End" && layout === "horizontal" && typeof contentHeightMax === "number") {
        return contentHeightMax;
      }
      if (key === "End" && layout === "vertical" && typeof contentWidthMax === "number") {
        return contentWidthMax;
      }
      if (key === "PageDown") {
        return layout === "horizontal"
          ? initialContentHeight - multipliedStep
          : initialContentWidth - multipliedStep;
      }
      if (key === "PageUp") {
        return layout === "horizontal"
          ? initialContentHeight + multipliedStep
          : initialContentWidth + multipliedStep;
      }
      return null;
    };
    this.initialKeydownWidth = (event) => {
      this.setInitialContentWidth();
      const width = this.getKeyAdjustedSize(event);
      if (typeof width === "number") {
        this.setContentWidth(width);
      }
    };
    this.initialKeydownHeight = (event) => {
      this.setInitialContentHeight();
      const height = this.getKeyAdjustedSize(event);
      if (typeof height === "number") {
        this.setContentHeight(height);
      }
    };
    this.separatorKeyDown = (event) => {
      this.layout === "horizontal"
        ? this.initialKeydownHeight(event)
        : this.initialKeydownWidth(event);
    };
    this.separatorPointerMove = (event) => {
      event.preventDefault();
      const { el, layout, initialContentWidth, initialContentHeight, position, initialClientX, initialClientY } = this;
      const offset = layout === "horizontal" ? event.clientY - initialClientY : event.clientX - initialClientX;
      const adjustmentDirection = layout === "vertical" && getElementDir(el) === "rtl" ? -1 : 1;
      const adjustedOffset = layout === "horizontal"
        ? position === "end"
          ? -adjustmentDirection * offset
          : adjustmentDirection * offset
        : position === "end"
          ? -adjustmentDirection * offset
          : adjustmentDirection * offset;
      layout === "horizontal"
        ? this.setContentHeight(initialContentHeight + adjustedOffset)
        : this.setContentWidth(initialContentWidth + adjustedOffset);
    };
    this.separatorPointerUp = (event) => {
      if (!isPrimaryPointerButton(event)) {
        return;
      }
      event.preventDefault();
      document.removeEventListener("pointerup", this.separatorPointerUp);
      document.removeEventListener("pointermove", this.separatorPointerMove);
    };
    this.setInitialContentHeight = () => {
      var _a;
      this.initialContentHeight = (_a = this.contentEl) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().height;
    };
    this.setInitialContentWidth = () => {
      var _a;
      this.initialContentWidth = (_a = this.contentEl) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width;
    };
    this.separatorPointerDown = (event) => {
      if (!isPrimaryPointerButton(event)) {
        return;
      }
      event.preventDefault();
      const { separatorEl } = this;
      separatorEl && document.activeElement !== separatorEl && separatorEl.focus();
      if (this.layout === "horizontal") {
        this.setInitialContentHeight();
        this.initialClientY = event.clientY;
      }
      else {
        this.setInitialContentWidth();
        this.initialClientX = event.clientX;
      }
      document.addEventListener("pointerup", this.separatorPointerUp);
      document.addEventListener("pointermove", this.separatorPointerMove);
    };
    this.connectSeparator = (separatorEl) => {
      this.disconnectSeparator();
      this.separatorEl = separatorEl;
      separatorEl.addEventListener("pointerdown", this.separatorPointerDown);
    };
    this.disconnectSeparator = () => {
      var _a;
      (_a = this.separatorEl) === null || _a === void 0 ? void 0 : _a.removeEventListener("pointerdown", this.separatorPointerDown);
    };
    this.setActionBarsLayout = (actionBars) => {
      actionBars.forEach((actionBar) => (actionBar.layout = this.layout));
    };
    this.handleActionBarSlotChange = (event) => {
      const actionBars = slotChangeGetAssignedElements(event).filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-action-bar"));
      this.actionBars = actionBars;
      this.setActionBarsLayout(actionBars);
    };
    this.collapsed = false;
    this.detached = false;
    this.detachedHeightScale = "l";
    this.widthScale = "m";
    this.layout = "vertical";
    this.position = undefined;
    this.resizable = false;
    this.messages = undefined;
    this.messageOverrides = undefined;
    this.contentWidth = null;
    this.contentHeight = null;
    this.defaultMessages = undefined;
    this.effectiveLocale = "";
  }
  layoutHandler() {
    this.setActionBarsLayout(this.actionBars);
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    connectConditionalSlotComponent(this);
    connectLocalized(this);
    connectMessages(this);
  }
  async componentWillLoad() {
    await setUpMessages(this);
  }
  disconnectedCallback() {
    disconnectConditionalSlotComponent(this);
    this.disconnectSeparator();
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  componentDidLoad() {
    this.updateAriaValues();
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderHeader() {
    const { el } = this;
    const hasHeader = getSlotted(el, SLOTS.header);
    return hasHeader ? (h("div", { class: CSS.contentHeader, key: "header" }, h("slot", { name: SLOTS.header }))) : null;
  }
  render() {
    const { collapsed, detached, position, initialContentWidth, initialContentHeight, contentWidth, contentWidthMax, contentWidthMin, contentHeight, contentHeightMax, contentHeightMin, resizable, layout } = this;
    const allowResizing = !detached && resizable;
    const style = allowResizing
      ? layout === "horizontal"
        ? contentHeight
          ? { height: `${contentHeight}px` }
          : null
        : contentWidth
          ? { width: `${contentWidth}px` }
          : null
      : null;
    const contentNode = (h("div", { class: { [CSS.content]: true, [CSS.contentDetached]: detached }, hidden: collapsed, key: "content", style: style,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.storeContentEl }, this.renderHeader(), h("div", { class: CSS.contentBody }, h("slot", null))));
    const separatorNode = allowResizing ? (h("div", { "aria-label": this.messages.resize, "aria-orientation": layout === "horizontal" ? "vertical" : "horizontal", "aria-valuemax": layout == "horizontal" ? contentHeightMax : contentWidthMax, "aria-valuemin": layout == "horizontal" ? contentHeightMin : contentWidthMin, "aria-valuenow": layout == "horizontal"
        ? contentHeight !== null && contentHeight !== void 0 ? contentHeight : initialContentHeight
        : contentWidth !== null && contentWidth !== void 0 ? contentWidth : initialContentWidth, class: CSS.separator, key: "separator", onKeyDown: this.separatorKeyDown, role: "separator", tabIndex: 0, "touch-action": "none",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.connectSeparator })) : null;
    const actionBarNode = (h("slot", { key: "action-bar", name: SLOTS.actionBar, onSlotchange: this.handleActionBarSlotChange }));
    const mainNodes = [actionBarNode, contentNode, separatorNode];
    if (position === "end") {
      mainNodes.reverse();
    }
    return h("div", { class: { [CSS.container]: true } }, mainNodes);
  }
  // --------------------------------------------------------------------------
  //
  //  private Methods
  //
  // --------------------------------------------------------------------------
  setContentWidth(width) {
    const { contentWidthMax, contentWidthMin } = this;
    const roundedWidth = Math.round(width);
    this.contentWidth =
      typeof contentWidthMax === "number" && typeof contentWidthMin === "number"
        ? clamp(roundedWidth, contentWidthMin, contentWidthMax)
        : roundedWidth;
  }
  updateAriaValues() {
    const { contentEl } = this;
    const computedStyle = contentEl && getComputedStyle(contentEl);
    if (!computedStyle) {
      return;
    }
    this.layout === "horizontal"
      ? this.updateHeights(computedStyle)
      : this.updateWidths(computedStyle);
    forceUpdate(this);
  }
  setContentHeight(height) {
    const { contentHeightMax, contentHeightMin } = this;
    const roundedWidth = Math.round(height);
    this.contentHeight =
      typeof contentHeightMax === "number" && typeof contentHeightMin === "number"
        ? clamp(roundedWidth, contentHeightMin, contentHeightMax)
        : roundedWidth;
  }
  updateWidths(computedStyle) {
    const max = parseInt(computedStyle.getPropertyValue("max-width"), 10);
    const min = parseInt(computedStyle.getPropertyValue("min-width"), 10);
    const valueNow = parseInt(computedStyle.getPropertyValue("width"), 10);
    if (typeof valueNow === "number" && !isNaN(valueNow)) {
      this.initialContentWidth = valueNow;
    }
    if (typeof max === "number" && !isNaN(max)) {
      this.contentWidthMax = max;
    }
    if (typeof min === "number" && !isNaN(min)) {
      this.contentWidthMin = min;
    }
  }
  updateHeights(computedStyle) {
    const max = parseInt(computedStyle.getPropertyValue("max-height"), 10);
    const min = parseInt(computedStyle.getPropertyValue("min-height"), 10);
    const valueNow = parseInt(computedStyle.getPropertyValue("height"), 10);
    if (typeof valueNow === "number" && !isNaN(valueNow)) {
      this.initialContentHeight = valueNow;
    }
    if (typeof max === "number" && !isNaN(max)) {
      this.contentHeightMax = max;
    }
    if (typeof min === "number" && !isNaN(min)) {
      this.contentHeightMin = min;
    }
  }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "layout": ["layoutHandler"],
    "messageOverrides": ["onMessagesChange"],
    "effectiveLocale": ["effectiveLocaleChange"]
  }; }
};
ShellPanel.style = shellPanelCss;

export { ShellPanel as calcite_shell_panel };
