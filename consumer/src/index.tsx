import 'webpack-external-import/polyfill';

import React, { FunctionComponent, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

// @ts-ignore
import { ExternalComponent, corsImport, importDependenciesOf, getChunkPath } from 'webpack-external-import';

interface Props {}

const PROVIDER_BASE_URL = 'http://localhost:3001/';
const PROVIDER_NAME = '@ethersage/redistribute';

const App: FunctionComponent<Props> = () => {
  const [isLoaded, setState] = useState(false);
  useEffect(() => {
    corsImport(`${PROVIDER_BASE_URL}importManifest.js`).then(() =>
      Promise.all([
        importDependenciesOf(PROVIDER_BASE_URL, PROVIDER_NAME, 'Button.js').then((url: string) =>
          import(/* webpackIgnore:true */ url)
        ),
        importDependenciesOf(PROVIDER_BASE_URL, PROVIDER_NAME, 'getText.js').then((url: string) =>
          import(/* webpackIgnore:true */ url)
        ),
      ]).then(() => setState(true))
    );
  });

  if (!isLoaded) {
    return <div>'loading...'</div>;
  }
  // @ts-ignore
  const getText = __webpack_require__('getText').default;

  // @ts-ignore
  const Button = __webpack_require__('Button').default;

  return <Button onClick={() => alert('clicked')}>{getText()}</Button>;
};

ReactDOM.render(<App />, document.getElementById('root'));
