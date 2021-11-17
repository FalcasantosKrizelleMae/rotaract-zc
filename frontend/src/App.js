import './css/App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberHome from './Users/MEMBER/';
import Sample from './pages/Sample';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Secretary from './Users/SECRETARY';
import Finance from './Users/FINANCE';
import President from './Users/PRESIDENT';
import Accounts from './Users/ADMIN/pages/Accounts';

import SectEvents from './Users/SECRETARY/pages/Events';
import Attendance from './Users/SECRETARY/pages/Attendance';
import SectDashboard from './Users/SECRETARY/pages/Dashboard';
import PresEvents from './Users/PRESIDENT/pages/Events';
import Scan from './Users/SECRETARY/pages/Scan';
import Profile from './Users/MEMBER/pages/Profile';
import ProfileAdmin from './Users/ADMIN/pages/Profile';
import Dashboard from './Users/ADMIN/pages/Dashboard';
import Events from './Users/ADMIN/pages/Events';
// import ProtectedRoute from './ProtectedRoute';

function App() {
   return (
      <div className="App">
         <Router>
            <Switch>
               <Route exact path="/" component={Home} />
               <Route path="/login" component={Login} />
               <Route path="/sample" component={Sample} />
               <Route path="/register" component={Register} />

               <Route
                  exact
                  path="/payment"
                  component={() => <Payment authorized={true} />}
               ></Route>
               <Route path="/success" component={Success}></Route>
            </Switch>

            <Route path="/member" component={() => <MemberHome />} />

            <Route path="/secretary" component={() => <Secretary />} />

            <Route path="/finance" component={() => <Finance />} />

            <Route path="/president" component={() => <President />} />

            {/* <Route path="/accounts" component={Accounts}></Route> */}
            <Route path="/profile-admin" component={11207961}></Route>

            <Route path="/pres/events" component={PresEvents}></Route>

            <Route path="/member/profile" component={Profile}></Route>

            {/* ADMIN */}
            <Route path="/admin" component={Dashboard}></Route>
            <Route path="/accounts" component={Accounts}></Route>
            <Route path="/profile-admin" component={ProfileAdmin}></Route>
            <Route path="/admin-events" component={Events}></Route>

            {/* SECRETARY */}

            <Route path="/sect-events" component={SectEvents}></Route>
            <Route path="/secretary" component={SectDashboard}></Route>
            <Route path="/sect/scan" component={Scan}></Route>
            <Route path="/sect/attendance" component={Attendance}></Route>
         </Router>
      </div>
   );
}

export default App;
