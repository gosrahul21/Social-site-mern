import React,{Fragment,useEffect } from 'react';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import './App.css';
import store from './store';
import {Provider} from 'react-redux'; 
import Alert from "./components/layout/Alert";
import {loadUser} from './actions/auth';
import connect from  'react-redux';
import Dashboard from './components/dashboard/Dashboard'
import PrivateRoute from "./routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
import {getCurrentProfile} from './actions/profile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation'
import Profiles from './components/profiles/Profiles'
import Profile from './components/profile/Profile'
import Posts from './components/posts/Posts'


const App = () => {


  useEffect(()=>{
      store.dispatch(loadUser());
      store.dispatch(getCurrentProfile())
  },[])


    return (
        <Provider store= {store}>

        
        <Router>
        <div>
           <Navbar/>
           <Route exact path="/" component={Landing}/>
           <section className="container">
               <Alert/>
               <Switch>
                   <Route exact path="/register" component={Register}/>
                   <Route exact path="/login" component={Login}/>
                   <PrivateRoute exact path="/dashboard" component={Dashboard}/>
                   <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
                   <PrivateRoute exact path="/add-experience" component={AddExperience}></PrivateRoute>
                   <PrivateRoute exact path="/add-education" component ={ AddEducation}/>
                   <PrivateRoute exact path="/edit-profile" component={CreateProfile}/>
                   <Route exact path="/getAllProfiles" component={Profiles}/>
                   <Route exact path="/profile/:id" component={Profile}/>
                   <PrivateRoute exact path ="/post" component ={Posts}/>
               </Switch>
           </section>
        </div>
        </Router>
        </Provider>
        
    )
}


export default App;