import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom';

import RegistrationForm from './pages/RegistrationForm';
import "./assets/scss/theme.scss"
import PaymentScreen from './pages/PaymentScreen';


function App() {
  return (
    <div className="App">      
      <Switch>
        <Route path="/" component={RegistrationForm} exact/>
        <Route path="/payment" component={PaymentScreen} exact/>
      </Switch>
    </div>
  );
}

export default App;
