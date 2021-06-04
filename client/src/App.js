import 'bootstrap/dist/css/bootstrap.min.css'
import { Route, Switch } from 'react-router-dom';

import RegistrationForm from './pages/RegistrationForm';
import "./assets/scss/theme.scss"


function App() {
  return (
    <div className="App">      
      <Switch>
        <Route path="/" component={RegistrationForm} exact/>
      </Switch>
    </div>
  );
}

export default App;
