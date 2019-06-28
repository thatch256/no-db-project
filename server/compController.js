const questions = [
    {question: "What is the color of the sky?", answers: ['blue', 'red', 'green', 'purple'], id: 0}, 
    {question: "What is the color of the ocean?", answers: ['blue', 'black', 'green', 'yellow'], id: 1}, 
    {question: "What is the color of grass?", answers: ['orange', 'red', 'green', 'purple'], id: 2},
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
        console.log(newQuestion)
        questions.push(newQuestion)
        id++
        res.status(200).send(questions)
    } ,
    deleteQuestion(req, res) {
        console.log('hit delete', req.params)
        
        let {id} = req.params
        let index = questions.findIndex(question => question.id === +id)
        index !== -1 && questions.splice(index, 1)
        res.status(200).send(questions)
    }

}