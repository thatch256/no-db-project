const questions = [
    {question: "What is your favorite video game?", answers: ['Fortnite', 'Breath of the Wild', 'Fallout 76', 'Super Mario Bros.'], id: 0}, 
    {question: "What's your favorite game console?", answers: ['Switch', 'PS4', 'Sega Saturn', 'Atari Jaguar'], id: 1}, 
    {question: "Who is the best SSB character?", answers: ['Samus', 'Samus', 'Samus', 'Samus'], id: 2},
    { question: 'Who is the greatest mentor of all time?',
    answers: [ 'Josh', 'Matias', 'Spencer', 'Kevin' ],
    id: 3 }]

let id=4
module.exports = {
    getQuestions(req, res) {
        res.status(200).send(questions)
    },
    addQuestion(req, res) {
        let {question, answers} = req.body
        let newQuestion = {question, answers, id}
        questions.push(newQuestion)
        id++
        res.status(200).send(questions)
    },
    deleteQuestion(req, res) { 
        let {id} = req.params
        console.log(id)
        let index = questions.findIndex(question => question.id === +id)
        console.log(index)
        index !== -1 && questions.splice(index, 1)
        console.log(questions)
        res.status(200).send(questions)
    },
    updateQuestion(req, res) {
        console.log('hitupdateQuestion', req.params, req.body.answers);
        let {id} = req.params
        let {question, answers} = req.body
        let newQuestion = {question, answers, id: +id}
        console.log(newQuestion);
        let index = questions.findIndex(question => question.id === +id)
        questions[index] = newQuestion
      console.log(questions);
        res.status(200).send(questions) 
    } 

}