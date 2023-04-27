import { createStore } from '@stencil/store';

const store = createStore({
  modal: false,
  servicesName: null,
  servicesDescription: null,
  imageUrl: null,
  loadingServicesList: true,
  loadingServicesDetails: false,
  loadingServicesImage: false,
});

export const dispose = store.dispose;
export const state = store.state;
export const reset = store.reset;
