import { r as registerInstance, e as createEvent, h, i as getElement } from './index-237c0fcb.js';
import { d as debounce } from './lodash-48790aa4.js';
import { t as toAriaBoolean } from './dom-a5def642.js';
import { u as updateHostInteraction } from './interactive-aa28fc0c.js';
import { c as createObserver } from './observers-4b8b0132.js';
import { u as updateListItemChildren, g as getListItemChildren, M as MAX_COLUMNS } from './utils-46eed2f0.js';
import { a as setUpLoadableComponent, s as setComponentLoaded, c as componentLoaded } from './loadable-31485af9.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
const CSS = {
  container: "container",
  table: "table",
  scrim: "scrim",
  tableContainer: "table-container",
  sticky: "sticky-pos"
};
const debounceTimeout = 100;

const listCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:block}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.container{position:relative}.table-container{position:relative;z-index:1;box-sizing:border-box;display:flex;inline-size:100%;flex-direction:column;background-color:transparent}.table-container *{box-sizing:border-box}.table{inline-size:100%}::slotted(calcite-list-item){margin-block-end:1px;--tw-shadow:0 1px 0 var(--calcite-ui-border-3);--tw-shadow-colored:0 1px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}::slotted(calcite-list-item:last-child){--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}.sticky-pos{position:sticky;inset-block-start:0px;z-index:300}calcite-filter{margin-block-end:1px}";

const listItemSelector = "calcite-list-item";
let List = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteListFilter = createEvent(this, "calciteListFilter", 6);
    this.listItems = [];
    this.enabledListItems = [];
    this.mutationObserver = createObserver("mutation", () => this.updateListItems());
    // --------------------------------------------------------------------------
    //
    //  Private Methods
    //
    // --------------------------------------------------------------------------
    this.handleDefaultSlotChange = (event) => {
      updateListItemChildren(getListItemChildren(event));
    };
    this.setActiveListItem = () => {
      const { enabledListItems } = this;
      if (!enabledListItems.some((item) => item.active)) {
        if (enabledListItems[0]) {
          enabledListItems[0].active = true;
        }
      }
    };
    this.updateSelectedItems = debounce(() => {
      this.selectedItems = this.enabledListItems.filter((item) => item.selected);
    }, debounceTimeout);
    this.updateFilteredItems = debounce(() => {
      const { listItems, filteredData, filterText } = this;
      const values = filteredData.map((item) => item.value);
      const groups = new Set();
      let hasSelectedMatch = false;
      const filteredItems = (listItems === null || listItems === void 0 ? void 0 : listItems.filter((item) => {
        const parent = item.parentElement;
        const grouped = parent.matches("calcite-list-item-group");
        if (grouped) {
          groups.add(parent);
        }
        const matches = filterText ? values.includes(item.value) : true;
        item.hidden = !matches;
        if (!hasSelectedMatch) {
          hasSelectedMatch = matches && item.selected;
        }
        return matches;
      })) || [];
      this.filteredItems = filteredItems;
      groups.forEach((group) => {
        const hasAtLeastOneMatch = filteredItems.some((item) => group.contains(item));
        group.hidden = !hasAtLeastOneMatch;
        if (!hasAtLeastOneMatch) {
          return;
        }
        const parentItem = group.closest("calcite-list-item");
        if (parentItem) {
          parentItem.hidden = false;
          if (filteredItems.includes(parentItem)) {
            Array.from(group.querySelectorAll("calcite-list-item")).forEach((child) => (child.hidden = false));
          }
        }
      });
      groups.clear();
    });
    this.handleFilter = (event) => {
      event.stopPropagation();
      const { filteredItems, value } = event.currentTarget;
      this.filteredData = filteredItems;
      this.filterText = value;
      this.updateFilteredItems();
      this.calciteListFilter.emit();
    };
    this.getItemData = () => {
      return this.listItems.map((item) => ({
        label: item.label,
        description: item.description,
        metadata: item.metadata,
        value: item.value
      }));
    };
    this.queryListItems = () => {
      return Array.from(this.el.querySelectorAll(listItemSelector));
    };
    this.focusRow = (focusEl) => {
      const { enabledListItems } = this;
      if (!focusEl) {
        return;
      }
      enabledListItems.forEach((listItem) => (listItem.active = listItem === focusEl));
      focusEl.setFocus();
    };
    this.isNavigable = (listItem) => {
      var _a;
      const parentListItemEl = (_a = listItem.parentElement) === null || _a === void 0 ? void 0 : _a.closest(listItemSelector);
      if (!parentListItemEl) {
        return true;
      }
      return parentListItemEl.open && this.isNavigable(parentListItemEl);
    };
    this.handleListKeydown = (event) => {
      const { key } = event;
      const filteredItems = this.enabledListItems.filter((listItem) => this.isNavigable(listItem));
      const currentIndex = filteredItems.findIndex((listItem) => listItem.active);
      if (key === "ArrowDown") {
        event.preventDefault();
        const nextIndex = currentIndex + 1;
        if (filteredItems[nextIndex]) {
          this.focusRow(filteredItems[nextIndex]);
        }
      }
      else if (key === "ArrowUp") {
        event.preventDefault();
        const prevIndex = currentIndex - 1;
        if (filteredItems[prevIndex]) {
          this.focusRow(filteredItems[prevIndex]);
        }
      }
      else if (key === "Home") {
        event.preventDefault();
        const homeItem = filteredItems[0];
        if (homeItem) {
          this.focusRow(homeItem);
        }
      }
      else if (key === "End") {
        event.preventDefault();
        const endItem = filteredItems[filteredItems.length - 1];
        if (endItem) {
          this.focusRow(endItem);
        }
      }
    };
    this.disabled = false;
    this.filterEnabled = false;
    this.filteredItems = [];
    this.filteredData = [];
    this.filterPlaceholder = undefined;
    this.filterText = undefined;
    this.label = undefined;
    this.loading = false;
    this.openable = false;
    this.selectedItems = [];
    this.selectionMode = "none";
    this.selectionAppearance = "icon";
    this.dataForFilter = [];
  }
  handleFilterEnabledChange() {
    this.updateListItems();
  }
  handleSelectionAppearanceChange() {
    this.updateListItems();
  }
  handleCalciteInternalFocusPreviousItem(event) {
    event.stopPropagation();
    const { enabledListItems } = this;
    const currentIndex = enabledListItems.findIndex((listItem) => listItem.active);
    const prevIndex = currentIndex - 1;
    if (enabledListItems[prevIndex]) {
      this.focusRow(enabledListItems[prevIndex]);
    }
  }
  handleCalciteListItemActive(event) {
    const target = event.target;
    const { listItems } = this;
    listItems.forEach((listItem) => {
      listItem.active = listItem === target;
    });
  }
  handleCalciteListItemSelect(event) {
    const target = event.target;
    const { listItems, selectionMode } = this;
    listItems.forEach((listItem) => {
      if (selectionMode === "single") {
        listItem.selected = listItem === target;
      }
    });
    this.updateSelectedItems();
  }
  handleCalciteListItemClose() {
    this.updateListItems();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
    this.updateListItems();
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentWillLoad() {
    setUpLoadableComponent(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
    const { filterEl } = this;
    const filteredItems = filterEl === null || filterEl === void 0 ? void 0 : filterEl.filteredItems;
    if (filteredItems) {
      this.filteredData = filteredItems;
    }
    this.updateFilteredItems();
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    var _a;
    await componentLoaded(this);
    (_a = this.enabledListItems.find((listItem) => listItem.active)) === null || _a === void 0 ? void 0 : _a.setFocus();
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    const { loading, label, disabled, dataForFilter, filterEnabled, filterPlaceholder, filterText } = this;
    return (h("div", { class: CSS.container }, loading ? h("calcite-scrim", { class: CSS.scrim, loading: loading }) : null, h("table", { "aria-busy": toAriaBoolean(loading), "aria-label": label || "", class: CSS.table, onKeyDown: this.handleListKeydown, role: "treegrid" }, filterEnabled ? (h("thead", null, h("tr", { class: { [CSS.sticky]: true } }, h("th", { colSpan: MAX_COLUMNS }, h("calcite-filter", { "aria-label": filterPlaceholder, disabled: loading || disabled, items: dataForFilter, onCalciteFilterChange: this.handleFilter, placeholder: filterPlaceholder, value: filterText,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.filterEl = el) }))))) : null, h("tbody", { class: CSS.tableContainer }, h("slot", { onSlotchange: this.handleDefaultSlotChange })))));
  }
  updateListItems() {
    const { selectionAppearance, selectionMode } = this;
    const items = this.queryListItems();
    items.forEach((item) => {
      item.selectionAppearance = selectionAppearance;
      item.selectionMode = selectionMode;
    });
    this.listItems = items;
    this.enabledListItems = items.filter((item) => !item.disabled && !item.closed);
    if (this.filterEnabled) {
      this.dataForFilter = this.getItemData();
    }
    this.setActiveListItem();
    this.updateSelectedItems();
    this.updateFilteredItems();
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "filterEnabled": ["handleFilterEnabledChange"],
    "selectionMode": ["handleSelectionAppearanceChange"],
    "selectionAppearance": ["handleSelectionAppearanceChange"]
  }; }
};
List.style = listCss;

export { List as calcite_list };
