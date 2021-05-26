import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./common/Header";
import Banner from "./common/Banner";
import LocationDetails from "./pages/LocationDetails";
import Rate from "./pages/Rate";
import UserDetails from './pages/UserDetails/index';
import VerifyOtp from './pages/VerifyOtp/index';
import SubmitForm from './pages/SubmitForm/index';
import ErrorComponent from './pages/404/index';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Banner />
        <main>
          <Switch>
            <Route path="/rate">
              <Rate />
            </Route>
            <Route path="/user-details">
              <UserDetails />
            </Route>
            <Route path="/otp">
              <VerifyOtp />
            </Route>
            <Route path="/submit">
              <SubmitForm />
            </Route>
            <Route path="/" exact>
              <LocationDetails />
            </Route>
            <Route component={ErrorComponent} />
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
