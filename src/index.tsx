// eslint-disable-next-line import/no-extraneous-dependencies
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

import './index.css';
import { store } from './app/store';

import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

root.render(<Root />);
