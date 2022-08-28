import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom';
import routes from './routes';

const App = () => (
  <HashRouter>
    <Routes>
      {routes.map(({ path, Page }) => (
        <Route key={path} path={path} element={<Page />} />
      ))}
    </Routes>
  </HashRouter>
);



const render = () => {
  ReactDOM.render(<App />, document.body);
};

render();