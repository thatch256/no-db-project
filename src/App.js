import React, {Component} from 'react';
import './reset.css'
import './App.css';
import Question from './components/Question'
import Results from './components/Results'
import Form from './components/Form'
import axios from 'axios'
import mega from './ezgif.com-reverse.gif'
import megaTwo from './ezgif.com-unreverse.gif'

class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      name: '',
      view: "Questions",
      currentResultsArray: [],
      currentQuestion: {},
      i: 0,
      question: {
        question: "",
        answers: []
      }
    }

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleInput = this.handleInput.bind(this)
    this.handleView = this.handleView.bind(this)
    this.handleSetResults = this.handleSetResults.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
    this.updateEdit = this.updateEdit.bind(this)
  }
  
  componentDidMount() {
    axios.get('/api/quiz')
    .then(res => { 
      this.setState({questions: res.data, currentQuestion: res.data[0]})
    })
    .catch(err => {
      console.log('SERVER ERROR', err);
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.questions !== this.state.questions) {
      this.render()
    }
  }

  handleInput(e) {
    let {value} = e.target
    this.setState({name: value})
  }

  handleView(view) {
    this.setState({
      view: view
    })
  }

  handleSetResults(index, answer) {
    let resultsArrayCopy = [...this.state.currentResultsArray]
    resultsArrayCopy[index] = answer
    this.setState({
      currentResultsArray: resultsArrayCopy
    })
  }

  addQuestion = (question) => {
    axios.post('/api/quiz', question)
    .then(res => {
      this.setState({
        questions: res.data, currentQuestion: res.data[0]})
      })
        .catch(err => {
      console.log(`Can't add question`, err);
    })
  }

  deleteQuestion = id => {
    axios.delete(`/api/quiz/${id}`)
    .then(res => {
      this.setState({questions: res.data, currentQuestion: res.data[0]})
    })
    .catch(err => console.log(`Can't delete question`, err))
  }

  
  handleNext() {
    let iCopy = this.state.i;
    if (iCopy < this.state.questions.length - 1) {
      this.setState({ i: iCopy + 1, currentQuestion: this.state.questions[iCopy + 1] });
    } else {
      this.setState({ i: 0, currentQuestion: this.state.questions[0] });
    }
  }

  handlePrevious() {
    let iCopy = this.state.i;
    if (iCopy > 0) {
      this.setState({ i: iCopy - 1, currentQuestion: this.state.questions[iCopy - 1] });
    } else if (iCopy === 0) {
      this.setState({ i: this.state.questions.length - 1, currentQuestion: this.state.questions[this.state.questions.length - 1] });
    }
  }

  editQuestion = (updatedQuestion, id) => { 
    console.log(updatedQuestion, id);
    axios.put(`/api/quiz/${id}`, updatedQuestion)
    .then(res => {
      this.setState({questions: res.data, currentQuestion: res.data[0]})
    })
    .catch(err => {
      console.log('Error editing question', err);
    })
  }

  updateEdit(e) {
    let { name, value, id } = e.target;
    if (name === "question") {
      this.setState({
        currentQuestion: {
          question: value,
          answers: [...this.state.currentQuestion.answers],
          id
        }
      })
      console.log(this.state.currentQuestion)
    } else {
        let copiedArray = [...this.state.currentQuestion.answers]
        copiedArray[+id] = value
        this.setState({
            currentQuestion: {
              question: this.state.currentQuestion.question,
              answers: copiedArray,
              id
            }
        })
        console.log(this.state.currentQuestion.answers)
    }
  }

  render() {
    return (
      <div className="App">
        {this.state.view === "Questions" ?   <div>
        <div id="header-div">
        <img src={megaTwo}/>
        <header className="quiz-title">Mega Quiz Creator</header>
        <img src={mega}/>
        </div>
        <p className="quiz-description">Make The Best Quiz</p>
        <input id="name-input" placeholder="Enter Name" name="userName" onChange={this.handleInput} />
        {this.state.questions.length ? (
            <Question 
              currentQuestion={this.state.currentQuestion} 
              handleNext={this.handleNext} handlePrevious={this.handlePrevious} 
              name={this.state.name} 
              handleView={this.handleView} 
              deleteQuestion={this.deleteQuestion}  
              editQuestion={this.editQuestion}
              updateEdit={this.updateEdit} 
              updatedQuestion={this.state.currentQuestion}/>
        ) : (<div>Take it easy {this.state.name}, there are no more questions!</div>)}
        <Form name={this.state.name} addQuestion={this.addQuestion} /> </div>: <div> <Results handleView={this.handleView} name={this.state.name} /> </div>}
      
      </div>
    );
  }
}

export default App;
