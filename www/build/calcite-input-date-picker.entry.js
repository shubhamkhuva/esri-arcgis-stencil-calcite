import { r as registerInstance, e as createEvent, h, j as Host, k as Build, i as getElement } from './index-237c0fcb.js';
import { d as datePartsFromLocalizedString, a as dateFromLocalizedString, i as inRange, b as dateToISO, c as dateFromISO, e as dateFromRange } from './date-59c32991.js';
import { t as toAriaBoolean } from './dom-a5def642.js';
import { f as filterComputedPlacements, c as connectFloatingUI, d as defaultMenuPlacement, r as reposition, a as disconnectFloatingUI, F as FloatingCSS } from './floating-ui-d942c0fc.js';
import { s as submitForm, c as connectForm, d as disconnectForm, H as HiddenFormInputSlot } from './form-9987abc3.js';
import { u as updateHostInteraction } from './interactive-aa28fc0c.js';
import { n as numberKeys } from './key-e4bfd54e.js';
import { c as connectLabel, d as disconnectLabel } from './label-378e8541.js';
import { c as componentLoaded, a as setUpLoadableComponent, s as setComponentLoaded } from './loadable-31485af9.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized } from './locale-aa6cf18a.js';
import { c as connectOpenCloseComponent, d as disconnectOpenCloseComponent } from './openCloseComponent-5462802b.js';
import { g as getValueAsDateRange, a as getLocaleData } from './utils-6de31e5f.js';
import { c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-061592dc.js';
import { c as connectFocusTrap, d as deactivateFocusTrap, a as activateFocusTrap } from './focusTrapComponent-86fabe56.js';
import { g as guid } from './guid-24e0b9e6.js';
import './resources-96bbaa96.js';
import './lodash-48790aa4.js';
import './observers-4b8b0132.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
const CSS = {
  menu: "menu-container",
  menuActive: "menu-container--active",
  toggleIcon: "toggle-icon"
};

const inputDatePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:host{--calcite-icon-size:1rem;--calcite-spacing-eighth:0.125rem;--calcite-spacing-quarter:0.25rem;--calcite-spacing-half:0.5rem;--calcite-spacing-three-quarters:0.75rem;--calcite-spacing:1rem;--calcite-spacing-plus-quarter:1.25rem;--calcite-spacing-plus-half:1.5rem;--calcite-spacing-double:2rem;--calcite-menu-min-width:10rem;--calcite-header-min-height:3rem;--calcite-footer-min-height:3rem}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([disabled]){cursor:default;-webkit-user-select:none;user-select:none;opacity:var(--calcite-ui-opacity-disabled)}:host([disabled]) *,:host([disabled]) ::slotted(*){pointer-events:none}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;vertical-align:top;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)}:host .menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}:host .menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}:host .menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}:host .menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}:host .menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}:host .menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([scale=s]){--calcite-toggle-spacing:0.5rem}:host([scale=m]){--calcite-toggle-spacing:0.75rem}:host([scale=l]){--calcite-toggle-spacing:1rem}:host([disabled]) ::slotted([calcite-hydrated][disabled]),:host([disabled]) [calcite-hydrated][disabled]{opacity:1}.calendar-picker-wrapper{position:static;inline-size:100%;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);transform:translate3d(0, 0, 0)}.input-wrapper{position:relative}.toggle-icon{position:absolute;display:flex;inline-size:1rem;cursor:pointer;align-items:center;inset-inline-end:0;inset-block:0;padding-inline:var(--calcite-toggle-spacing)}:host([range]) .input-container{display:flex}:host([range]) .input-wrapper{flex:1 1 auto}:host([range]) .horizontal-arrow-container{display:flex;align-items:center;border-width:1px;border-inline-start-width:0px;border-inline-end-width:0px;border-style:solid;border-color:var(--calcite-ui-border-input);background-color:var(--calcite-ui-background);padding-block:0px;padding-inline:0.25rem}:host([range][layout=vertical]) .input-wrapper{inline-size:100%}:host([range][layout=vertical]) .input-container{flex-direction:column;align-items:flex-start}:host([range][layout=vertical]) .calendar-picker-wrapper--end{transform:translate3d(0, 0, 0)}:host([range][layout=vertical]) .vertical-arrow-container{inset-block-start:1.5rem;position:absolute;z-index:1;margin-inline:1px;background-color:var(--calcite-ui-foreground-1);padding-inline:0.625rem;inset-inline-start:0}:host([scale=s][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:216px}:host([scale=m][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:286px}:host([scale=l][range]:not([layout=vertical])) .calendar-picker-wrapper{inline-size:398px}.menu-container{--calcite-floating-ui-z-index:600;display:block;position:absolute;z-index:var(--calcite-floating-ui-z-index);visibility:hidden}.menu-container .calcite-floating-ui-anim{position:relative;transition:var(--calcite-floating-ui-transition);transition-property:transform, visibility, opacity;opacity:0;box-shadow:0 0 16px 0 rgba(0, 0, 0, 0.16);z-index:1;border-radius:0.25rem}.menu-container[data-placement^=bottom] .calcite-floating-ui-anim{transform:translateY(-5px)}.menu-container[data-placement^=top] .calcite-floating-ui-anim{transform:translateY(5px)}.menu-container[data-placement^=left] .calcite-floating-ui-anim{transform:translateX(5px)}.menu-container[data-placement^=right] .calcite-floating-ui-anim{transform:translateX(-5px)}.menu-container[data-placement] .calcite-floating-ui-anim--active{opacity:1;transform:translate(0)}:host([open]) .menu-container{visibility:visible}.menu-container--active{visibility:visible}.input .calcite-input__wrapper{margin-block-start:0px}:host([range][layout=vertical][scale=m]) .vertical-arrow-container{inset-block-start:1.5rem;padding-inline-start:0.75rem}:host([range][layout=vertical][scale=m]) .vertical-arrow-container calcite-icon{block-size:0.75rem;inline-size:0.75rem;min-inline-size:0px}:host([range][layout=vertical][scale=l]) .vertical-arrow-container{inset-block-start:2.25rem;padding-inline:0.875rem}:host([range][layout=vertical][open]) .vertical-arrow-container{display:none}::slotted(input[slot=hidden-form-input]){margin:0 !important;opacity:0 !important;outline:none !important;padding:0 !important;position:absolute !important;inset:0 !important;transform:none !important;-webkit-appearance:none !important;z-index:-1 !important}";

let InputDatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteInputDatePickerChange = createEvent(this, "calciteInputDatePickerChange", 6);
    this.calciteInputDatePickerBeforeClose = createEvent(this, "calciteInputDatePickerBeforeClose", 6);
    this.calciteInputDatePickerClose = createEvent(this, "calciteInputDatePickerClose", 6);
    this.calciteInputDatePickerBeforeOpen = createEvent(this, "calciteInputDatePickerBeforeOpen", 6);
    this.calciteInputDatePickerOpen = createEvent(this, "calciteInputDatePickerOpen", 6);
    this.calciteInternalInputInputHandler = (event) => {
      const target = event.target;
      const value = target.value;
      const parsedValue = this.parseNumerals(value);
      const formattedValue = this.formatNumerals(parsedValue);
      target.value = formattedValue;
      const { year } = datePartsFromLocalizedString(value, this.localeData);
      if (year && year.length < 4) {
        return;
      }
      const date = dateFromLocalizedString(value, this.localeData);
      if (inRange(date, this.min, this.max)) {
        this.datePickerActiveDate = date;
      }
    };
    this.calciteInternalInputBlurHandler = () => {
      this.commitValue();
    };
    this.dialogId = `date-picker-dialog--${guid()}`;
    this.focusOnOpen = false;
    this.lastBlurredInput = "none";
    this.userChangedValue = false;
    this.openTransitionProp = "opacity";
    this.valueAsDateChangedExternally = false;
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.onInputWrapperClick = () => {
      if (this.range && this.lastBlurredInput !== "none" && this.open) {
        // we keep the date-picker open when moving between inputs
      }
      else {
        this.open = !this.open;
      }
      this.lastBlurredInput = "none";
    };
    this.setFilteredPlacements = () => {
      const { el, flipPlacements } = this;
      this.filteredFlipPlacements = flipPlacements
        ? filterComputedPlacements(flipPlacements, el)
        : null;
    };
    this.setTransitionEl = (el) => {
      this.transitionEl = el;
      connectOpenCloseComponent(this);
    };
    this.setStartInput = (el) => {
      this.startInput = el;
    };
    this.setEndInput = (el) => {
      this.endInput = el;
    };
    this.deactivate = () => {
      this.open = false;
      this.lastBlurredInput = "none";
    };
    this.keyDownHandler = (event) => {
      var _a, _b;
      const { defaultPrevented, key } = event;
      if (defaultPrevented) {
        return;
      }
      if (key === "Enter") {
        this.commitValue();
        if (this.shouldFocusRangeEnd()) {
          (_a = this.endInput) === null || _a === void 0 ? void 0 : _a.setFocus();
        }
        else if (this.shouldFocusRangeStart()) {
          (_b = this.startInput) === null || _b === void 0 ? void 0 : _b.setFocus();
        }
        if (submitForm(this)) {
          event.preventDefault();
          this.restoreInputFocus();
        }
      }
      else if (key === "ArrowDown") {
        this.open = true;
        this.focusOnOpen = true;
        event.preventDefault();
      }
      else if (key === "Escape") {
        this.open = false;
        event.preventDefault();
        this.restoreInputFocus();
      }
    };
    this.startInputFocus = () => {
      this.focusedInput = "start";
    };
    this.startEndInputFocus = (event) => {
      const blurredEl = event.relatedTarget;
      this.lastBlurredInput =
        blurredEl === this.startInput ? "start" : blurredEl === this.endInput ? "end" : "none";
    };
    this.endInputFocus = () => {
      this.focusedInput = "end";
    };
    this.setFloatingEl = (el) => {
      this.floatingEl = el;
      connectFloatingUI(this, this.referenceEl, this.floatingEl);
    };
    this.setStartWrapper = (el) => {
      this.startWrapper = el;
      this.setReferenceEl();
    };
    this.setEndWrapper = (el) => {
      this.endWrapper = el;
      this.setReferenceEl();
    };
    this.setDatePickerRef = (el) => {
      this.datePickerEl = el;
      connectFocusTrap(this, {
        focusTrapEl: el,
        focusTrapOptions: {
          initialFocus: false,
          setReturnFocus: false
        }
      });
    };
    /**
     * Event handler for when the selected date changes
     *
     * @param event CalciteDatePicker custom change event
     */
    this.handleDateChange = (event) => {
      if (this.range) {
        return;
      }
      event.stopPropagation();
      this.setValue(event.target.valueAsDate);
      this.localizeInputValues();
      this.restoreInputFocus();
    };
    this.handleDateRangeChange = (event) => {
      if (!this.range) {
        return;
      }
      event.stopPropagation();
      const value = event.target.valueAsDate;
      this.setRangeValue(value);
      this.localizeInputValues();
      this.restoreInputFocus();
    };
    this.setInputValue = (newValue, input = "start") => {
      const inputEl = this[`${input}Input`];
      if (!inputEl) {
        return;
      }
      inputEl.value = newValue;
    };
    this.setRangeValue = (valueAsDate) => {
      if (!this.range) {
        return;
      }
      const { value: oldValue } = this;
      const oldValueIsArray = Array.isArray(oldValue);
      const valueIsArray = Array.isArray(valueAsDate);
      const newStartDate = valueIsArray ? valueAsDate[0] : null;
      const newStartDateISO = valueIsArray ? dateToISO(newStartDate) : "";
      const newEndDate = valueIsArray ? valueAsDate[1] : null;
      const newEndDateISO = valueIsArray ? dateToISO(newEndDate) : "";
      const newValue = newStartDateISO || newEndDateISO ? [newStartDateISO, newEndDateISO] : "";
      if (newValue === oldValue) {
        return;
      }
      this.userChangedValue = true;
      this.value = newValue;
      this.valueAsDate = newValue ? getValueAsDateRange(newValue) : undefined;
      const changeEvent = this.calciteInputDatePickerChange.emit();
      if (changeEvent && changeEvent.defaultPrevented) {
        this.value = oldValue;
        if (oldValueIsArray) {
          this.setInputValue(oldValue[0], "start");
          this.setInputValue(oldValue[1], "end");
        }
        else {
          this.value = oldValue;
          this.setInputValue(oldValue);
        }
      }
    };
    this.setValue = (value) => {
      if (this.range) {
        return;
      }
      const oldValue = this.value;
      const newValue = dateToISO(value);
      if (newValue === oldValue) {
        return;
      }
      this.userChangedValue = true;
      this.valueAsDate = newValue ? dateFromISO(newValue) : undefined;
      this.value = newValue || "";
      const changeEvent = this.calciteInputDatePickerChange.emit();
      if (changeEvent.defaultPrevented) {
        this.value = oldValue;
        this.setInputValue(oldValue);
      }
    };
    this.commonDateSeparators = [".", "-", "/"];
    this.formatNumerals = (value) => value
      ? value
        .split("")
        .map((char) => {
        var _a, _b, _c;
        return ((_a = this.commonDateSeparators) === null || _a === void 0 ? void 0 : _a.includes(char))
          ? (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.separator
          : (numberKeys === null || numberKeys === void 0 ? void 0 : numberKeys.includes(char))
            ? (_c = numberStringFormatter === null || numberStringFormatter === void 0 ? void 0 : numberStringFormatter.numberFormatter) === null || _c === void 0 ? void 0 : _c.format(Number(char))
            : char;
      })
        .join("")
      : "";
    this.parseNumerals = (value) => value
      ? value
        .split("")
        .map((char) => numberKeys.includes(char) ? numberStringFormatter.delocalize(char) : char)
        .join("")
      : "";
    this.disabled = false;
    this.focusTrapDisabled = false;
    this.form = undefined;
    this.readOnly = false;
    this.value = "";
    this.flipPlacements = undefined;
    this.headingLevel = undefined;
    this.valueAsDate = undefined;
    this.messageOverrides = undefined;
    this.messages = undefined;
    this.minAsDate = undefined;
    this.maxAsDate = undefined;
    this.min = undefined;
    this.max = undefined;
    this.open = false;
    this.name = undefined;
    this.numberingSystem = undefined;
    this.scale = "m";
    this.placement = defaultMenuPlacement;
    this.range = false;
    this.required = false;
    this.overlayPositioning = "absolute";
    this.proximitySelectionDisabled = false;
    this.layout = "horizontal";
    this.datePickerActiveDate = undefined;
    this.defaultMessages = undefined;
    this.effectiveLocale = "";
    this.focusedInput = "start";
    this.localeData = undefined;
  }
  handleFocusTrapDisabled(focusTrapDisabled) {
    if (!this.open) {
      return;
    }
    focusTrapDisabled ? deactivateFocusTrap(this) : activateFocusTrap(this);
  }
  handleDisabledAndReadOnlyChange(value) {
    if (!value) {
      this.open = false;
    }
  }
  valueWatcher(newValue) {
    if (!this.userChangedValue) {
      let newValueAsDate;
      if (Array.isArray(newValue)) {
        newValueAsDate = getValueAsDateRange(newValue);
      }
      else if (newValue) {
        newValueAsDate = dateFromISO(newValue);
      }
      else {
        newValueAsDate = undefined;
      }
      if (!this.valueAsDateChangedExternally && newValueAsDate !== this.valueAsDate) {
        this.valueAsDate = newValueAsDate;
      }
      this.localizeInputValues();
    }
    this.userChangedValue = false;
  }
  valueAsDateWatcher(valueAsDate) {
    this.datePickerActiveDate = valueAsDate;
    const newValue = this.range && Array.isArray(valueAsDate)
      ? [dateToISO(valueAsDate[0]), dateToISO(valueAsDate[1])]
      : dateToISO(valueAsDate);
    if (this.value !== newValue) {
      this.valueAsDateChangedExternally = true;
      this.value = newValue;
      this.valueAsDateChangedExternally = false;
    }
  }
  flipPlacementsHandler() {
    this.setFilteredPlacements();
    this.reposition(true);
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  onMinChanged(min) {
    if (min) {
      this.minAsDate = dateFromISO(min);
    }
  }
  onMaxChanged(max) {
    if (max) {
      this.maxAsDate = dateFromISO(max);
    }
  }
  openHandler(value) {
    if (this.disabled || this.readOnly) {
      this.open = false;
      return;
    }
    if (value) {
      this.reposition(true);
    }
  }
  overlayPositioningHandler() {
    this.reposition(true);
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  calciteDaySelectHandler() {
    if (this.shouldFocusRangeStart() || this.shouldFocusRangeEnd()) {
      return;
    }
    this.open = false;
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component. */
  async setFocus() {
    await componentLoaded(this);
    this.el.focus();
  }
  /**
   * Updates the position of the component.
   *
   * @param delayed
   */
  async reposition(delayed = false) {
    const { floatingEl, referenceEl, placement, overlayPositioning, filteredFlipPlacements } = this;
    return reposition(this, {
      floatingEl,
      referenceEl,
      overlayPositioning,
      placement,
      flipPlacements: filteredFlipPlacements,
      type: "menu"
    }, delayed);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    const { open } = this;
    open && this.openHandler(open);
    if (Array.isArray(this.value)) {
      this.valueAsDate = getValueAsDateRange(this.value);
    }
    else if (this.value) {
      try {
        this.valueAsDate = dateFromISO(this.value);
      }
      catch (error) {
        this.warnAboutInvalidValue(this.value);
        this.value = "";
      }
    }
    else if (this.range && this.valueAsDate) {
      this.setRangeValue(this.valueAsDate);
    }
    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
    connectLabel(this);
    connectForm(this);
    connectOpenCloseComponent(this);
    connectMessages(this);
    this.setFilteredPlacements();
    this.reposition(true);
    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };
  }
  async componentWillLoad() {
    setUpLoadableComponent(this);
    await Promise.all([this.loadLocaleData(), setUpMessages(this)]);
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
  }
  componentDidLoad() {
    setComponentLoaded(this);
    this.localizeInputValues();
    this.reposition(true);
  }
  disconnectedCallback() {
    deactivateFocusTrap(this);
    disconnectLabel(this);
    disconnectForm(this);
    disconnectFloatingUI(this, this.referenceEl, this.floatingEl);
    disconnectOpenCloseComponent(this);
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  componentDidRender() {
    updateHostInteraction(this);
  }
  render() {
    var _a, _b;
    const { disabled, effectiveLocale, messages, numberingSystem, readOnly } = this;
    numberStringFormatter.numberFormatOptions = {
      numberingSystem,
      locale: effectiveLocale,
      useGrouping: false
    };
    return (h(Host, { onBlur: this.deactivate, onKeyDown: this.keyDownHandler }, this.localeData && (h("div", { class: "input-container" }, h("div", { class: "input-wrapper", onClick: this.onInputWrapperClick,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setStartWrapper }, h("calcite-input", { "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-expanded": toAriaBoolean(this.open), "aria-haspopup": "dialog", class: `input ${this.layout === "vertical" && this.range ? `no-bottom-border` : ``}`, disabled: disabled, icon: "calendar", "number-button-type": "none", numberingSystem: numberingSystem, onCalciteInputInput: this.calciteInternalInputInputHandler, onCalciteInternalInputBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputFocus: this.startInputFocus, onFocus: this.startEndInputFocus, placeholder: (_a = this.localeData) === null || _a === void 0 ? void 0 : _a.placeholder, readOnly: readOnly, role: "combobox", scale: this.scale, type: "text",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setStartInput }), this.renderToggleIcon(this.open && this.focusedInput === "start")), h("div", { "aria-hidden": toAriaBoolean(!this.open), "aria-label": messages.chooseDate, "aria-live": "polite", "aria-modal": "true", class: {
        [CSS.menu]: true,
        [CSS.menuActive]: this.open
      }, id: this.dialogId, role: "dialog",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setFloatingEl }, h("div", { class: {
        ["calendar-picker-wrapper"]: true,
        ["calendar-picker-wrapper--end"]: this.focusedInput === "end",
        [FloatingCSS.animation]: true,
        [FloatingCSS.animationActive]: this.open
      },
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setTransitionEl }, h("calcite-date-picker", { activeDate: this.datePickerActiveDate, activeRange: this.focusedInput, headingLevel: this.headingLevel, max: this.max, maxAsDate: this.maxAsDate, messageOverrides: this.messageOverrides, min: this.min, minAsDate: this.minAsDate, numberingSystem: numberingSystem, onCalciteDatePickerChange: this.handleDateChange, onCalciteDatePickerRangeChange: this.handleDateRangeChange, proximitySelectionDisabled: this.proximitySelectionDisabled, range: this.range, scale: this.scale, tabIndex: this.open ? undefined : -1, valueAsDate: this.valueAsDate,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setDatePickerRef }))), this.range && this.layout === "horizontal" && (h("div", { class: "horizontal-arrow-container" }, h("calcite-icon", { flipRtl: true, icon: "arrow-right", scale: this.scale === "l" ? "m" : "s" }))), this.range && this.layout === "vertical" && this.scale !== "s" && (h("div", { class: "vertical-arrow-container" }, h("calcite-icon", { icon: "arrow-down", scale: this.scale === "l" ? "m" : "s" }))), this.range && (h("div", { class: "input-wrapper", onClick: this.onInputWrapperClick,
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setEndWrapper }, h("calcite-input", { "aria-autocomplete": "none", "aria-controls": this.dialogId, "aria-expanded": toAriaBoolean(this.open), "aria-haspopup": "dialog", class: {
        input: true,
        "border-top-color-one": this.layout === "vertical" && this.range
      }, disabled: disabled, icon: "calendar", "number-button-type": "none", numberingSystem: numberingSystem, onCalciteInputInput: this.calciteInternalInputInputHandler, onCalciteInternalInputBlur: this.calciteInternalInputBlurHandler, onCalciteInternalInputFocus: this.endInputFocus, onFocus: this.startEndInputFocus, placeholder: (_b = this.localeData) === null || _b === void 0 ? void 0 : _b.placeholder, readOnly: readOnly, role: "combobox", scale: this.scale, type: "text",
      // eslint-disable-next-line react/jsx-sort-props
      ref: this.setEndInput }), this.renderToggleIcon(this.open && this.focusedInput === "end"))))), h(HiddenFormInputSlot, { component: this })));
  }
  renderToggleIcon(open) {
    return (h("span", { class: CSS.toggleIcon }, h("calcite-icon", { icon: open ? "chevron-up" : "chevron-down", scale: "s" })));
  }
  setReferenceEl() {
    const { focusedInput, layout, endWrapper, startWrapper } = this;
    this.referenceEl =
      focusedInput === "end" || layout === "vertical"
        ? endWrapper || startWrapper
        : startWrapper || endWrapper;
    requestAnimationFrame(() => connectFloatingUI(this, this.referenceEl, this.floatingEl));
  }
  onLabelClick() {
    this.setFocus();
  }
  onBeforeOpen() {
    this.calciteInputDatePickerBeforeOpen.emit();
  }
  onOpen() {
    activateFocusTrap(this, {
      onActivate: () => {
        if (this.focusOnOpen) {
          this.datePickerEl.setFocus();
          this.focusOnOpen = false;
        }
      }
    });
    this.calciteInputDatePickerOpen.emit();
  }
  onBeforeClose() {
    this.calciteInputDatePickerBeforeClose.emit();
  }
  onClose() {
    this.calciteInputDatePickerClose.emit();
    deactivateFocusTrap(this);
    this.restoreInputFocus();
    this.focusOnOpen = false;
  }
  commitValue() {
    const { focusedInput, value } = this;
    const focusedInputName = `${focusedInput}Input`;
    const focusedInputValue = this[focusedInputName].value;
    const date = dateFromLocalizedString(focusedInputValue, this.localeData);
    const dateAsISO = dateToISO(date);
    const valueIsArray = Array.isArray(value);
    if (this.range) {
      const focusedInputValueIndex = focusedInput === "start" ? 0 : 1;
      if (valueIsArray) {
        if (dateAsISO === value[focusedInputValueIndex]) {
          return;
        }
        if (date) {
          this.setRangeValue([
            focusedInput === "start" ? date : dateFromISO(value[0]),
            focusedInput === "end" ? date : dateFromISO(value[1])
          ]);
          this.localizeInputValues();
        }
        else {
          this.setRangeValue([
            focusedInput === "end" && dateFromISO(value[0]),
            focusedInput === "start" && dateFromISO(value[1])
          ]);
        }
      }
      else {
        if (date) {
          this.setRangeValue([
            focusedInput === "start" ? date : dateFromISO(value[0]),
            focusedInput === "end" ? date : dateFromISO(value[1])
          ]);
          this.localizeInputValues();
        }
      }
    }
    else {
      if (dateAsISO === value) {
        return;
      }
      this.setValue(date);
      this.localizeInputValues();
    }
  }
  async loadLocaleData() {
    if (!Build.isBrowser) {
      return;
    }
    numberStringFormatter.numberFormatOptions = {
      numberingSystem: this.numberingSystem,
      locale: this.effectiveLocale,
      useGrouping: false
    };
    this.localeData = await getLocaleData(this.effectiveLocale);
    this.localizeInputValues();
  }
  shouldFocusRangeStart() {
    const startValue = this.value[0];
    const endValue = this.value[1];
    return !!(endValue && !startValue && this.focusedInput === "end" && this.startInput);
  }
  shouldFocusRangeEnd() {
    const startValue = this.value[0];
    const endValue = this.value[1];
    return !!(startValue && !endValue && this.focusedInput === "start" && this.endInput);
  }
  restoreInputFocus() {
    if (!this.range) {
      this.startInput.setFocus();
      return;
    }
    const focusedInput = this.focusedInput === "start" ? this.startInput : this.endInput;
    focusedInput.setFocus();
  }
  localizeInputValues() {
    const date = dateFromRange((this.range
      ? (Array.isArray(this.valueAsDate) && this.valueAsDate[0]) || undefined
      : this.valueAsDate), this.minAsDate, this.maxAsDate);
    const endDate = this.range
      ? dateFromRange((Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined, this.minAsDate, this.maxAsDate)
      : null;
    const localizedDate = date && this.formatNumerals(date.toLocaleDateString(this.effectiveLocale));
    const localizedEndDate = endDate && this.formatNumerals(endDate.toLocaleDateString(this.effectiveLocale));
    localizedDate && this.setInputValue(localizedDate, "start");
    this.range && localizedEndDate && this.setInputValue(localizedEndDate, "end");
  }
  warnAboutInvalidValue(value) {
    console.warn(`The specified value "${value}" does not conform to the required format, "YYYY-MM-DD".`);
  }
  static get delegatesFocus() { return true; }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "focusTrapDisabled": ["handleFocusTrapDisabled"],
    "disabled": ["handleDisabledAndReadOnlyChange"],
    "readOnly": ["handleDisabledAndReadOnlyChange"],
    "value": ["valueWatcher"],
    "valueAsDate": ["valueAsDateWatcher"],
    "flipPlacements": ["flipPlacementsHandler"],
    "messageOverrides": ["onMessagesChange"],
    "min": ["onMinChanged"],
    "max": ["onMaxChanged"],
    "open": ["openHandler"],
    "overlayPositioning": ["overlayPositioningHandler"],
    "layout": ["setReferenceEl"],
    "focusedInput": ["setReferenceEl"],
    "effectiveLocale": ["loadLocaleData"]
  }; }
};
InputDatePicker.style = inputDatePickerCss;

export { InputDatePicker as calcite_input_date_picker };
