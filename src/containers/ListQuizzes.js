import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuizzes, createQuiz } from '../actions/index';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'


const Quiz = props => (
  <tr>
    <td><Link to={`/quiz/${props.id}`}>{props.title}</Link></td>
  </tr>
);

class ListQuizzes extends Component {
  constructor(props){
    super(props);
    this.newQuizTitle = React.createRef();
  }

  componentDidMount() {
    this.props.fetchQuizzes();
  }

  handleSubmit() {
    this.props.createQuiz(this.newQuizTitle.current.value);
  }

  renderTable() {
    const quizzes = this.props.quizzes.map( quiz => <Quiz key={quiz.id} {...quiz } /> );

    return(
      <div className='section'>
        <div className='container'>
          <h1 className='title is-3'>Quiz Tool - go on, make a quiz!</h1>
          <h1 className='title is-4'>Create a new quiz</h1>
          <div className="field has-addons">
            <div className="control is-expanded">
              <input ref={this.newQuizTitle} className='input is-large' placeholder="Give your quiz a title" type='text'  />
            </div>
            <div className="control">
              <button onClick={this.handleSubmit.bind(this)} className='button is-large'>Create</button>
            </div>
          </div>
          <table className='table is-stripped'>
            <tbody>
              {quizzes}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  render() {
    return this.props.newQuiz ? <Redirect to={`/quiz/${this.props.newQuiz}`} push /> : this.renderTable();
  }
}

function mapStateToProps(state) {
  return {
    quizzes: state.quizzes.quizzes,
    newQuiz: state.quizzes.new_quiz
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchQuizzes,
    createQuiz,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ListQuizzes);
