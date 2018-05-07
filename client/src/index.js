import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import styled from 'styled-components';
import runnerImage from './assets/runner.jpg';
import plateImage from './assets/plate.jpg';
import App from './components/App/App';
import Calendar from './components/Calendar';
import LogIn from './components/LogIn';
import Dashboard from './components/Dashboard';
import NavBar from './components/NavBar';
import Profile from './components/Profile';


const OuterWrapper = styled.div`
    height: 100vh;
    background: linear-gradient(
        rgba(192,192,192,.2),
        rgba(192,192,192,.2)
      ), url(${plateImage});
    background-size: cover;
    background-attachment: fixed;
    background-repeat: no-repeat;
    overflow: hidden ;
`;

const InnerWrapper = styled.div`
    margin: 10%;
`;

ReactDOM.render((
    <Router>
        <OuterWrapper>
            <NavBar />
            <InnerWrapper>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/calendar" component={Calendar} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/profile" component={Profile} />
                </div>
            </InnerWrapper>
        </OuterWrapper>
    </Router>
), document.getElementById('root'));

registerServiceWorker();
