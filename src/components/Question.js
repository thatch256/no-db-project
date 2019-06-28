import React, { Component } from "react";

export default class Question extends Component {
  constructor(props) {
    super(props);



    this.handleDelete = this.handleDelete.bind(this);
  }



  handleDelete(id) {
    this.props.deleteQuestion(id);
  }

  render() {
    console.log(this.props.currentQuestion);
   
    let { currentQuestion } = this.props;
     return (
        <div>
          <div className="question">{currentQuestion.question}</div>
          <section id="answer-buttons">
            <label>
              <input
                type="radio"
                name="answerButton"
                className="answers"
                value={currentQuestion.answers[0]}
                defaultChecked
              />{" "}
              {currentQuestion.answers[0]}
            </label>
            <label>
              <input
                type="radio"
                id="answerChoice2"
                name="answerButton"
                className="answers"
                value={currentQuestion.answers[1]}
              />{" "}
              {currentQuestion.answers[1]}
            </label>
            <label>
              <input
                type="radio"
                id="answerChoice3"
                name="answerButton"
                className="answers"
                value={currentQuestion.answers[2]}
              />{" "}
              {currentQuestion.answers[2]}
            </label>
            <label>
              <input
                type="radio"
                id="answerChoice4"
                name="answerButton"
                className="answers"
                value={currentQuestion.answers[3]}
              />{" "}
              {currentQuestion.answers[3]}
            </label>
          </section>
          <button
            className="p-n-buttons"
            id="previous-button"
            onClick={this.props.handlePrevious}
          >{`< Previous Question `}</button>
          <button
            className="p-n-buttons"
            id="next-button"
            onClick={this.props.handleNext}
          >{` Next Question >`}</button>
          <button
            onClick={() => {
              this.props.handleView("Results");
            }}
          >
            Submit Answers
          </button>
          <button
            onClick={() => this.handleDelete(currentQuestion.id)}
          >
            Delete Question
          </button>
        </div>
      );
    } 
  }
