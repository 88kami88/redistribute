import 'webpack-external-import/polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ExternalComponent, corsImport, importDependenciesOf, getChunkPath } from 'webpack-external-import';

interface Props {}

class App extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    corsImport('http://localhost:3001/importManifest.js').then(() =>
      Promise.all([
        importDependenciesOf('http://localhost:3001/', 'producer', 'Button.js').then(url =>
          import(/* webpackIgnore:true */ url)
        ),
        importDependenciesOf('http://localhost:3001/', 'producer', 'getText.js').then(url =>
          import(/* webpackIgnore:true */ url)
        ),
      ]).then(() => this.setState({ isLoaded: true }))
    );
  }

  render() {
    const { isLoaded } = this.state;

    if (!isLoaded) {
      return 'loading...';
    }

    const getText = __webpack_require__('getText').default;
    const Button = __webpack_require__('Button').default;

    return <Button onClick={() => alert('clicked')}>{getText()}</Button>;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
