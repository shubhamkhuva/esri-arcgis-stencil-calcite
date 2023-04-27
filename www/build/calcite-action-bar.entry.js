import { r as registerInstance, e as createEvent, h, j as Host, i as getElement } from './index-237c0fcb.js';
import { d as debounce } from './lodash-48790aa4.js';
import { c as connectConditionalSlotComponent, d as disconnectConditionalSlotComponent } from './conditionalSlot-15eb720d.js';
import { a as getSlotted, s as slotChangeGetAssignedElements } from './dom-a5def642.js';
import { s as setComponentLoaded, a as setUpLoadableComponent, c as componentLoaded } from './loadable-31485af9.js';
import { c as connectLocalized, d as disconnectLocalized } from './locale-aa6cf18a.js';
import { c as createObserver } from './observers-4b8b0132.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-061592dc.js';
import { t as toggleChildActionText, q as queryActions, g as geActionDimensions, a as getOverflowCount, o as overflowActions, b as overflowActionsDebounceInMs, E as ExpandToggle } from './ExpandToggle-59477667.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';
import './key-e4bfd54e.js';
import './resources-8c669bbf.js';
import './resources-9c867b39.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
const CSS = {
  actionGroupBottom: "action-group--bottom"
};
const SLOTS = {
  bottomActions: "bottom-actions",
  expandTooltip: "expand-tooltip"
};

const actionBarCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{box-sizing:border-box;background-color:var(--calcite-ui-foreground-1);color:var(--calcite-ui-text-2);font-size:var(--calcite-font-size--1)}:host *{box-sizing:border-box}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{pointer-events:auto;display:inline-flex;align-self:stretch;background:transparent;--calcite-action-bar-expanded-max-width:auto}:host([layout=vertical]){flex-direction:column}:host([layout=horizontal]){flex-direction:row}:host([layout=vertical][overflow-actions-disabled]){overflow-y:auto}:host([layout=horizontal][overflow-actions-disabled]){overflow-x:auto}:host([layout=vertical][expanded]){max-inline-size:var(--calcite-action-bar-expanded-max-width)}::slotted(calcite-action-group){border-width:0px;border-block-end-width:1px;border-style:solid;border-color:var(--calcite-ui-border-3)}:host([layout=horizontal]) ::slotted(calcite-action-group){border-width:0px;border-inline-end-width:1px;border-style:solid}::slotted(calcite-action-group:last-child){border-block-end-width:0px;border-inline-end-width:0px}.action-group--bottom{flex-grow:1;justify-content:flex-end;padding-block-end:0px;padding-inline-end:0px}";

let ActionBar = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteActionBarToggle = createEvent(this, "calciteActionBarToggle", 6);
    this.mutationObserver = createObserver("mutation", () => {
      const { el, expanded } = this;
      toggleChildActionText({ parent: el, expanded });
      this.conditionallyOverflowActions();
    });
    this.resizeObserver = createObserver("resize", (entries) => this.resizeHandlerEntries(entries));
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.actionMenuOpenHandler = (event) => {
      if (event.target.menuOpen) {
        const composedPath = event.composedPath();
        Array.from(this.el.querySelectorAll("calcite-action-group")).forEach((group) => {
          if (!composedPath.includes(group)) {
            group.menuOpen = false;
          }
        });
      }
    };
    this.resizeHandlerEntries = (entries) => {
      entries.forEach(this.resizeHandler);
    };
    this.resizeHandler = (entry) => {
      const { width, height } = entry.contentRect;
      this.resize({ width, height });
    };
    this.resize = debounce(({ width, height }) => {
      const { el, expanded, expandDisabled, layout } = this;
      if ((layout === "vertical" && !height) || (layout === "horizontal" && !width)) {
        return;
      }
      const actions = queryActions(el);
      const actionCount = expandDisabled ? actions.length : actions.length + 1;
      const actionGroups = Array.from(el.querySelectorAll("calcite-action-group"));
      this.setGroupLayout(actionGroups);
      const groupCount = getSlotted(el, SLOTS.bottomActions) || !expandDisabled
        ? actionGroups.length + 1
        : actionGroups.length;
      const { actionHeight, actionWidth } = geActionDimensions(actions);
      const overflowCount = getOverflowCount({
        layout,
        actionCount,
        actionHeight,
        actionWidth,
        height,
        width,
        groupCount
      });
      overflowActions({
        actionGroups,
        expanded,
        overflowCount
      });
    }, overflowActionsDebounceInMs);
    this.conditionallyOverflowActions = () => {
      if (!this.overflowActionsDisabled) {
        this.overflowActions();
      }
    };
    this.toggleExpand = () => {
      this.expanded = !this.expanded;
      this.calciteActionBarToggle.emit();
    };
    this.setExpandToggleRef = (el) => {
      this.expandToggleEl = el;
    };
    this.handleDefaultSlotChange = (event) => {
      const groups = slotChangeGetAssignedElements(event).filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-action-group"));
      this.setGroupLayout(groups);
    };
    this.expandDisabled = false;
    this.expanded = false;
    this.layout = "vertical";
    this.overflowActionsDisabled = false;
    this.position = undefined;
    this.scale = undefined;
    this.messages = undefined;
    this.messageOverrides = undefined;
    this.effectiveLocale = undefined;
    this.defaultMessages = undefined;
  }
  expandHandler() {
    this.conditionallyOverflowActions();
  }
  expandedHandler(expanded) {
    toggleChildActionText({ parent: this.el, expanded });
    this.conditionallyOverflowActions();
  }
  layoutHandler() {
    this.updateGroups();
  }
  overflowDisabledHandler(overflowActionsDisabled) {
    overflowActionsDisabled
      ? this.resizeObserver.disconnect()
      : this.resizeObserver.observe(this.el);
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  componentDidLoad() {
    setComponentLoaded(this);
    this.conditionallyOverflowActions();
  }
  connectedCallback() {
    var _a, _b;
    const { el, expanded } = this;
    connectLocalized(this);
    connectMessages(this);
    toggleChildActionText({ parent: el, expanded });
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(el, { childList: true, subtree: true });
    if (!this.overflowActionsDisabled) {
      (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.observe(el);
    }
    this.conditionallyOverflowActions();
    connectConditionalSlotComponent(this);
  }
  async componentWillLoad() {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }
  disconnectedCallback() {
    var _a, _b;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
    (_b = this.resizeObserver) === null || _b === void 0 ? void 0 : _b.disconnect();
    disconnectConditionalSlotComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Overflows actions that won't fit into menus.
   *
   * @internal
   */
  async overflowActions() {
    this.resize({ width: this.el.clientWidth, height: this.el.clientHeight });
  }
  /**
   * Sets focus on the component's first focusable element.
   */
  async setFocus() {
    var _a;
    await componentLoaded(this);
    (_a = this.el) === null || _a === void 0 ? void 0 : _a.focus();
  }
  updateGroups() {
    this.setGroupLayout(Array.from(this.el.querySelectorAll("calcite-action-group")));
  }
  setGroupLayout(groups) {
    groups.forEach((group) => (group.layout = this.layout));
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  renderBottomActionGroup() {
    const { expanded, expandDisabled, el, position, toggleExpand, scale, layout, messages } = this;
    const tooltip = getSlotted(el, SLOTS.expandTooltip);
    const expandToggleNode = !expandDisabled ? (h(ExpandToggle, { el: el, expanded: expanded, intlCollapse: messages.collapse, intlExpand: messages.expand, position: position, scale: scale, toggle: toggleExpand, tooltip: tooltip,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setExpandToggleRef })) : null;
    return getSlotted(el, SLOTS.bottomActions) || expandToggleNode ? (h("calcite-action-group", { class: CSS.actionGroupBottom, layout: layout, scale: scale }, h("slot", { name: SLOTS.bottomActions }), h("slot", { name: SLOTS.expandTooltip }), expandToggleNode)) : null;
  }
  render() {
    return (h(Host, { onCalciteActionMenuOpen: this.actionMenuOpenHandler }, h("slot", { onSlotchange: this.handleDefaultSlotChange }), this.renderBottomActionGroup()));
  }
  static get delegatesFocus() { return true; }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "expandDisabled": ["expandHandler"],
    "expanded": ["expandedHandler"],
    "layout": ["layoutHandler"],
    "overflowActionsDisabled": ["overflowDisabledHandler"],
    "messageOverrides": ["onMessagesChange"],
    "effectiveLocale": ["effectiveLocaleChange"]
  }; }
};
ActionBar.style = actionBarCss;

export { ActionBar as calcite_action_bar };
