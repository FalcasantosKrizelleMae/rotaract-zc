import './css/App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MemberHome from './Users/MEMBER/';
import Admin from './Users/ADMIN/';
import Sample from './pages/Sample';
import Payment from './pages/Payment';
import Success from './pages/Success';
import Secretary from './Users/SECRETARY';
import Finance from './Users/FINANCE';
import President from './Users/PRESIDENT';
import Accounts from './Users/ADMIN/pages/Accounts';
import ProfileAdmin from './Users/ADMIN/pages/Profile';
import Events from './Users/ADMIN/pages/Events';
import SectEvents from './Users/SECRETARY/pages/Events';
import Attendance from './Users/SECRETARY/pages/Attendance';
import Qrcode from './pages/Qrcode';
import PresEvents from './Users/PRESIDENT/pages/Events';
import Scan from './Users/SECRETARY/pages/Scan';
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

            <Route path="/admin" component={() => <Admin />} />

            <Route path="/member" component={() => <MemberHome />} />

            <Route path="/secretary" component={() => <Secretary />} />

            <Route path="/finance" component={() => <Finance />} />

            <Route path="/president" component={() => <President />} />

            {/* ADMIN */}
            <Route path="/accounts" component={Accounts}></Route>
            <Route path="/profile-admin" component={ProfileAdmin}></Route>
            <Route path="/events" component={Events}></Route>
            <Route path="/sect/events" component={SectEvents}></Route>

            <Route path="/qrcode" component={Qrcode}></Route>

            <Route path="/sect/scan" component={Scan}></Route>
            <Route path="/sect/attendance" component={Attendance}></Route>

            <Route path="/pres/events" component={PresEvents}></Route>
         </Router>
      </div>
   );
}

export default App;
