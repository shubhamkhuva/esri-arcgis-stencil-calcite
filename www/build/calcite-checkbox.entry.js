import { r as registerInstance, e as createEvent, h, j as Host, i as getElement } from './index-237c0fcb.js';
import { t as toAriaBoolean } from './dom-a5def642.js';
import { c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-9987abc3.js';
import { g as guid } from './guid-24e0b9e6.js';
import { u as updateHostInteraction } from './interactive-aa28fc0c.js';
import { i as isActivationKey } from './key-e4bfd54e.js';
import { c as connectLabel, d as disconnectLabel, g as getLabelText } from './label-378e8541.js';
import { c as componentLoaded, a as setUpLoadableComponent, s as setComponentLoaded } from './loadable-31485af9.js';
import './resources-96bbaa96.js';

const checkboxCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host([scale=s]){--calcite-checkbox-size:0.75rem}:host([scale=m]){--calcite-checkbox-size:var(--calcite-font-size--1)}:host([scale=l]){--calcite-checkbox-size:1rem}:host{position:relative;display:inline-flex;cursor:pointer;-webkit-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}:host .check-svg,:host .toggle{inline-size:var(--calcite-checkbox-size);block-size:var(--calcite-checkbox-size)}:host .check-svg{pointer-events:none;box-sizing:border-box;display:block;overflow:hidden;background-color:var(--calcite-ui-foreground-1);fill:currentColor;stroke:currentColor;stroke-width:1;transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s;box-shadow:inset 0 0 0 1px var(--calcite-ui-border-input);color:var(--calcite-ui-background)}:host([checked]) .check-svg,:host([indeterminate]) .check-svg{background-color:var(--calcite-ui-brand);box-shadow:inset 0 0 0 1px var(--calcite-ui-brand)}:host([hovered]) .toggle .check-svg,:host .toggle:hover .check-svg{box-shadow:inset 0 0 0 2px var(--calcite-ui-brand)}.toggle{outline-color:transparent}.toggle:active,.toggle:focus,.toggle:focus-visible{outline:2px solid var(--calcite-ui-focus-color);outline-offset:calc(\n            2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-ui-focus-offset-invert),\n                1\n              )\n            )\n          )}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

let Checkbox = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInternalCheckboxBlur = createEvent(this, "calciteInternalCheckboxBlur", 6);
    this.calciteCheckboxChange = createEvent(this, "calciteCheckboxChange", 6);
    this.calciteInternalCheckboxFocus = createEvent(this, "calciteInternalCheckboxFocus", 6);
    //--------------------------------------------------------------------------
    //
    //  Private Properties
    //
    //--------------------------------------------------------------------------
    this.checkedPath = "M5.5 12L2 8.689l.637-.636L5.5 10.727l8.022-7.87.637.637z";
    this.indeterminatePath = "M13 8v1H3V8z";
    this.getPath = () => this.indeterminate ? this.indeterminatePath : this.checked ? this.checkedPath : "";
    this.toggle = () => {
      if (!this.disabled) {
        this.checked = !this.checked;
        this.setFocus();
        this.indeterminate = false;
        this.calciteCheckboxChange.emit();
      }
    };
    this.keyDownHandler = (event) => {
      if (isActivationKey(event.key)) {
        this.toggle();
        event.preventDefault();
      }
    };
    this.clickHandler = () => {
      if (this.disabled) {
        return;
      }
      this.toggle();
    };
    //--------------------------------------------------------------------------
    //
    //  Event Listeners
    //
    //--------------------------------------------------------------------------
    this.onToggleBlur = () => {
      this.calciteInternalCheckboxBlur.emit(false);
    };
    this.onToggleFocus = () => {
      this.calciteInternalCheckboxFocus.emit(true);
    };
    this.onLabelClick = () => {
      this.toggle();
    };
    this.checked = false;
    this.disabled = false;
    this.form = undefined;
    this.guid = undefined;
    this.hovered = false;
    this.indeterminate = false;
    this.label = undefined;
    this.name = undefined;
    this.required = false;
    this.scale = "m";
    this.value = undefined;
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    var _a;
    await componentLoaded(this);
    (_a = this.toggleEl) === null || _a === void 0 ? void 0 : _a.focus();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  syncHiddenFormInput(input) {
    input.type = "checkbox";
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    this.guid = this.el.id || `calcite-checkbox-${guid()}`;
    connectLabel(this);
    connectForm(this);
  }
  disconnectedCallback() {
    disconnectLabel(this);
    disconnectForm(this);
  }
  componentWillLoad() {
    setUpLoadableComponent(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (h(Host, { onClick: this.clickHandler, onKeyDown: this.keyDownHandler }, h("div", { "aria-checked": toAriaBoolean(this.checked), "aria-label": getLabelText(this), class: "toggle", onBlur: this.onToggleBlur, onFocus: this.onToggleFocus, role: "checkbox", tabIndex: this.disabled ? undefined : 0,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (toggleEl) => (this.toggleEl = toggleEl) }, h("svg", { "aria-hidden": "true", class: "check-svg", viewBox: "0 0 16 16" }, h("path", { d: this.getPath() })), h("slot", null)), h(HiddenFormInputSlot, { component: this })));
  }
  get el() { return getElement(this); }
};
Checkbox.style = checkboxCss;

export { Checkbox as calcite_checkbox };
