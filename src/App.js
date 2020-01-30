import React, { Component } from 'react';
import { Hero } from 'react-bulma-components/dist';
import Loadable from 'react-loadable';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import LoadingAnimation from './components/LoadingAnimation';

import './App.css';

const FundraiserMailing = Loadable({
  loading: LoadingAnimation,
  loader: () => import('./FundraiserMailingGenerator/BaseComponent'),
});
const EmailTool = Loadable({
  loading: LoadingAnimation,
  loader: () => import('./EmailTool'),
});
const TweetTool = Loadable({
  loading: LoadingAnimation,
  loader: () => import('./TweetTool'),
});
const QuizMaker = Loadable({
  loading: LoadingAnimation,
  loader: () => import('./containers/QuizMaker'),
});
const ListQuizzes = Loadable({
  loading: LoadingAnimation,
  loader: () => import('./containers/ListQuizzes'),
});

const Routes = () => (
  <div>
    <Router basename="">
      <div>
        <div
          className="navbar is-light"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/email-tool" className="navbar-item">
              Email Tool
            </Link>
            <Link to="/tweet-tool" className="navbar-item">
              Tweet Tool
            </Link>
            <Link to="/quizzes" className="navbar-item">
              Quiz Tool
            </Link>
            <Link to="/fundraiser-mailing" className="navbar-item">
              Fundraiser Mailing Generator
            </Link>
          </div>
        </div>

        <Route path="/email-tool" component={EmailTool} />
        <Route path="/tweet-tool" component={TweetTool} />
        <Route path="/fundraiser-mailing" component={FundraiserMailing} />
        <Route path="/quiz/:id" component={QuizMaker} />
        <Route path="/quizzes" component={ListQuizzes} />
      </div>
    </Router>
  </div>
);

class App extends Component {
  render() {
    return (
      <Hero.Head>
        <Routes />
      </Hero.Head>
    );
  }
}

export default App;
