import { LoadingOutlined } from "@ant-design/icons";
import React, { Suspense } from "react";
import AuthRoute from "@Components/AuthRoute";
import PrivateRoute from "@Components/PrivateRoute"
import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import LoginForm from "@Containers/Login";
import RegisterForm from "@Containers/Register";
import { ROUTES } from "@Constants/route";
import { useAppSelector } from '@Store/hooks'
const BASE_NAME = process.env.REACT_APP_BASE_ROOT;
const history = createBrowserHistory({ basename: BASE_NAME });

//Dùng route nào thì khai báo tiếp trong này
export const routes: any = {
  login: {
    path: ROUTES.LOGIN,
    component: LoginForm,
    isAuth: false,
  },
  register: {
    path: ROUTES.SIGNUP,
    component: RegisterForm,
    isAuth: false,
  }
};

//Kệ cái này !!!
routes.home = {
  path: "/",
  component: LoginForm,
  isAuth: true,
  redirect: false,
};

const App: React.FC = (): JSX.Element => {
  const user = useAppSelector(state => state.user)
  const isLoggedIn = user.isLoggedIn;

  return (
    <Router history={history}>
      <Suspense fallback={<div className="h-full flex align-middle justify-center"><LoadingOutlined /></div>}>
        <div className="wrapper">
          <Switch>
            {Object.keys(routes).map((key, index) => {
              // if (routes[key].redirect) {
              //   return (
              //     <AuthRoute
              //       key={index}
              //       extract
              //       path={`${routes[key].path}/:redirectUrl`}
              //       component={routes[key].component}
              //     />
              //   );
              // } else 
              if (isLoggedIn && routes[key].isAuth) {
                return (
                  <PrivateRoute
                    key={index}
                    extract
                    path={routes[key].path}
                    component={routes[key].component}
                  />
                );
              } else {
                return (
                  <AuthRoute
                    key={index}
                    extract
                    path={routes[key].path}
                    component={routes[key].component}
                  />
                );
              }
            })}
            {isLoggedIn ? (
              <PrivateRoute component={LoginForm} />
            ) : (
              <AuthRoute component={LoginForm} />
            )}
          </Switch>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
