// Copyright: Panshak Solomon
// A.P. Leventis Ornithological Research Institute.
// University of Jos Biological Conservatory
// All right reserved
// ©2021 and beyond

import React, { useEffect} from 'react'
import SnackbarProvider from 'react-simple-snackbar'
import { BrowserRouter, Route, Switch, Redirect, useLocation } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import HomePage from './pages/HomePage';
import Profile from './pages/Profile/Profile';
import Users from './pages/Users/Users';
import PubDetails from './pages/PubDetails/PubDetails';
import NewsDetails from './pages/NewsDetails/NewsDetails';
import DocumentDetails from './pages/DocumentDetails/DocumentDetails';
import ResearchDetails from './pages/ResearchDetails/ResearchDetails'
import ThesesDetails from './pages/ThesesDetails/ThesesDetails'
import AuthPage from './pages/AuthPage';
import Publications from './pages/Publications/Publications';
import Documents from './pages/Documents/Documents';
import News from './pages/News/News';
import Nav from './components/Nav/Nav'
import BoardMembers from './pages/People/BoardMembers';
import Research from './pages/Research/Research';
import Theses from './pages/Theses/Theses';
import AboutUs from './pages/AboutUs';
import ContactPage from './pages/ContactPage';
import Subscribe from './pages/Subscribe';
import Forgot from './pages/Password/Forgot';
import Reset from './pages/Password/Reset';
import Moderator from './pages/Moderator/Moderator'
import ManageProfiles from './pages/ManageProfiles/ManageProfiles';
import FullText from './pages/FullText'
import Membership from './pages/Membership';
import InstructionToAuthors from './pages/InstructionToAuthors';
import Regions from './pages/Regions/Regions'
import Region from './pages/Region/Region';


function App() {

  const user = JSON.parse(localStorage.getItem('profile'))

  function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


  return (
    <div>
      <BrowserRouter>
      <SnackbarProvider>
      <ScrollToTop />
      {/* <Navbarmenu /> */}
      <Nav />
      {/* <NavBar /> */}
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/contact" exact component={ContactPage} />
          <Route path="/about" exact component={AboutUs} />
          <Route path="/council" exact component={BoardMembers} />
          <Route path="/moderator" exact component={Moderator} />
          <Route path="/database" exact component={ManageProfiles} />
          <Route path="/regions" exact component={Regions} />
          <Route path="/region/:url" exact component={Region} />
          <Route path="/user/:id" exact component={Users} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/publications" exact component={Publications} />
          <Route path="/documents" exact component={Documents} />
          <Route path="/news" exact component={News} />
          <Route path="/subscribe" exact component={Subscribe} />
          <Route path="/research" exact component={Research} />
          <Route path="/theses" exact component={Theses} />
          <Route path="/news/:slug" exact component={NewsDetails} />
          <Route path="/research/:slug" exact component={ResearchDetails} />
          <Route path="/documents/:slug" exact component={DocumentDetails} />
          <Route path="/theses/:slug" exact component={ThesesDetails} />
          <Route path="/publications/:slug" exact component={PubDetails} />
          <Route path="/auth" exact component={() => (!user ? <AuthPage /> : <Redirect to="/" />)} />
          <Route path="/forgot" exact component={Forgot} />
          <Route path="/reset/:token" exact component={Reset} />

          <Route path="/fulltext" exact component={FullText} />
          <Route path="/membership" exact component={Membership} />
          <Route path="/instruction-to-authors" exact component={InstructionToAuthors} />
        </Switch>
        <Footer />
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
