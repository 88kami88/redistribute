import 'webpack-external-import/polyfill';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { ExternalComponent, corsImport, importDependenciesOf, getChunkPath } from 'webpack-external-import';

interface Props {}

class App extends Component {
  constructor(props: Props) {
    super(props);
    this.state = {
      loaded: false,
      manifestLoaded: false,
    };
  }

  componentDidMount() {
    corsImport('http://localhost:3001/importManifest.js').then(() => {
      this.setState({ manifestLoaded: true });
      import(/* webpackIgnore:true */ 'http://localhost:3001/getText.js').then(() => {
        const getText = __webpack_require__('getText');
        console.log(getText.default());
        setTimeout(() => {
          this.setState({ loaded: true });
        }, 2000);
      });
    });
  }

  render() {
    const { manifestLoaded, loaded } = this.state;

    if (!manifestLoaded || !loaded) {
      return 'loading...';
    }

    return null;
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
