import { r as registerInstance, e as createEvent, h, i as getElement } from './index-237c0fcb.js';
import { c as createObserver } from './observers-4b8b0132.js';

const optionCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{display:block}";

let Option = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInternalOptionChange = createEvent(this, "calciteInternalOptionChange", 6);
    this.mutationObserver = createObserver("mutation", () => {
      this.ensureTextContentDependentProps();
      this.calciteInternalOptionChange.emit();
    });
    this.disabled = false;
    this.label = undefined;
    this.selected = undefined;
    this.value = undefined;
  }
  handlePropChange(_newValue, _oldValue, propName) {
    if (propName === "label" || propName === "value") {
      this.ensureTextContentDependentProps();
    }
    this.calciteInternalOptionChange.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  ensureTextContentDependentProps() {
    const { el: { textContent } } = this;
    if (!this.label || this.label === this.internallySetLabel) {
      this.label = textContent;
      this.internallySetLabel = textContent;
    }
    if (!this.value || this.value === this.internallySetValue) {
      this.value = textContent;
      this.internallySetValue = textContent;
    }
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.ensureTextContentDependentProps();
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el, {
      attributeFilter: ["label", "value"],
      characterData: true,
      childList: true,
      subtree: true
    });
  }
  disconnectedCallback() {
    var _a;
    (_a = this.mutationObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  render() {
    return h("slot", null, this.label);
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "disabled": ["handlePropChange"],
    "label": ["handlePropChange"],
    "selected": ["handlePropChange"],
    "value": ["handlePropChange"]
  }; }
};
Option.style = optionCss;

export { Option as calcite_option };
