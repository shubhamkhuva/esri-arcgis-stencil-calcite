import { r as registerInstance, i as getElement } from './index-237c0fcb.js';
import { A as ActiveRouter } from './active-router-b7ea6a26.js';

let RouteTitle = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.titleSuffix = '';
    this.pageTitle = '';
  }
  updateDocumentTitle() {
    const el = this.el;
    if (el.ownerDocument) {
      el.ownerDocument.title = `${this.pageTitle}${this.titleSuffix || ''}`;
    }
  }
  componentWillLoad() {
    this.updateDocumentTitle();
  }
  get el() { return getElement(this); }
  static get watchers() { return {
    "pageTitle": ["updateDocumentTitle"]
  }; }
};
ActiveRouter.injectProps(RouteTitle, [
  'titleSuffix',
]);

export { RouteTitle as stencil_route_title };
