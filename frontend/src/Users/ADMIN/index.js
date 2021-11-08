import React from 'react';
import Accounts from './pages/Accounts';
import ProfileAdmin from './pages/Profile';
import Dashboard from './pages/Dashboard';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const MemberPage = () => {
   return (
      <div>
         <Router>
            <Switch>
               <Route path="/admin" component={Dashboard}></Route>
               <Route path="/accounts" component={Accounts}></Route>
               <Route path="/profile-admin" component={ProfileAdmin}></Route>
            </Switch>
         </Router>
      </div>
   );
};

export default MemberPage;
