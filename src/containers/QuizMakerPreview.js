import React, { Component } from 'react';
import './QuizMakerPreview.css';


const quiz = {"id":"1","questions":[{"question":"What is the capital of france?","answers":[{"correct":false,"text":"Paris"},{"correct":true,"text":"Berlin"}],"id":1},{"question":"What is the capital of spain?","answers":[{"correct":false,"text":"Madrid"},{"correct":true,"text":"New Delhi"}],"id":2},{"answers":[{"correct":false,"text":"fdfsdf"},{"correct":false,"text":"sdfsdf"},{"correct":true,"text":"retret"}],"id":3,"correct":false,"question":"Boo Raa"},{"answers":[{"correct":false,"text":"10"},{"correct":false,"text":"20"},{"correct":true,"text":"30"},{"correct":false,"text":"4000"}],"id":4,"correct":false,"question":"Population of Madrid?"}],"title":"Capital cities of the World"};

class QuizMakerPreview extends Component {
  constructor(props) {
    super(props);

    this.state = quiz;
  }

  componentDidMount() {
    // this.props.fetchQuiz();
  }

  render() {
    return(
      <div>
        <div className='quiz-section quiz-intro'>
          <h1>{ this.state.title }</h1>
        </div>
      </div>
    )
  }
}

export default QuizMakerPreview;
