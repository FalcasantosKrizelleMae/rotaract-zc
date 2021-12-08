import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
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
import ProfileAdmin from './Users/ADMIN/pages/Profile';
import Dashboard from './Users/ADMIN/pages/Dashboard';
import Events from './Users/ADMIN/pages/Events';

import PresDashboard from './Users/PRESIDENT/pages/Dashboard';
import Transactions from './Users/MEMBER/pages/Transactions';
import MemDashboard from './Users/MEMBER/';
import MemProfile from './Users/MEMBER/pages/Profile';
import Payments from './Users/FINANCE/pages/Payments';
// import ProtectedRoute from './ProtectedRoute';
import West from './Clubs/West/';
import East from './Clubs/East/';
import Metro from './Clubs/Metro/';
import North from './Clubs/North/';
import Southern from './Clubs/Southern/';
import Tolosa from './Clubs/Tolosa/';
import UZ from './Clubs/UZ/';
import Wmsu from './Clubs/Wmsu/';

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

            <Route path="/secretary" component={() => <Secretary />} />

            <Route path="/finance" component={() => <Finance />} />

            <Route path="/president" component={() => <President />} />

            <Route path="/West" component={() => <West />} />
            <Route path="/East" component={() => <East />} />
            <Route path="/Metro" component={() => <Metro />} />
            <Route path="/North" component={() => <North />} />
            <Route path="/Southern" component={() => <Southern />} />
            <Route path="/Tolosa" component={() => <Tolosa />} />
            <Route path="/UZ" component={() => <UZ />} />
            <Route path="/Wmsu" component={() => <Wmsu />} />

            {/* <Route path="/accounts" component={Accounts}></Route> */}
            <Route path="/profile-admin" component={11207961}></Route>

            <Route path="/pres/events" component={PresEvents}></Route>

            {/* ADMIN */}
            <Route path="/admin" component={Dashboard}></Route>
            <Route path="/accounts" component={Accounts}></Route>
            <Route path="/profile" component={ProfileAdmin}></Route>
            <Route path="/admin-events" component={Events}></Route>

            {/* SECRETARY */}
            <Route path="/sect-events" component={SectEvents}></Route>
            <Route path="/secretary" component={SectDashboard}></Route>
            <Route path="/sect/scan" component={Scan}></Route>
            <Route path="/sect/attendance" component={Attendance}></Route>

            {/* PRESIDENT */}
            <Route path="/pres-events" component={PresEvents}></Route>
            <Route path="/president" component={PresDashboard}></Route>

            {/* MEMBER */}
            <Route path="/transaction" component={Transactions}></Route>
            <Route path="/member" component={MemDashboard}></Route>
            <Route path="/member-profile" component={MemProfile}></Route>

            {/* FINANCE */}
            <Route path="/payments" component={Payments}></Route>
         </Router>
      </div>
   );
}

export default App;
