import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createAnswer, saveQuiz } from '../actions/index';
import { Form } from 'react-bulma-components';

class NewAnswer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentAnswer: '',
    };
  }

  handleChange(e) {
    this.setState({
      currentAnswer: e.currentTarget.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createAnswer({
      id: this.props.questionId,
      text: this.state.currentAnswer,
    });
    this.setState({ currentAnswer: '' });
    this.props.saveQuiz();
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        <Form.Field>
          <Form.Input
            className="is-small"
            type="text"
            value={this.state.currentAnswer}
            onChange={this.handleChange.bind(this)}
          />
        </Form.Field>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createAnswer, saveQuiz }, dispatch);
}

export default connect(null, mapDispatchToProps)(NewAnswer);
