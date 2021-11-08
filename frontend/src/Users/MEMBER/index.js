import React from 'react';
import Navbar from './components/Sidebar/Navbar';
import Profile from './pages/Profile';
import Events from './pages/Events';
import Transactions from './pages/Transactions';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const MemberPage = () => {
   return (
      <div>
         <Router>
            <Navbar />
            <Switch>
               <Route path="/member/profile" component={Profile}></Route>
               <Route
                  path="/member/transactions"
                  component={Transactions}
               ></Route>
               <Route path="/member/events" component={Events}></Route>
            </Switch>
         </Router>
      </div>
   );
};

export default MemberPage;
