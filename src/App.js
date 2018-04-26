import React, { Component } from 'react';
import { Hero } from 'reactbulma';
import './App.css';
import EmailTool from './EmailTool';
import TweetTool from './TweetTool';
// import QuizMaker from './containers/QuizMaker';
import QuizMaker from './containers/QuizMaker';
import ListQuizzes from './containers/ListQuizzes';
import BookList from './containers/book-list';
import BookDetail from './containers/book-detail';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const Routes = () => (
  <div>
    <Router>
      <div>
        <div className="navbar is-light" role="navigation" aria-label="main navigation">
          <div className="navbar-brand">
            <Link to="/" className='navbar-item'>Home</Link>
            <Link to="/email-tool" className='navbar-item'>Email Tool</Link>
            <Link to="/tweet-tool" className='navbar-item'>Tweet Tool</Link>
            <Link to="/quizzes" className='navbar-item'>Quiz Tool</Link>
          </div>
        </div>

        <Route path="/email-tool" component={EmailTool}/>
        <Route path="/tweet-tool" component={TweetTool}/>
        <Route path="/quiz/:id" component={QuizMaker}/>
        <Route path="/quizzes" component={ListQuizzes}/>
      </div>
    </Router>
  </div>
);

class App extends Component {
  render() {
    return(
      <Hero.Head>
        <Routes />
      </Hero.Head>
    );
  }
};

export default App;
