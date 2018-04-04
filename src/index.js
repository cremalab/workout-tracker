import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import styled from 'styled-components';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
