import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './src/App';
import ReactRedux from './src/react-redux/ReactRedux';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="react-redux" element={<ReactRedux />}></Route>
        <Route path="reselect" element={<h1>reselect</h1>}></Route>
        <Route path="immer" element={<h1>immer</h1>}></Route>
        <Route path="rtk" element={<h1>rtk</h1>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
