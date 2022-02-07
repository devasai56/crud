import logo from './logo.svg';
import './App.css'; 
import Router from './Routes';
import { Provider } from 'react-redux';
import {store} from './Redux/store'

function App() {
  return (
    <Provider store={store}>
       <Router />
   </Provider>
  );
}

export default App;
