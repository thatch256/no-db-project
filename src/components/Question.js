import React, { Component } from "react";

export default class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      question: {
        question: {},
        answers: []
      }
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  flipEdit = () => {
    this.setState({
        editing: !this.state.editing
    })
  }

  saveChanges = () => {
    console.log(this.props)
    console.log(this.props.updatedQuestion,this.props.currentQuestion.id);
    this.flipEdit()
    this.props.editQuestion(this.props.updatedQuestion, this.props.currentQuestion.id)
  }

  handleDelete(id) {
    this.props.deleteQuestion(id);
  }

  render() {
    let { currentQuestion } = this.props; 
    let {editing} = this.state
     return (
        <div>
          {editing ? (
        <div>
          <div id="edit-fields-container">
          <input
             defaultValue={currentQuestion.question}
             name="question"
             placeholder="Enter Question"
             onChange={this.props.updateEdit}
           />
           <input defaultValue={currentQuestion.answers[0]} name="answer" placeholder="Enter Answer #1" id="0" onChange={this.props.updateEdit} />
           <input defaultValue={currentQuestion.answers[1]} name="answer" placeholder="Enter Answer #2" id="1" onChange={this.props.updateEdit} />
           <input defaultValue={currentQuestion.answers[2]} name="answer" placeholder="Enter Answer #3" id="2" onChange={this.props.updateEdit} />
           <input defaultValue={currentQuestion.answers[3]} name="answer" placeholder="Enter Answer #4" id="3" onChange={this.props.updateEdit} />
           </div>
           <button onClick={this.saveChanges}>
             Save Changes
           </button>
           </div>
          ) : (
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
            id="results-button"
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
          <button id="edit-button" onClick={this.flipEdit}
          >
            Edit Current Question
          </button>
          </div>
          )}
        </div>
      );
    } 
  }
