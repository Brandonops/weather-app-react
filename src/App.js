import './App.css';
import { BrowserRouter as  Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Weather from './pages/Weather';



function App() {


  return (
    <div className="App">
                  <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/weather">
                <Weather />
              </Route>
            </Switch>
    </div>
  );
}

export default App;
