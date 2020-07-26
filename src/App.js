import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider, connect } from 'react-redux';
// import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from './components/Homepage.js';
import PageNotFound from './components/PageNotFound.js';

import configureStore from './components/store/configureStore';

import './scss/main.scss';
// import './components/layout/node_modules/antd/dist/antd.css';

// redux store
const store = configureStore();

// Main Container Component
function RenderRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

let Root = connect()(RenderRoutes);

// Rendering main component
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Root />
      </Provider>
    </div>
  );
}

export default App;
