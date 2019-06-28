import React from "react";

class Form extends React.Component {
  constructor() {
    super();

    this.state = {
      question: {
        question: "",
        answers: []
      }
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let { name, value, id } = e.target;
    if (name === "question") {
      this.setState({
        question: {
          [name]: value,
          answers: this.state.question.answers
        }
      })
    } else {
        let copiedArray = this.state.question.answers
        copiedArray[+id] = value
        this.setState({
            question: {
                question: this.state.question.question,
                answers: copiedArray 
            }
        })

    }
  }

  render() {
    console.log(this.state.question);
    return (
      <div>
        <input
          name="question"
          placeholder="Enter Question"
          onChange={this.handleChange}
        />
        <input name="answer" placeholder="Enter Answer #1" id="0" onChange={this.handleChange} />
        <input name="answer" placeholder="Enter Answer #2" id="1" onChange={this.handleChange} />
        <input name="answer" placeholder="Enter Answer #3" id="2" onChange={this.handleChange} />
        <input name="answer" placeholder="Enter Answer #4" id="3" onChange={this.handleChange} />
        <button onClick={() => this.props.addQuestion(this.state.question)}>
          Add New Question
        </button>
      </div>
    );
  }
}

export default Form;
