import { Provider } from 'react-redux';
import tipStore from './store';
import MenuForm from './MenuForm';
import MenuItems from './MenuItems';
import TipCalculator from './TipCalculator';

export default function Reselect() {
  return (
    <Provider store={tipStore}>
      <div className="reselect">
        <MenuForm />
        <MenuItems />
        <TipCalculator />
      </div>
    </Provider>
  );
}
