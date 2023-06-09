import { r as registerInstance, e as createEvent, h, F as Fragment, i as getElement } from './index-237c0fcb.js';
import { a as setUpLoadableComponent, s as setComponentLoaded, c as componentLoaded } from './loadable-31485af9.js';
import { n as numberStringFormatter, c as connectLocalized, d as disconnectLocalized } from './locale-aa6cf18a.js';
import { u as updateMessages, c as connectMessages, s as setUpMessages, d as disconnectMessages } from './t9n-061592dc.js';
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
const CSS = {
  page: "page",
  selected: "is-selected",
  previous: "previous",
  next: "next",
  disabled: "is-disabled",
  ellipsis: "ellipsis",
  ellipsisStart: "ellipsis--start",
  ellipsisEnd: "ellipsis--end"
};

const paginationCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host([scale=s]){--calcite-pagination-spacing-internal:0.25rem 0.5rem}:host([scale=s]) .previous,:host([scale=s]) .next,:host([scale=s]) .page{block-size:1.5rem;font-size:var(--calcite-font-size--2);line-height:1rem}:host([scale=s]) .previous,:host([scale=s]) .next{padding-inline:0.25rem}:host([scale=m]){--calcite-pagination-spacing-internal:0.5rem 0.75rem}:host([scale=m]) .previous,:host([scale=m]) .next,:host([scale=m]) .page{block-size:2rem;font-size:var(--calcite-font-size--1);line-height:1rem}:host([scale=m]) .previous,:host([scale=m]) .next{padding-inline:0.5rem}:host([scale=l]){--calcite-pagination-spacing-internal:0.75rem 1rem}:host([scale=l]) .previous,:host([scale=l]) .next,:host([scale=l]) .page{block-size:2.75rem;font-size:var(--calcite-font-size-0);line-height:1.25rem}:host([scale=l]) .previous,:host([scale=l]) .next{padding-inline:1rem}:host{display:flex;writing-mode:horizontal-tb}:host button{outline-color:transparent}:host button:focus{outline:2px solid var(--calcite-ui-focus-color);outline-offset:calc(\n            -2px *\n            calc(\n              1 -\n              2 * clamp(\n                0,\n                var(--calcite-ui-focus-offset-invert),\n                1\n              )\n            )\n          )}.previous,.next,.page{box-sizing:border-box;display:flex;cursor:pointer;align-items:center;border-style:none;--tw-border-opacity:0;background-color:transparent;font-family:inherit;font-size:var(--calcite-font-size-0);line-height:1.25rem;color:var(--calcite-ui-text-3);border-block:2px solid transparent}.previous:hover,.next:hover,.page:hover{color:var(--calcite-ui-text-1);transition:all var(--calcite-animation-timing) ease-in-out 0s, outline 0s, outline-offset 0s}.page:hover{border-block-end-color:var(--calcite-ui-border-2)}.page.is-selected{font-weight:var(--calcite-font-weight-medium);color:var(--calcite-ui-text-1);border-block-end-color:var(--calcite-ui-brand)}.previous:hover,.next:hover{background-color:var(--calcite-ui-foreground-2);color:var(--calcite-ui-brand)}.previous:active,.next:active{background-color:var(--calcite-ui-foreground-3)}.previous.is-disabled,.next.is-disabled{pointer-events:none;background-color:transparent}.previous.is-disabled>calcite-icon,.next.is-disabled>calcite-icon{opacity:var(--calcite-ui-opacity-disabled)}.next{margin-inline-end:0px}.page,.ellipsis{padding:var(--calcite-pagination-spacing-internal)}.ellipsis{display:flex;align-items:flex-end;color:var(--calcite-ui-text-3)}";

const maxPagesDisplayed = 5;
let Pagination = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calcitePaginationChange = createEvent(this, "calcitePaginationChange", 6);
    this.previousClicked = () => {
      this.previousPage().then();
      this.emitUpdate();
    };
    this.nextClicked = () => {
      this.nextPage();
      this.emitUpdate();
    };
    this.groupSeparator = false;
    this.messageOverrides = undefined;
    this.pageSize = 20;
    this.numberingSystem = undefined;
    this.startItem = 1;
    this.totalItems = 0;
    this.scale = "m";
    this.defaultMessages = undefined;
    this.effectiveLocale = "";
    this.messages = undefined;
  }
  onMessagesChange() {
    /* wired up by t9n util */
  }
  effectiveLocaleChange() {
    updateMessages(this, this.effectiveLocale);
  }
  effectiveLocaleWatcher() {
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------
  connectedCallback() {
    connectLocalized(this);
    connectMessages(this);
  }
  async componentWillLoad() {
    await setUpMessages(this);
    setUpLoadableComponent(this);
  }
  componentDidLoad() {
    setComponentLoaded(this);
  }
  disconnectedCallback() {
    disconnectLocalized(this);
    disconnectMessages(this);
  }
  // --------------------------------------------------------------------------
  //
  //  Public Methods
  //
  // --------------------------------------------------------------------------
  /** Sets focus on the component's first focusable element. */
  async setFocus() {
    await componentLoaded(this);
    this.el.focus();
  }
  /** Go to the next page of results. */
  async nextPage() {
    this.startItem = Math.min(this.getLastStart(), this.startItem + this.pageSize);
  }
  /** Go to the previous page of results. */
  async previousPage() {
    this.startItem = Math.max(1, this.startItem - this.pageSize);
  }
  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------
  getLastStart() {
    const { totalItems, pageSize } = this;
    const lastStart = totalItems % pageSize === 0
      ? totalItems - pageSize
      : Math.floor(totalItems / pageSize) * pageSize;
    return lastStart + 1;
  }
  showLeftEllipsis() {
    return Math.floor(this.startItem / this.pageSize) > 3;
  }
  showRightEllipsis() {
    return (this.totalItems - this.startItem) / this.pageSize > 3;
  }
  emitUpdate() {
    this.calcitePaginationChange.emit();
  }
  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------
  renderPages() {
    const lastStart = this.getLastStart();
    let end;
    let nextStart;
    // if we don't need ellipses render the whole set
    if (this.totalItems / this.pageSize <= maxPagesDisplayed) {
      nextStart = 1 + this.pageSize;
      end = lastStart - this.pageSize;
    }
    else {
      // if we're within max pages of page 1
      if (this.startItem / this.pageSize < maxPagesDisplayed - 1) {
        nextStart = 1 + this.pageSize;
        end = 1 + 4 * this.pageSize;
      }
      else {
        // if we're within max pages of last page
        if (this.startItem + 3 * this.pageSize >= this.totalItems) {
          nextStart = lastStart - 4 * this.pageSize;
          end = lastStart - this.pageSize;
        }
        else {
          nextStart = this.startItem - this.pageSize;
          end = this.startItem + this.pageSize;
        }
      }
    }
    const pages = [];
    while (nextStart <= end) {
      pages.push(nextStart);
      nextStart = nextStart + this.pageSize;
    }
    return pages.map((page) => this.renderPage(page));
  }
  renderPage(start) {
    const page = Math.floor(start / this.pageSize) + (this.pageSize === 1 ? 0 : 1);
    numberStringFormatter.numberFormatOptions = {
      locale: this.effectiveLocale,
      numberingSystem: this.numberingSystem,
      useGrouping: this.groupSeparator
    };
    const displayedPage = numberStringFormatter.localize(page.toString());
    const selected = start === this.startItem;
    return (h("button", { "aria-current": selected ? "page" : "false", class: {
        [CSS.page]: true,
        [CSS.selected]: selected
      }, onClick: () => {
        this.startItem = start;
        this.emitUpdate();
      } }, displayedPage));
  }
  renderLeftEllipsis() {
    if (this.totalItems / this.pageSize > maxPagesDisplayed && this.showLeftEllipsis()) {
      return h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisStart}` }, "\u2026");
    }
  }
  renderRightEllipsis() {
    if (this.totalItems / this.pageSize > maxPagesDisplayed && this.showRightEllipsis()) {
      return h("span", { class: `${CSS.ellipsis} ${CSS.ellipsisEnd}` }, "\u2026");
    }
  }
  render() {
    const { totalItems, pageSize, startItem } = this;
    const prevDisabled = pageSize === 1 ? startItem <= pageSize : startItem < pageSize;
    const nextDisabled = pageSize === 1 ? startItem + pageSize > totalItems : startItem + pageSize > totalItems;
    return (h(Fragment, null, h("button", { "aria-label": this.messages.previous, class: {
        [CSS.previous]: true,
        [CSS.disabled]: prevDisabled
      }, disabled: prevDisabled, onClick: this.previousClicked }, h("calcite-icon", { flipRtl: true, icon: "chevronLeft", scale: this.scale === "l" ? "m" : "s" })), totalItems > pageSize ? this.renderPage(1) : null, this.renderLeftEllipsis(), this.renderPages(), this.renderRightEllipsis(), this.renderPage(this.getLastStart()), h("button", { "aria-label": this.messages.next, class: {
        [CSS.next]: true,
        [CSS.disabled]: nextDisabled
      }, disabled: nextDisabled, onClick: this.nextClicked }, h("calcite-icon", { flipRtl: true, icon: "chevronRight", scale: this.scale === "l" ? "m" : "s" }))));
  }
  static get delegatesFocus() { return true; }
  static get assetsDirs() { return ["assets"]; }
  get el() { return getElement(this); }
  static get watchers() { return {
    "messageOverrides": ["onMessagesChange"],
    "effectiveLocale": ["effectiveLocaleChange", "effectiveLocaleWatcher"]
  }; }
};
Pagination.style = paginationCss;

export { Pagination as calcite_pagination };
