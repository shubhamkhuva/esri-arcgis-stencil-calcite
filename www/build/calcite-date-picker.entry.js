import { r as registerInstance, e as createEvent, h, j as Host, k as Build, i as getElement } from './index-237c0fcb.js';
import { g as getDaysDiff, b as dateToISO, c as dateFromISO, e as dateFromRange, s as setEndOfDay } from './date-59c32991.js';
import { c as componentLoaded, a as setUpLoadableComponent, s as setComponentLoaded } from './loadable-31485af9.js';
import { c as connectLocalized, d as disconnectLocalized, n as numberStringFormatter, e as getDateTimeFormat } from './locale-aa6cf18a.js';
import { c as connectMessages, d as disconnectMessages, s as setUpMessages, u as updateMessages } from './t9n-061592dc.js';
import { g as getValueAsDateRange, a as getLocaleData } from './utils-6de31e5f.js';
import './dom-a5def642.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';
import './key-e4bfd54e.js';
import './observers-4b8b0132.js';

/*!
 * All material copyright ESRI, All Rights Reserved, unless otherwise specified.
 * See https://github.com/Esri/calcite-components/blob/master/LICENSE.md for details.
 * v1.3.0
 */
const HEADING_LEVEL = 2;
const DATE_PICKER_FORMAT_OPTIONS = { dateStyle: "full" };

const datePickerCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{position:relative;display:inline-block;inline-size:100%;overflow:visible;border-radius:0px;border-width:1px;border-style:solid;border-color:var(--calcite-ui-border-1);background-color:var(--calcite-ui-foreground-1);vertical-align:top}:host([scale=s]){max-inline-size:216px}:host([scale=m]){max-inline-size:286px}:host([scale=l]){max-inline-size:398px}";

let DatePicker = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteDatePickerChange = createEvent(this, "calciteDatePickerChange", 6);
    this.calciteDatePickerRangeChange = createEvent(this, "calciteDatePickerRangeChange", 6);
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.keyDownHandler = (event) => {
      if (event.key === "Escape") {
        this.reset();
      }
    };
    this.monthHeaderSelectChange = (event) => {
      const date = new Date(event.detail);
      if (!this.range) {
        this.activeDate = date;
      }
      else {
        if (this.activeRange === "end") {
          this.activeEndDate = date;
        }
        else {
          this.activeStartDate = date;
        }
        this.mostRecentRangeValue = date;
      }
    };
    this.monthActiveDateChange = (event) => {
      const date = new Date(event.detail);
      if (!this.range) {
        this.activeDate = date;
      }
      else {
        if (this.activeRange === "end") {
          this.activeEndDate = date;
        }
        else {
          this.activeStartDate = date;
        }
        this.mostRecentRangeValue = date;
      }
    };
    this.monthHoverChange = (event) => {
      if (!this.range) {
        this.hoverRange = undefined;
        return;
      }
      const { valueAsDate } = this;
      const start = Array.isArray(valueAsDate) && valueAsDate[0];
      const end = Array.isArray(valueAsDate) && valueAsDate[1];
      const date = new Date(event.detail);
      this.hoverRange = {
        focused: this.activeRange || "start",
        start,
        end
      };
      if (!this.proximitySelectionDisabled) {
        if (end) {
          const startDiff = getDaysDiff(date, start);
          const endDiff = getDaysDiff(date, end);
          if (endDiff > 0) {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
          else if (startDiff < 0) {
            this.hoverRange.start = date;
            this.hoverRange.focused = "start";
          }
          else if (startDiff > endDiff) {
            this.hoverRange.start = date;
            this.hoverRange.focused = "start";
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
        else {
          if (start) {
            if (date < start) {
              this.hoverRange = {
                focused: "start",
                start: date,
                end: start
              };
            }
            else {
              this.hoverRange.end = date;
              this.hoverRange.focused = "end";
            }
          }
        }
      }
      else {
        if (!end) {
          if (date < start) {
            this.hoverRange = {
              focused: "start",
              start: date,
              end: start
            };
          }
          else {
            this.hoverRange.end = date;
            this.hoverRange.focused = "end";
          }
        }
        else {
          this.hoverRange = undefined;
        }
      }
      event.stopPropagation();
    };
    this.monthMouseOutChange = () => {
      if (this.hoverRange) {
        this.hoverRange = undefined;
      }
    };
    /**
     * Reset active date and close
     */
    this.reset = () => {
      var _a, _b, _c, _d, _e;
      const { valueAsDate } = this;
      if (!Array.isArray(valueAsDate) &&
        valueAsDate &&
        (valueAsDate === null || valueAsDate === void 0 ? void 0 : valueAsDate.getTime()) !== ((_a = this.activeDate) === null || _a === void 0 ? void 0 : _a.getTime())) {
        this.activeDate = new Date(valueAsDate);
      }
      if (Array.isArray(valueAsDate)) {
        if (valueAsDate[0] &&
          ((_b = valueAsDate[0]) === null || _b === void 0 ? void 0 : _b.getTime()) !==
            (this.activeStartDate instanceof Date && ((_c = this.activeStartDate) === null || _c === void 0 ? void 0 : _c.getTime()))) {
          this.activeStartDate = new Date(valueAsDate[0]);
        }
        if (valueAsDate[1] &&
          ((_d = valueAsDate[1]) === null || _d === void 0 ? void 0 : _d.getTime()) !==
            (this.activeStartDate instanceof Date && ((_e = this.activeEndDate) === null || _e === void 0 ? void 0 : _e.getTime()))) {
          this.activeEndDate = new Date(valueAsDate[1]);
        }
      }
    };
    /**
     * Event handler for when the selected date changes
     *
     * @param event
     */
    this.monthDateChange = (event) => {
      const date = new Date(event.detail);
      const isoDate = dateToISO(date);
      if (!this.range && isoDate === dateToISO(this.valueAsDate)) {
        return;
      }
      if (!this.range) {
        this.value = isoDate || "";
        this.valueAsDate = date || null;
        this.activeDate = date || null;
        this.calciteDatePickerChange.emit();
        return;
      }
      const start = this.getStartDate();
      const end = this.getEndDate();
      if (!start || (!end && date < start)) {
        if (start) {
          this.setEndDate(new Date(start));
        }
        if (this.activeRange == "end") {
          this.setEndDate(date);
        }
        else {
          this.setStartDate(date);
        }
      }
      else if (!end) {
        this.setEndDate(date);
      }
      else {
        if (!this.proximitySelectionDisabled) {
          if (this.activeRange) {
            if (this.activeRange == "end") {
              this.setEndDate(date);
            }
            else {
              this.setStartDate(date);
            }
          }
          else {
            const startDiff = getDaysDiff(date, start);
            const endDiff = getDaysDiff(date, end);
            if (endDiff === 0 || startDiff < 0) {
              this.setStartDate(date);
            }
            else if (startDiff === 0 || endDiff < 0) {
              this.setEndDate(date);
            }
            else if (startDiff < endDiff) {
              this.setStartDate(date);
            }
            else {
              this.setEndDate(date);
            }
          }
        }
        else {
          this.setStartDate(date);
        }
      }
      this.calciteDatePickerChange.emit();
    };
    this.activeDate = undefined;
    this.activeRange = undefined;
    this.value = undefined;
    this.headingLevel = undefined;
    this.valueAsDate = undefined;
    this.minAsDate = undefined;
    this.maxAsDate = undefined;
    this.min = undefined;
    this.max = undefined;
    this.numberingSystem = undefined;
    this.scale = "m";
    this.range = false;
    this.proximitySelectionDisabled = false;
    this.messageOverrides = undefined;
    this.messages = undefined;
    this.activeEndDate = undefined;
    this.activeStartDate = undefined;
    this.dateTimeFormat = undefined;
    this.defaultMessages = undefined;
    this.effectiveLocale = "";
    this.endAsDate = undefined;
    this.hoverRange = undefined;
    this.localeData = undefined;
    this.startAsDate = undefined;
  }
  activeDateWatcher(newActiveDate) {
    if (this.activeRange === "end") {
      this.activeEndDate = newActiveDate;
    }
  }
  valueAsDateWatcher(newValueAsDate) {
    if (this.range && Array.isArray(newValueAsDate)) {
      const { activeStartDate, activeEndDate } = this;
      const newActiveStartDate = newValueAsDate[0];
      const newActiveEndDate = newValueAsDate[1];
      this.activeStartDate = activeStartDate !== newActiveStartDate && newActiveStartDate;
      this.activeEndDate = activeEndDate !== newActiveEndDate && newActiveEndDate;
    }
    else if (newValueAsDate && newValueAsDate !== this.activeDate) {
      this.activeDate = newValueAsDate;
    }
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
  onMessagesChange() {
    /* wired up by t9n util */
  }
  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await componentLoaded(this);
    this.el.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    connectMessages(this);
    if (Array.isArray(this.value)) {
      this.valueAsDate = getValueAsDateRange(this.value);
    }
    else if (this.value) {
      this.valueAsDate = dateFromISO(this.value);
    }
    if (this.min) {
      this.minAsDate = dateFromISO(this.min);
    }
    if (this.max) {
      this.maxAsDate = dateFromISO(this.max);
    }
  }
  disconnectedCallback() {
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  async componentWillLoad() {
    setUpLoadableComponent(this);
    await this.loadLocaleData();
    this.onMinChanged(this.min);
    this.onMaxChanged(this.max);
    await setUpMessages(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  render() {
    var _a;
    const date = dateFromRange(this.range && Array.isArray(this.valueAsDate) ? this.valueAsDate[0] : this.valueAsDate, this.minAsDate, this.maxAsDate);
    let activeDate = this.getActiveDate(date, this.minAsDate, this.maxAsDate);
    const endDate = this.range && Array.isArray(this.valueAsDate)
      ? dateFromRange(this.valueAsDate[1], this.minAsDate, this.maxAsDate)
      : null;
    const activeEndDate = this.getActiveEndDate(endDate, this.minAsDate, this.maxAsDate);
    if ((this.activeRange === "end" ||
      (((_a = this.hoverRange) === null || _a === void 0 ? void 0 : _a.focused) === "end" && (!this.proximitySelectionDisabled || endDate))) &&
      activeEndDate) {
      activeDate = activeEndDate;
    }
    if (this.range && this.mostRecentRangeValue) {
      activeDate = this.mostRecentRangeValue;
    }
    const minDate = this.range && this.activeRange
      ? this.activeRange === "start"
        ? this.minAsDate
        : date || this.minAsDate
      : this.minAsDate;
    const maxDate = this.range && this.activeRange
      ? this.activeRange === "start"
        ? endDate || this.maxAsDate
        : this.maxAsDate
      : this.maxAsDate;
    return (h(Host, { onBlur: this.reset, onKeyDown: this.keyDownHandler }, this.renderCalendar(activeDate, maxDate, minDate, date, endDate)));
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  valueHandler(value) {
    if (Array.isArray(value)) {
      this.valueAsDate = getValueAsDateRange(value);
    }
    else if (value) {
      this.valueAsDate = dateFromISO(value);
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
    this.dateTimeFormat = getDateTimeFormat(this.effectiveLocale, DATE_PICKER_FORMAT_OPTIONS);
  }
  /**
   * Render calcite-date-picker-month-header and calcite-date-picker-month
   *
   * @param activeDate
   * @param maxDate
   * @param minDate
   * @param date
   * @param endDate
   */
  renderCalendar(activeDate, maxDate, minDate, date, endDate) {
    return (this.localeData && [
      h("calcite-date-picker-month-header", { activeDate: activeDate, headingLevel: this.headingLevel || HEADING_LEVEL, localeData: this.localeData, max: maxDate, messages: this.messages, min: minDate, onCalciteInternalDatePickerSelect: this.monthHeaderSelectChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date || new Date() }),
      h("calcite-date-picker-month", { activeDate: activeDate, dateTimeFormat: this.dateTimeFormat, endDate: this.range ? endDate : undefined, hoverRange: this.hoverRange, localeData: this.localeData, max: maxDate, min: minDate, onCalciteInternalDatePickerActiveDateChange: this.monthActiveDateChange, onCalciteInternalDatePickerHover: this.monthHoverChange, onCalciteInternalDatePickerMouseOut: this.monthMouseOutChange, onCalciteInternalDatePickerSelect: this.monthDateChange, scale: this.scale, selectedDate: this.activeRange === "end" ? endDate : date, startDate: this.range ? date : undefined })
    ]);
  }
  getEndDate() {
    return (Array.isArray(this.valueAsDate) && this.valueAsDate[1]) || undefined;
  }
  setEndDate(date) {
    const startDate = this.getStartDate();
    const newEndDate = date ? setEndOfDay(date) : date;
    this.value = [dateToISO(startDate), dateToISO(date)];
    this.valueAsDate = [startDate, date];
    this.mostRecentRangeValue = newEndDate;
    this.calciteDatePickerRangeChange.emit();
    this.activeEndDate = date || null;
  }
  getStartDate() {
    return Array.isArray(this.valueAsDate) && this.valueAsDate[0];
  }
  setStartDate(date) {
    const endDate = this.getEndDate();
    this.value = [dateToISO(date), dateToISO(endDate)];
    this.valueAsDate = [date, endDate];
    this.mostRecentRangeValue = date;
    this.calciteDatePickerRangeChange.emit();
    this.activeStartDate = date || null;
  }
  /**
   * Get an active date using the value, or current date as default
   *
   * @param value
   * @param min
   * @param max
   */
  getActiveDate(value, min, max) {
    return dateFromRange(this.activeDate, min, max) || value || dateFromRange(new Date(), min, max);
  }
  getActiveEndDate(value, min, max) {
    return (dateFromRange(this.activeEndDate, min, max) || value || dateFromRange(new Date(), min, max));
  }
  static get delegatesFocus() { return true; }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "activeDate": ["activeDateWatcher"],
    "valueAsDate": ["valueAsDateWatcher"],
    "min": ["onMinChanged"],
    "max": ["onMaxChanged"],
    "messageOverrides": ["onMessagesChange"],
    "effectiveLocale": ["effectiveLocaleChange", "loadLocaleData"],
    "value": ["valueHandler"]
  }; }
};
DatePicker.style = datePickerCss;

export { DatePicker as calcite_date_picker };
