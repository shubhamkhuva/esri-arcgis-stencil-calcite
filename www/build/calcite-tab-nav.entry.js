import { r as registerInstance, e as createEvent, h, j as Host, i as getElement } from './index-237c0fcb.js';
import { i as focusElementInGroup, b as getElementDir, w as filterDirectChildren } from './dom-a5def642.js';
import { c as createObserver } from './observers-4b8b0132.js';
import './guid-24e0b9e6.js';
import './resources-96bbaa96.js';

const tabNavCss = "@keyframes in{0%{opacity:0}100%{opacity:1}}@keyframes in-down{0%{opacity:0;transform:translate3D(0, -5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-up{0%{opacity:0;transform:translate3D(0, 5px, 0)}100%{opacity:1;transform:translate3D(0, 0, 0)}}@keyframes in-scale{0%{opacity:0;transform:scale3D(0.95, 0.95, 1)}100%{opacity:1;transform:scale3D(1, 1, 1)}}:root{--calcite-animation-timing:calc(150ms * var(--calcite-internal-duration-factor));--calcite-internal-duration-factor:var(--calcite-duration-factor, 1);--calcite-internal-animation-timing-fast:calc(100ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-medium:calc(200ms * var(--calcite-internal-duration-factor));--calcite-internal-animation-timing-slow:calc(300ms * var(--calcite-internal-duration-factor))}.calcite-animate{opacity:0;animation-fill-mode:both;animation-duration:var(--calcite-animation-timing)}.calcite-animate__in{animation-name:in}.calcite-animate__in-down{animation-name:in-down}.calcite-animate__in-up{animation-name:in-up}.calcite-animate__in-scale{animation-name:in-scale}@media (prefers-reduced-motion: reduce){:root{--calcite-internal-duration-factor:0.01}}:root{--calcite-floating-ui-transition:var(--calcite-animation-timing);--calcite-floating-ui-z-index:600}:host([hidden]){display:none}:host{position:relative;display:flex}:host([scale=s]){min-block-size:1.5rem}:host([scale=m]){min-block-size:2rem}:host([scale=l]){min-block-size:2.75rem}.tab-nav{display:flex;inline-size:100%;justify-content:flex-start;overflow:auto}.tab-nav-active-indicator-container{position:absolute;inset-inline:0px;inset-block-end:0px;block-size:0.125rem;inline-size:100%;overflow:hidden}.tab-nav-active-indicator{position:absolute;inset-block-end:0px;display:block;block-size:0.125rem;background-color:var(--calcite-ui-brand);transition-property:all;transition-timing-function:cubic-bezier(0.4, 0, 0.2, 1);transition-duration:150ms;transition-timing-function:cubic-bezier(0, 0, 0.2, 1)}:host([position=bottom]) .tab-nav-active-indicator{inset-block-end:unset;inset-block-start:0px}:host([position=bottom]) .tab-nav-active-indicator-container{inset-block-end:unset;inset-block-start:0px}:host([bordered]) .tab-nav-active-indicator-container{inset-block-end:unset}:host([bordered][position=bottom]) .tab-nav-active-indicator-container{inset-block-end:0;inset-block-start:unset}@media (forced-colors: active){.tab-nav-active-indicator{background-color:highlight}}";

let TabNav = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.calciteTabChange = createEvent(this, "calciteTabChange", 6);
    this.calciteInternalTabChange = createEvent(this, "calciteInternalTabChange", 6);
    this.animationActiveDuration = 0.3;
    this.resizeObserver = createObserver("resize", () => {
      if (!this.activeIndicatorEl) {
        return;
      }
      // remove active indicator transition duration during resize to prevent wobble
      this.activeIndicatorEl.style.transitionDuration = "0s";
      this.updateActiveWidth();
      this.updateOffsetPosition();
    });
    //--------------------------------------------------------------------------
    //
    //  Private Methods
    //
    //--------------------------------------------------------------------------
    this.handleTabFocus = (event, el, destination) => {
      focusElementInGroup(this.enabledTabTitles, el, destination);
      event.stopPropagation();
      event.preventDefault();
    };
    this.handleContainerScroll = () => {
      // remove active indicator transition duration while container is scrolling to prevent wobble
      this.activeIndicatorEl.style.transitionDuration = "0s";
      this.updateOffsetPosition();
    };
    this.storageId = undefined;
    this.syncId = undefined;
    this.selectedTitle = null;
    this.scale = "m";
    this.layout = "inline";
    this.position = "bottom";
    this.bordered = false;
    this.indicatorOffset = undefined;
    this.indicatorWidth = undefined;
    this.selectedTabId = undefined;
  }
  async selectedTabIdChanged() {
    if (localStorage &&
      this.storageId &&
      this.selectedTabId !== undefined &&
      this.selectedTabId !== null) {
      localStorage.setItem(`calcite-tab-nav-${this.storageId}`, JSON.stringify(this.selectedTabId));
    }
    this.calciteInternalTabChange.emit({
      tab: this.selectedTabId
    });
    this.selectedTitle = await this.getTabTitleById(this.selectedTabId);
  }
  selectedTitleChanged() {
    this.updateOffsetPosition();
    this.updateActiveWidth();
    // reset the animation time on tab selection
    this.activeIndicatorEl.style.transitionDuration = `${this.animationActiveDuration}s`;
  }
  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------
  connectedCallback() {
    var _a;
    this.parentTabsEl = this.el.closest("calcite-tabs");
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.observe(this.el);
  }
  disconnectedCallback() {
    var _a;
    (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.disconnect();
  }
  componentWillLoad() {
    const storageKey = `calcite-tab-nav-${this.storageId}`;
    if (localStorage && this.storageId && localStorage.getItem(storageKey)) {
      const storedTab = JSON.parse(localStorage.getItem(storageKey));
      this.selectedTabId = storedTab;
    }
  }
  componentWillRender() {
    const { parentTabsEl } = this;
    this.layout = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.layout;
    this.position = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.position;
    this.scale = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.scale;
    this.bordered = parentTabsEl === null || parentTabsEl === void 0 ? void 0 : parentTabsEl.bordered;
    // fix issue with active tab-title not lining up with blue indicator
    if (this.selectedTitle) {
      this.updateOffsetPosition();
    }
  }
  componentDidRender() {
    // if every tab title is active select the first tab.
    if (this.tabTitles.length &&
      this.tabTitles.every((title) => !title.selected) &&
      !this.selectedTabId) {
      this.tabTitles[0].getTabIdentifier().then((tab) => {
        this.calciteInternalTabChange.emit({
          tab
        });
      });
    }
  }
  render() {
    const dir = getElementDir(this.el);
    const width = `${this.indicatorWidth}px`;
    const offset = `${this.indicatorOffset}px`;
    const indicatorStyle = dir !== "rtl" ? { width, left: offset } : { width, right: offset };
    return (h(Host, { role: "tablist" }, h("div", { class: "tab-nav", onScroll: this.handleContainerScroll,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.tabNavEl = el) }, h("div", { class: "tab-nav-active-indicator-container",
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.activeIndicatorContainerEl = el) }, h("div", { class: "tab-nav-active-indicator", style: indicatorStyle,
      // eslint-disable-next-line react/jsx-sort-props
      ref: (el) => (this.activeIndicatorEl = el) })), h("slot", null))));
  }
  //--------------------------------------------------------------------------
  //
  //  Event Listeners
  //
  //--------------------------------------------------------------------------
  focusPreviousTabHandler(event) {
    this.handleTabFocus(event, event.target, "previous");
  }
  focusNextTabHandler(event) {
    this.handleTabFocus(event, event.target, "next");
  }
  focusFirstTabHandler(event) {
    this.handleTabFocus(event, event.target, "first");
  }
  focusLastTabHandler(event) {
    this.handleTabFocus(event, event.target, "last");
  }
  internalActivateTabHandler(event) {
    this.selectedTabId = event.detail.tab
      ? event.detail.tab
      : this.getIndexOfTabTitle(event.target);
    event.stopPropagation();
    event.preventDefault();
  }
  activateTabHandler(event) {
    this.calciteTabChange.emit();
    event.stopPropagation();
    event.preventDefault();
  }
  /**
   * Check for active tabs on register and update selected
   *
   * @param event
   */
  updateTabTitles(event) {
    if (event.target.selected) {
      this.selectedTabId = event.detail;
    }
  }
  globalInternalTabChangeHandler(event) {
    if (this.syncId &&
      event.target !== this.el &&
      event.target.syncId === this.syncId &&
      this.selectedTabId !== event.detail.tab) {
      this.selectedTabId = event.detail.tab;
    }
    event.stopPropagation();
  }
  iconStartChangeHandler() {
    this.updateActiveWidth();
  }
  updateOffsetPosition() {
    var _a, _b, _c, _d, _e;
    const dir = getElementDir(this.el);
    const navWidth = (_a = this.activeIndicatorContainerEl) === null || _a === void 0 ? void 0 : _a.offsetWidth;
    const tabLeft = (_b = this.selectedTitle) === null || _b === void 0 ? void 0 : _b.offsetLeft;
    const tabWidth = (_c = this.selectedTitle) === null || _c === void 0 ? void 0 : _c.offsetWidth;
    const offsetRight = navWidth - (tabLeft + tabWidth);
    this.indicatorOffset =
      dir !== "rtl" ? tabLeft - ((_d = this.tabNavEl) === null || _d === void 0 ? void 0 : _d.scrollLeft) : offsetRight + ((_e = this.tabNavEl) === null || _e === void 0 ? void 0 : _e.scrollLeft);
  }
  updateActiveWidth() {
    var _a;
    this.indicatorWidth = (_a = this.selectedTitle) === null || _a === void 0 ? void 0 : _a.offsetWidth;
  }
  getIndexOfTabTitle(el, tabTitles = this.tabTitles) {
    // In most cases, since these indexes correlate with tab contents, we want to consider all tab titles.
    // However, when doing relative index operations, it makes sense to pass in this.enabledTabTitles as the 2nd arg.
    return tabTitles.indexOf(el);
  }
  async getTabTitleById(id) {
    return Promise.all(this.tabTitles.map((el) => el.getTabIdentifier())).then((ids) => {
      return this.tabTitles[ids.indexOf(id)];
    });
  }
  get tabTitles() {
    return filterDirectChildren(this.el, "calcite-tab-title");
  }
  get enabledTabTitles() {
    return filterDirectChildren(this.el, "calcite-tab-title:not([disabled])");
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "selectedTabId": ["selectedTabIdChanged"],
    "selectedTitle": ["selectedTitleChanged"]
  }; }
};
TabNav.style = tabNavCss;

export { TabNav as calcite_tab_nav };
