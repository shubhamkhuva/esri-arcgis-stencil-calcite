import { g as getRenderingRef, f as forceUpdate, r as registerInstance, h } from './index-237c0fcb.js';

const appendToMap = (map, propName, value) => {
    const items = map.get(propName);
    if (!items) {
        map.set(propName, [value]);
    }
    else if (!items.includes(value)) {
        items.push(value);
    }
};
const debounce = (fn, ms) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            timeoutId = 0;
            fn(...args);
        }, ms);
    };
};

/**
 * Check if a possible element isConnected.
 * The property might not be there, so we check for it.
 *
 * We want it to return true if isConnected is not a property,
 * otherwise we would remove these elements and would not update.
 *
 * Better leak in Edge than to be useless.
 */
const isConnected = (maybeElement) => !('isConnected' in maybeElement) || maybeElement.isConnected;
const cleanupElements = debounce((map) => {
    for (let key of map.keys()) {
        map.set(key, map.get(key).filter(isConnected));
    }
}, 2000);
const stencilSubscription = () => {
    if (typeof getRenderingRef !== 'function') {
        // If we are not in a stencil project, we do nothing.
        // This function is not really exported by @stencil/core.
        return {};
    }
    const elmsToUpdate = new Map();
    return {
        dispose: () => elmsToUpdate.clear(),
        get: (propName) => {
            const elm = getRenderingRef();
            if (elm) {
                appendToMap(elmsToUpdate, propName, elm);
            }
        },
        set: (propName) => {
            const elements = elmsToUpdate.get(propName);
            if (elements) {
                elmsToUpdate.set(propName, elements.filter(forceUpdate));
            }
            cleanupElements(elmsToUpdate);
        },
        reset: () => {
            elmsToUpdate.forEach((elms) => elms.forEach(forceUpdate));
            cleanupElements(elmsToUpdate);
        },
    };
};

const unwrap = (val) => (typeof val === 'function' ? val() : val);
const createObservableMap = (defaultState, shouldUpdate = (a, b) => a !== b) => {
    const unwrappedState = unwrap(defaultState);
    let states = new Map(Object.entries(unwrappedState !== null && unwrappedState !== void 0 ? unwrappedState : {}));
    const handlers = {
        dispose: [],
        get: [],
        set: [],
        reset: [],
    };
    const reset = () => {
        var _a;
        // When resetting the state, the default state may be a function - unwrap it to invoke it.
        // otherwise, the state won't be properly reset
        states = new Map(Object.entries((_a = unwrap(defaultState)) !== null && _a !== void 0 ? _a : {}));
        handlers.reset.forEach((cb) => cb());
    };
    const dispose = () => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };
    const get = (propName) => {
        handlers.get.forEach((cb) => cb(propName));
        return states.get(propName);
    };
    const set = (propName, value) => {
        const oldValue = states.get(propName);
        if (shouldUpdate(value, oldValue, propName)) {
            states.set(propName, value);
            handlers.set.forEach((cb) => cb(propName, value, oldValue));
        }
    };
    const state = (typeof Proxy === 'undefined'
        ? {}
        : new Proxy(unwrappedState, {
            get(_, propName) {
                return get(propName);
            },
            ownKeys(_) {
                return Array.from(states.keys());
            },
            getOwnPropertyDescriptor() {
                return {
                    enumerable: true,
                    configurable: true,
                };
            },
            has(_, propName) {
                return states.has(propName);
            },
            set(_, propName, value) {
                set(propName, value);
                return true;
            },
        }));
    const on = (eventName, callback) => {
        handlers[eventName].push(callback);
        return () => {
            removeFromArray(handlers[eventName], callback);
        };
    };
    const onChange = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        // We need to unwrap the defaultState because it might be a function.
        // Otherwise we might not be sending the right reset value.
        const unReset = on('reset', () => cb(unwrap(defaultState)[propName]));
        return () => {
            unSet();
            unReset();
        };
    };
    const use = (...subscriptions) => {
        const unsubs = subscriptions.reduce((unsubs, subscription) => {
            if (subscription.set) {
                unsubs.push(on('set', subscription.set));
            }
            if (subscription.get) {
                unsubs.push(on('get', subscription.get));
            }
            if (subscription.reset) {
                unsubs.push(on('reset', subscription.reset));
            }
            if (subscription.dispose) {
                unsubs.push(on('dispose', subscription.dispose));
            }
            return unsubs;
        }, []);
        return () => unsubs.forEach((unsub) => unsub());
    };
    const forceUpdate = (key) => {
        const oldValue = states.get(key);
        handlers.set.forEach((cb) => cb(key, oldValue, oldValue));
    };
    return {
        state,
        get,
        set,
        on,
        onChange,
        use,
        dispose,
        reset,
        forceUpdate,
    };
};
const removeFromArray = (array, item) => {
    const index = array.indexOf(item);
    if (index >= 0) {
        array[index] = array[array.length - 1];
        array.length--;
    }
};

const createStore = (defaultState, shouldUpdate) => {
    const map = createObservableMap(defaultState, shouldUpdate);
    map.use(stencilSubscription());
    return map;
};

const store = createStore({
  modal: false,
  servicesName: null,
  servicesDescription: null,
  imageUrl: null,
  loadingServicesList: true,
  loadingServicesDetails: false,
  loadingServicesImage: false,
});

const dispose = store.dispose;
const state = store.state;
const reset = store.reset;

const _apiHost = 'https://sampleserver6.arcgisonline.com/arcgis';
const _endPoints = {
  GET_SERVICES_LIST: '/rest/services?f=pjson',
  GET_SERVICES_DETAILS: `/rest/services/${'serviceName'}/ImageServer?f=pjson`,
  GET_SERVICES_IMAGE: `/rest/services/${'serviceName'}/ImageServer/exportImage?bbox=${'extent'}&bboxSR=&size=400,400&format=jpgpng&pixelType=UNKNOWN&f=pjson`,
};

async function request(endPoint, method = 'GET') {
  try {
    const options = {
      method,
    };
    let response = await fetch(`${_apiHost}${endPoint}`, options);
    if (!response.ok) {
      return null;
    } else {
      return response.json();
    }
  } catch (err) {
    return null;
  }
}

const getFilteredArray = (data, key, value) => {
  return data.filter(item => item[key] === value);
};

const appHomeCss = ".app-home{padding:10px}.imageDiv{width:fit-content;margin:auto}.servicesGrids{width:100%;display:flex;gap:10px}.servicesBox{width:25%}.fontBold{font-weight:bold}.loadingCard{background:#eee;background:linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);border-radius:5px;background-size:200% 100%;animation:1.5s shine linear infinite;height:20vh}.loadingImage{background:#eee;background:linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);border-radius:5px;background-size:200% 100%;animation:1.5s shine linear infinite;height:400px;width:400px}@keyframes shine{to{background-position-x:-200%}}";

let AppHome = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.services = [];
  }
  componentWillLoad() {
    this.getServices();
  }
  openModal(name) {
    state.servicesDescription = null;
    state.imageUrl = null;
    state.modal = true;
    state.servicesName = name;
    this.getServicesDetails(name);
  }
  async getServices() {
    try {
      let response = await request(_endPoints.GET_SERVICES_LIST);
      if (response["services"]) {
        this.services = getFilteredArray(response["services"], "type", "ImageServer");
      }
      state.loadingServicesList = false;
    }
    catch (e) {
      state.loadingServicesList = false;
    }
  }
  async getServicesDetails(name) {
    try {
      state.loadingServicesDetails = true;
      state.loadingServicesImage = true;
      let response = await request(_endPoints.GET_SERVICES_DETAILS.replace("serviceName", name));
      if (response["description"]) {
        state.servicesDescription = response["description"];
        this.getImageFromExtent(response["fullExtent"]);
      }
      state.loadingServicesDetails = false;
    }
    catch (e) {
      state.loadingServicesDetails = false;
    }
  }
  async getImageFromExtent(fullExtent) {
    try {
      let response = await request(_endPoints.GET_SERVICES_IMAGE.replace("extent", `${fullExtent.xmin},${fullExtent.ymin},${fullExtent.xmax},${fullExtent.ymax}`).replace("serviceName", state.servicesName));
      if (response["href"]) {
        state.imageUrl = response.href;
      }
      state.loadingServicesImage = false;
    }
    catch (e) {
      state.loadingServicesImage = false;
    }
  }
  render() {
    return (h("div", { class: "app-home" }, state.loadingServicesList ? (h("div", { class: "servicesGrids" }, h("div", { class: "servicesBox" }, h("div", { class: "loadingCard" })), h("div", { class: "servicesBox" }, h("div", { class: "loadingCard" })), h("div", { class: "servicesBox" }, h("div", { class: "loadingCard" })), h("div", { class: "servicesBox" }, h("div", { class: "loadingCard" })))) : (h("div", { class: "servicesGrids" }, this.services.map((item) => {
      return (h("calcite-card", { class: "servicesBox" }, h("span", { slot: "title" }, item.name), h("span", { slot: "subtitle" }, "Image Server"), h("calcite-chip", { slot: "footer-end", value: "calcite chip", icon: "view-visible", onClick: () => this.openModal(item.name) }, "View Details")));
    }))), state.modal && (h("calcite-modal", { "aria-labelledby": "modal-title", id: "example-modal", open: state.modal, closeButtonDisabled: true, fullScreen: true }, h("div", { slot: "header", id: "modal-title" }, state.servicesName), h("div", { slot: "content" }, h("calcite-label", { class: "fontBold" }, "Description"), state.loadingServicesDetails ? (h("div", { class: "loadingCard" })) : (h("div", { innerHTML: state.servicesDescription })), h("calcite-label", { class: "fontBold" }, "Image"), h("div", { class: "imageDiv" }, state.loadingServicesImage ? (h("div", { class: "loadingImage" })) : (h("img", { src: state.imageUrl })))), h("calcite-button", { slot: "back", kind: "neutral", width: "full", onClick: () => (state.modal = false) }, "Close")))));
  }
};
AppHome.style = appHomeCss;

export { AppHome as app_home };
