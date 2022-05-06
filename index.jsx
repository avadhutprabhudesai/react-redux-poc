import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from './src/App';
import ReactRedux from './src/react-redux/ReactRedux';
import Reselect from './src/reselect/Reselect';
import 'semantic-ui-css/semantic.min.css';
import Immer from './src/immer/Immer';
import ReduxToolkit from './src/redux-toolkit/ReduxToolkit';
import Thunk from './src/thunk/Thunk';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<ReactRedux />}></Route>
        <Route path="react-redux" element={<ReactRedux />}></Route>
        <Route path="reselect" element={<Reselect />}></Route>
        <Route path="immer" element={<Immer />}></Route>
        <Route path="rtk" element={<ReduxToolkit />}></Route>
        <Route path="thunk" element={<Thunk />}></Route>
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);
