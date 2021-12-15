import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
   let history = useHistory();
   const auth = localStorage.getItem('auth') ?? false;
   const role = localStorage.getItem('role');
   console.log(auth);
   return (
      <Route
         {...rest}
         render={(props) => {
            if (role === 'admin') {
               return <Component {...props} />;
            } else if (auth && role !== 'admin') {
               history.goBack();
            } else {
               return (
                  <Redirect
                     to={{
                        pathname: '/login',
                        state: { from: props.location },
                     }}
                  />
               );
            }
         }}
      />
   );
};

export default AdminRoute;
