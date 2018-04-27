import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAnswer, saveQuiz } from '../actions/index';
import { Field, Input } from 'reactbulma'

class NewAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAnswer: ''
    }
  }

  handleChange(e) {
    this.setState({
      currentAnswer: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createAnswer({id: this.props.questionId, text: this.state.currentAnswer});
    this.setState({currentAnswer: ''});
    this.props.saveQuiz();
  }

  render() {
    return(
      <form className='form' onSubmit={this.handleSubmit.bind(this)} >
        <Field>
          <Input className='is-small' type='text' value={this.state.currentAnswer} onChange={this.handleChange.bind(this)} />
        </Field>
        <button className='button' type='submit'>Add</button>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({createAnswer, saveQuiz}, dispatch);
}

export default connect(null, mapDispatchToProps)(NewAnswer);
