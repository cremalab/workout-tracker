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
            <InnerWrapper>
                <div>
                    <Route exact path="/" component={App} />
                    <Route path="/calendar" component={Calendar} />
                </div>
            </InnerWrapper>
        </OuterWrapper>
    </Router>
), document.getElementById('root'));

registerServiceWorker();
