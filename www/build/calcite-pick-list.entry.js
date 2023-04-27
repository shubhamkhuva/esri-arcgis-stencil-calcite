import { r as registerInstance, e as createEvent, h, i as getElement } from './index-237c0fcb.js';
import { u as updateHostInteraction } from './interactive-aa28fc0c.js';
import { a as setUpLoadableComponent, s as setComponentLoaded, c as componentLoaded } from './loadable-31485af9.js';
import { c as createObserver } from './observers-4b8b0132.js';
import { I as ICON_TYPES } from './resources-03a3e7b3.js';
import { m as mutationObserverCallback, d as deselectRemovedItems, a as deselectSiblingItems, s as selectSiblings, h as handleFilter, b as handleFilterEvent, g as getItemData, k as keyDownHandler, i as initialize, c as initializeObserver, e as cleanUpObserver, f as handleInitialFilter, r as removeItem, j as calciteListItemChangeHandler, l as calciteInternalListItemValueChangeHandler, n as calciteListFocusOutHandler, o as setUpItems, p as setFocus, L as List } from './shared-list-render-8ed43137.js';
import './lodash-48790aa4.js';
import './array-93eb0272.js';
import './dom-a5def642.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';
import './resources-d7c6fa13.js';

const pickListCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;box-sizing:border-box;display:flex;flex-shrink:0;flex-grow:1;flex-direction:column;align-items:stretch;background-color:transparent;font-size:var(--calcite-font-size--1);line-height:1rem;color:var(--calcite-ui-text-2)}:host *{box-sizing:border-box}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}:host([filter-enabled]) header{margin-block-end:0.25rem;display:flex;align-items:stretch;justify-content:flex-end;background-color:var(--calcite-ui-foreground-1);--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host([filter-enabled]) header.sticky-pos{position:sticky;inset-block-start:0px;z-index:1}calcite-filter{margin-block-end:0px}:host([loading][disabled]){min-block-size:2rem}";

let PickList = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteListChange = createEvent(this, "calciteListChange", 6);
    this.calciteListFilter = createEvent(this, "calciteListFilter", 6);
    this.lastSelectedItem = null;
    this.mutationObserver = createObserver("mutation", mutationObserverCallback.bind(this));
    this.setFilterEl = (el) => {
      this.filterEl = el;
    };
    this.setFilteredItems = (filteredItems) => {
      this.filteredItems = filteredItems;
    };
    this.deselectRemovedItems = deselectRemovedItems.bind(this);
    this.deselectSiblingItems = deselectSiblingItems.bind(this);
    this.selectSiblings = selectSiblings.bind(this);
    this.handleFilter = handleFilter.bind(this);
    this.handleFilterEvent = handleFilterEvent.bind(this);
    this.getItemData = getItemData.bind(this);
    this.keyDownHandler = keyDownHandler.bind(this);
    this.disabled = false;
    this.filteredItems = [];
    this.filteredData = [];
    this.filterEnabled = false;
    this.filterPlaceholder = undefined;
    this.filterText = undefined;
    this.headingLevel = undefined;
    this.loading = false;
    this.multiple = false;
    this.selectionFollowsFocus = false;
    this.selectedValues = new Map();
    this.dataForFilter = [];
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    initialize.call(this);
    initializeObserver.call(this);
  }
  disconnectedCallback() {
    cleanUpObserver.call(this);
  }
  componentWillLoad() {
    setUpLoadableComponent(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
    handleInitialFilter.call(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  calciteListItemRemoveHandler(event) {
    removeItem.call(this, event);
  }
  calciteListItemChangeHandler(event) {
    calciteListItemChangeHandler.call(this, event);
  }
  calciteInternalListItemPropsChangeHandler(event) {
    event.stopPropagation();
    this.setUpFilter();
  }
  calciteInternalListItemValueChangeHandler(event) {
    calciteInternalListItemValueChangeHandler.call(this, event);
    event.stopPropagation();
  }
  calciteListFocusOutHandler(event) {
    calciteListFocusOutHandler.call(this, event);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  setUpItems() {
    setUpItems.call(this, "calcite-pick-list-item");
  }
  setUpFilter() {
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Returns the component's selected `calcite-pick-list-item`s. */
  async getSelectedItems() {
    return this.selectedValues;
  }
  /**
   * Sets focus on the component's first focusable element.
   *
   * @param focusId
   */
  async setFocus(focusId) {
    await componentLoaded(this);
    return setFocus.call(this, focusId);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  getIconType() {
    return this.multiple ? ICON_TYPES.square : ICON_TYPES.circle;
  }
  render() {
    return h(List, { onKeyDown: this.keyDownHandler, props: this });
  }
  get el() { return getElement(this); }
};
PickList.style = pickListCss;

export { PickList as calcite_pick_list };
