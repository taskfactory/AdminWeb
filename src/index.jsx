import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import NotFound from './pages/notFound';
import { HashRouter, Routes, Route } from 'react-router-dom'
import {RouterItems} from './config.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />}>
          {RouterItems.map((item, idx) => {
            const children = item?.children?.map((child, childIdx) => {
              return (
                <Route path={child.path} element={child.element} key={idx * 1000 + childIdx + 1} />
              )
            })
            return (
              <Route path={item.path} element={item.element} key={idx}>
                {children}
              </Route>
            )
          })}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
