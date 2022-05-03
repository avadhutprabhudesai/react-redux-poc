import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './src/App';
import ReactRedux from './src/react-redux/ReactRedux';
import Reselect from './src/reselect/Reselect';
import 'semantic-ui-css/semantic.min.css';
import Immer from './src/immer/Immer';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ReactRedux />}></Route>
        <Route path="react-redux" element={<ReactRedux />}></Route>
        <Route path="reselect" element={<Reselect />}></Route>
        <Route path="immer" element={<Immer />}></Route>
        <Route path="rtk" element={<h1>rtk</h1>}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
