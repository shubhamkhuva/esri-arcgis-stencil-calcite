export { Components, JSX } from './components';
import '@stencil-community/router';
import { setAssetPath } from '@esri/calcite-components/dist/components';
setAssetPath(location.href);
