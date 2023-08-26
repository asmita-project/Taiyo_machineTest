import logo from './logo.svg';
import './App.css';
import Connector from './component/connector/Sidepanel';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from 'react-redux';
import store from './redux/store';


function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Connector />
      </div>
    </Provider>

  );
}

export default App;
