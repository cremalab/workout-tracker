import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker'
import 'semantic-ui-css/semantic.min.css'
import './index.css'
import styled from 'styled-components'
import NavBar from './components/NavBar';
import plateImage from './assets/plate.jpg'
import App from './components/App/App'
import LogIn from './components/LogIn'
import Dashboard from './components/Dashboard'
import Calendar from './components/Calendar'
import Profile from './components/Profile';
import barbellImage from './assets/barbell.jpg'
import ModalWorkout from './components/ModalWorkout'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from './state/reducers'
import {composeWithDevTools} from 'redux-devtools-extension'

const createStoreWithMiddleware = composeWithDevTools((applyMiddleware()))(createStore);
const store=createStoreWithMiddleware(reducers);

const OuterWrapper = styled.div`
    height: 100vh;
    background: linear-gradient(
        rgba(192,192,192,.2),
        rgba(192,192,192,.2)
      ), url(${barbellImage});
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    overflow: hidden ;
`;

const InnerWrapper = styled.div`
    margin: 10%;
`;

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <OuterWrapper>
                <NavBar />
                <InnerWrapper>
                    <div>
                        <Route exact path="/" component={App} />
                        <Route path="/login" component={LogIn} />
                        <Route path="/dashboard" component={Dashboard} />
                        <Route path="/calendar" component={Calendar} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/workout" component={ModalWorkout} />
                    </div>
                </InnerWrapper>
            </OuterWrapper>
        </Router>
    </Provider>
), document.getElementById('root'));

registerServiceWorker();
