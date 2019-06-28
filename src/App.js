import React, {Component} from 'react';
import './reset.css'
import './App.css';
import Question from './components/Question'
import Results from './components/Results'
import Form from './components/Form'
import axios from 'axios'

class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      name: '',
      view: "Questions",
      currentResultsArray: [],
      currentQuestion: {},
      i: 0
    }

    this.handleNext = this.handleNext.bind(this);
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleInput = this.handleInput.bind(this)
    this.handleView = this.handleView.bind(this)
    this.handleSetResults = this.handleSetResults.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }
  
  componentDidMount() {
    console.log('hit component did mount'  )
    axios.get('/api/quiz')
    .then(res => { 
      console.log('got a response:', res.data)
      this.setState({questions: res.data, currentQuestion: res.data[0]})
    })
    .catch(err => {
      console.log('SERVER ERROR', err);
    })
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('hit comp update')
    if(prevState.questions !== this.state.questions) {
      console.log('hit if condition')
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
    console.log(question)
    axios.post('/api/quiz', question)
    .then(res => {
      this.setState({
        questions: res.data})
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
    console.log('hit next', this.state.i)
    let iCopy = this.state.i;
    if (iCopy < this.state.questions.length - 1) {
      this.setState({ i: iCopy + 1, currentQuestion: this.state.questions[iCopy + 1] });
    } else {
      this.setState({ i: 0, currentQuestion: this.state.questions[0] });
    }
  }

  handlePrevious() {
    console.log('hit previous', this.state.i)
    let iCopy = this.state.i;
    if (iCopy > 0) {
      this.setState({ i: iCopy - 1, currentQuestion: this.state.questions[iCopy - 1] });
    } else if (iCopy === 0) {
      this.setState({ i: this.state.questions.length - 1, currentQuestion: this.state.questions[this.state.questions.length - 1] });
    }
  }


  render() {
    console.log(this.state.questions)
    return (
      <div className="App">
        {this.state.view === "Questions" ?   <div><header className="quiz-title">Best Quiz</header>
        <section>
          <img></img>
          <img></img>
          <img></img>
        </section>
        <p className="quiz-description">Take This Quiz If You Want To Live</p>
        <input placeholder="Enter Name" name="userName" onChange={this.handleInput}/>
        {this.state.questions.length ? (
            <Question currentQuestion={this.state.currentQuestion} handleNext={this.handleNext} handlePrevious={this.handlePrevious} name={this.state.name} handleView={this.handleView} deleteQuestion={this.deleteQuestion} />
        ) : (<div>Take it easy there {this.state.name}, there are no more questions!</div>)}
        <Form addQuestion={this.addQuestion} /> </div>: <div> <Results handleView={this.handleView} name={this.state.name}/> </div>}
      
      </div>
    );
  }
}

export default App;
