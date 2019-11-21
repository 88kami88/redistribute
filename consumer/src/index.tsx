/* globals __webpack_require__, document, window */

import 'webpack-external-import/polyfill';

import React, { FunctionComponent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { corsImport, importDependenciesOf } from 'webpack-external-import';

const PROVIDER_BASE_URL = 'http://localhost:3001/';
const PROVIDER_NAME = '@ethersage/components';

const App: FunctionComponent = () => {
  const [isLoaded, setState] = useState(false);
  useEffect(() => {
    corsImport(`${PROVIDER_BASE_URL}importManifest.js`).then(() =>
      Promise.all([
        importDependenciesOf(PROVIDER_BASE_URL, PROVIDER_NAME, 'Touchable.js').then((url: string) =>
          import(/* webpackIgnore:true */ url)
        ),
      ]).then(() => setState(true))
    );
  });

  if (!isLoaded) {
    return <div>loading...</div>;
  }

  const Touchable = __webpack_require__('Touchable').default;

  // eslint-disable-next-line no-alert
  return <Touchable onClick={(): void => window.alert('clicked')}>click me</Touchable>;
};

ReactDOM.render(<App />, document.getElementById('root'));
