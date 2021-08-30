import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

import Authentication from "./components/authentication";
import HomePage from "./components/home-page";
import LoginPage from "./components/login-page";
import CreateAccountPage from "./components/create-account-page";
import ForgotPasswordPage from "./components/forgot-password-page";
import ProfilePage from "./components/profile-page";
import UploadsPage from "./components/uploads-page/index";
import MyOrdersPage from "./components/my-orders-page";

import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "./App.scss";

function App() {
  return (
    <Provider store={store}>
      <div className='App'>
        <Authentication />
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/login'>
              <LoginPage />
            </Route>
            <Route exact path='/create-account'>
              <CreateAccountPage />
            </Route>
            <Route exact path='/forgot-password'>
              <ForgotPasswordPage />
            </Route>
            <Route exact path='/profile'>
              <ProfilePage />
            </Route>
            <Route exact path='/uploads'>
              <UploadsPage />
            </Route>
            <Route exact path='/my-orders'>
              <MyOrdersPage />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
