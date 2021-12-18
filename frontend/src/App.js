import './css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Sample from './pages/Sample';

import Success from './pages/Success';
import Secretary from './Users/SECRETARY';
import Finance from './Users/FINANCE';
import President from './Users/PRESIDENT';
import Accounts from './Users/ADMIN/pages/Accounts';

import SectEvents from './Users/SECRETARY/pages/Events';
import SectAccounts from './Users/SECRETARY/pages/Accounts';
import SectReports from './Users/SECRETARY/pages/Reports';
import Attendance from './Users/SECRETARY/pages/Attendance';
import SectDashboard from './Users/SECRETARY/pages/Dashboard';
import PresEvents from './Users/PRESIDENT/pages/Events';
import Scan from './Users/SECRETARY/pages/Scan';
import ProfileAdmin from './Users/ADMIN/pages/Profile';
import Dashboard from './Users/ADMIN/pages/Dashboard';
import Events from './Users/ADMIN/pages/Events';
import PresAccounts from './Users/PRESIDENT/pages/Accounts';

import PresDashboard from './Users/PRESIDENT/pages/Dashboard';
import Transactions from './Users/MEMBER/pages/Transactions';
import MemEvents from './Users/MEMBER/pages/Events';
import Profile from './Users/pages/Profile';
import Payments from './Users/FINANCE/pages/Payments';
import Member from './Users/MEMBER';
import FinEvents from './Users/FINANCE/pages/Events';

import Payment from './Users/pages/Payment';
// import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';
import West from './Clubs/West/';
import East from './Clubs/East/';
import Metro from './Clubs/Metro/';
import North from './Clubs/North/';
import Southern from './Clubs/Southern/';
import Tolosa from './Clubs/Tolosa/';
import UZ from './Clubs/UZ/';
import Wmsu from './Clubs/Wmsu/';
import Funds from './Users/ADMIN/pages/Funds';
import Manual from './Users/SECRETARY/pages/Manual';
import AttendanceList from './Users/SECRETARY/pages/AttendanceList';
import DonateWest from './Clubs/West/pages/Donate';
import DonateEast from './Clubs/East/pages/Donate';
import DonateNorth from './Clubs/North/pages/Donate';
import DonateMetro from './Clubs/Metro/pages/Donate';
import DonateWmsu from './Clubs/Wmsu/pages/Donate';
import DonateTolosa from './Clubs/Tolosa/pages/Donate';
import DonateSsc from './Clubs/West/pages/Donate';
import DonateUz from './Clubs/UZ/pages/Donate';
import PresReports from './Users/PRESIDENT/pages/Reports';
import Send from './Users/SECRETARY/pages/Send';
import Mail from './Users/SECRETARY/pages/Mail';

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
            <Route path="/member" component={() => <Member />} />

            {/* DONATE */}
            <Route path="/donate-west" component={() => <DonateWest />} />
            <Route path="/donate-wmsu" component={() => <DonateWmsu />} />
            <Route path="/donate-ssc" component={() => <DonateSsc />} />
            <Route path="/donate-tolosa" component={() => <DonateTolosa />} />
            <Route path="/donate-north" component={() => <DonateNorth />} />
            <Route path="/donate-east" component={() => <DonateEast />} />
            <Route path="/donate-metro" component={() => <DonateMetro />} />
            <Route path="/donate-uz" component={() => <DonateUz />} />

            {/* CLubs */}
            <Route path="/West" component={() => <West />} />
            <Route path="/East" component={() => <East />} />
            <Route path="/Metro" component={() => <Metro />} />
            <Route path="/North" component={() => <North />} />
            <Route path="/Southern" component={() => <Southern />} />
            <Route path="/Tolosa" component={() => <Tolosa />} />
            <Route path="/UZ" component={() => <UZ />} />
            <Route path="/Wmsu" component={() => <Wmsu />} />

            {/* <Route path="/accounts" component={Accounts}></Route> */}
            {/* <Route path="/profile-admin" component={11207961}></Route> */}

            <Route path="/pres/events" component={PresEvents}></Route>

            {/* ADMIN */}
            <AdminRoute path="/admin" component={Dashboard} />

            <Route path="/accounts" component={Accounts}></Route>
            <Route path="/admin-profile" component={ProfileAdmin}></Route>
            <Route path="/admin-events" component={Events}></Route>
            <Route path="/admin-funds" component={Funds}></Route>

            {/* SECRETARY */}
            <Route path="/sect-events" component={SectEvents}></Route>
            <Route path="/secretary" component={SectDashboard}></Route>
            <Route path="/sect/scan" component={Scan}></Route>
            <Route path="/sect/attendance" component={Attendance}></Route>
            <Route path="/sect-accounts" component={SectAccounts}></Route>
            <Route path="/sect-reports" component={SectReports}></Route>
            <Route path="/sect/manual" component={Manual}></Route>
            <Route path="/send" component={Send}></Route>
            <Route path="/send-to-mail" component={Mail}></Route>
            <Route path="/attendance" component={AttendanceList}></Route>

            {/* PRESIDENT */}
            <Route path="/pres-events" component={PresEvents}></Route>
            <Route path="/president" component={PresDashboard}></Route>
            <Route path="/pres-accounts" component={PresAccounts}></Route>
            <Route path="/pres-reports" component={PresReports}></Route>

            {/* MEMBER */}
            <Route path="/transaction" component={Transactions}></Route>
            <Route path="/Events" component={MemEvents}></Route>
            <Route path="/profile" component={Profile}></Route>

            {/* FINANCE */}
            <Route path="/payments" component={Payments}></Route>
            <Route path="/pay-mem" component={Payment}></Route>
            <Route path="/finance-events" component={FinEvents}></Route>
         </Router>
      </div>
   );
}

export default App;
