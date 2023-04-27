import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';

export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  srcDir: 'src',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: null,
      baseUrl: 'https://myapp.local/',
    },
  ],
  plugins: [sass()],
};
