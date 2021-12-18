import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

const AdminRoute = ({ component: Component, ...rest }) => {
   let history = useHistory();
   const auth = localStorage.getItem('auth') ?? false;
   const role = localStorage.getItem('role');

   return (
      <Route
         {...rest}
         render={(props) => {
            if (auth && role === 'admin') {
               return (
                  <>
                     {' '}
                     <Redirect
                        to={{
                           pathname: '/admin',
                        }}
                     />
                     <Component {...props} />;
                  </>
               );
            } else if (role === 'admin') {
               return (
                  <>
                     <Redirect
                        to={{
                           pathname: '/admin',
                        }}
                     />
                     <Component {...props} />;
                  </>
               );
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
