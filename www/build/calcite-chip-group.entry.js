import { r as registerInstance, e as createEvent, h, i as getElement } from './index-237c0fcb.js';
import { i as focusElementInGroup, t as toAriaBoolean } from './dom-a5def642.js';
import { u as updateHostInteraction } from './interactive-aa28fc0c.js';
import { c as createObserver } from './observers-4b8b0132.js';
import { s as setComponentLoaded, a as setUpLoadableComponent, c as componentLoaded } from './loadable-31485af9.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';

const chipGroupCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{display:flex}.container{display:flex;inline-size:100%;flex-wrap:wrap;gap:0.5rem}::slotted(calcite-chip){flex:none}:host([scale=s]) .container{gap:0.25rem}:host([scale=l]) .container{gap:0.75rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}";

let ChipGroup = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteChipGroupSelect = createEvent(this, "calciteChipGroupSelect", 6);
    //--------------------------------------------------------------------------
    //
    //  Private Properties
    //
    //--------------------------------------------------------------------------
    this.mutationObserver = createObserver("mutation", () => this.updateItems());
    this.items = [];
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.updateItems = (event) => {
      const target = event ? event.target : this.slotRefEl;
      this.items = target
        .assignedElements({ flatten: true })
        .filter((el) => el === null || el === void 0 ? void 0 : el.matches("calcite-chip"));
      this.items.forEach((el) => {
        el.interactive = true;
        el.scale = this.scale;
        el.selectionMode = this.selectionMode;
      });
      this.setSelectedItems(false);
    };
    this.setSelectedItems = (emit, elToMatch) => {
      if (elToMatch) {
        this.items.forEach((el) => {
          const matchingEl = elToMatch === el;
          switch (this.selectionMode) {
            case "multiple":
              if (matchingEl) {
                el.selected = !el.selected;
              }
              break;
            case "single":
              el.selected = matchingEl ? !el.selected : false;
              break;
            case "single-persist":
              el.selected = !!matchingEl;
              break;
          }
        });
      }
      this.selectedItems = this.items.filter((el) => el.selected);
      if (emit) {
        this.calciteChipGroupSelect.emit();
      }
    };
    this.disabled = false;
    this.label = undefined;
    this.scale = "m";
    this.selectionMode = "none";
    this.selectedItems = [];
  }
  onSelectionModeChange() {
    this.updateItems();
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, { childList: true, subtree: true });
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  async componentWillLoad() {
    setUpLoadableComponent(this);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteInternalChipKeyEventListener(event) {
    if (event.composedPath().includes(this.el)) {
      const interactiveItems = this.items.filter((el) => !el.disabled);
      switch (event.detail.key) {
        case "ArrowRight":
          focusElementInGroup(interactiveItems, event.detail.target, "next");
          break;
        case "ArrowLeft":
          focusElementInGroup(interactiveItems, event.detail.target, "previous");
          break;
        case "Home":
          focusElementInGroup(interactiveItems, event.detail.target, "first");
          break;
        case "End":
          focusElementInGroup(interactiveItems, event.detail.target, "last");
          break;
      }
    }
  }
  calciteChipCloseListener(event) {
    const item = event.target;
    if (this.items.includes(item)) {
      if (this.items.indexOf(item) > 0) {
        focusElementInGroup(this.items, item, "previous");
      }
      else if (this.items.indexOf(item) === 0) {
        focusElementInGroup(this.items, item, "next");
      }
      else {
        focusElementInGroup(this.items, item, "first");
      }
    }
    this.items = this.items.filter((el) => el !== item);
  }
  calciteChipSelectListener(event) {
    if (event.composedPath().includes(this.el)) {
      this.setSelectedItems(true, event.target);
    }
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /**
   * Sets focus on the component's first focusable element.
   */
  async setFocus() {
    var _a;
    await componentLoaded(this);
    if (!this.disabled) {
      (_a = (this.selectedItems[0] || this.items[0])) === null || _a === void 0 ? void 0 : _a.setFocus();
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    const role = this.selectionMode === "none" || this.selectionMode === "multiple" ? "group" : "radiogroup";
    return (h("div", { "aria-disabled": toAriaBoolean(this.disabled), "aria-label": this.label, class: "container", role: role }, h("slot", { onSlotchange: this.updateItems, ref: (el) => (this.slotRefEl = el) })));
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "selectionMode": ["onSelectionModeChange"]
  }; }
};
ChipGroup.style = chipGroupCss;

export { ChipGroup as calcite_chip_group };
