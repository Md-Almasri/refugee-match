import React, { Component } from 'react';
import './App.css';
import Languages from './components/Languages';
import Question from './components/Question';
import Footer from './components/Footer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this state is just for displaying the outcomes (depend on the databases)
      languagesList: ['English','Arabic','Francais'],
      questions:[
        {
          questionId: 'q1',
          question: 'Are you a refugee or in a refugee-like situation?',
          options: [
            {answerId: 'q1a1', answer: 'Yes'},
            {answerId: 'q1a2', answer: 'No'},
            {answerId: 'q1a3', answer: 'Prefer not to say'}
          ],
          questionType: 'single answer'
        },
        {
          questionId: 'q2',
          question: 'Rank how important these factors are to you',
          options: [
            {answerId: 'q2a1', answer: 'Job opportunities'},
            {answerId: 'q2a2', answer: 'Cost of living'},
            {answerId: 'q2a3', answer: 'Quality of schools'},
            {answerId: 'q2a4', answer: 'Level of crime'}
          ],
          questionType: 'ranking answer'
        },
        {
          questionId: 'q3',
          question: 'Is it important for you to access any of these? (tick all that apply)',
          options: [
            {answerId: 'q3a1', answer: 'English teaching'},
            {answerId: 'q3a2', answer: 'Practical training'},
            {answerId: 'q3a3', answer: 'University'}
          ],
          questionType: 'multi answer'
        },
        {
          questionId: 'q4',
          question: 'Is it important for you to live near any of these places of worship?',
          options: [
            {answerId: 'q4a1', answer: 'Mosque'},
            {answerId: 'q4a2', answer: 'Church'},
            {answerId: 'q4a3', answer: 'Synagogue'},
            {answerId: 'q4a4', answer: 'Hindu temple'},
            {answerId: 'q4a5', answer: 'Sikh temple'},
            {answerId: 'q4a6', answer: 'Buddhist temple'},
            {answerId: 'q4a7', answer: 'Other'}
          ],
          questionType: 'single answer'
        },
        {
          questionId: 'q5',
          question: 'Which of these sectors would you be most likely to look for a job in?',
          options: [
            {answerId: 'q5a1', answer: 'Administration'},
            {answerId: 'q5a2', answer: 'Manufacturing'},
            {answerId: 'q5a3', answer: 'Education'},
            {answerId: 'q5a4', answer: 'Construction'},
            {answerId: 'q5a5', answer: 'Retail'},
            {answerId: 'q5a6', answer: 'Health and Social work'},
            {answerId: 'q5a7', answer: 'Electricity, Gas and Water'},
            {answerId: 'q5a8', answer: 'Hotel and Restaurant'},
            {answerId: 'q5a9', answer: 'Agriculture'},
            {answerId: 'q5a10', answer: 'Business'},
            {answerId: 'q5a11', answer: 'Other'}
          ],
          questionType: 'multi answer'
        },
        // {
        //   question: 'Which of these pictures do you like the most?',
        //   options: ['Countryside.png', 'oldcity.png', 'moderncity.png'],
        //   questionType: 'single photo answer'
        // },
        {
          questionId: 'q7',
          question: 'Would you prefer to live in a city or the countryside?',
          options: [
            {answerId: 'q7a1', answer: 'City'},
            {answerId: 'q7a2', answer: 'Countryside'},
            {answerId: 'q7a3', answer: 'I don\'t mind'}
          ],
          questionType: 'single answer'
        }
      ],
      // for pushing the ansers
      answers: [],
      // to display each question at one time
      questionNumber: -1,
      // this is the current answer in the current page (in case if the quetion is MultiOptionQuestion)  :)
    }
  }

    // for the language button, checkbox and radiobox answers
  handleSubmit = (answer) => {
    // list of state we have
    const questions = this.state.questions;
    let answers = this.state.answers;
    let questionNumber = this.state.questionNumber;
    // check question number and increment it, if it has a defult value
    if (questionNumber === -1) {
      questionNumber++;
      return this.setState({questionNumber: questionNumber});
    }
    // if it reach to the end of questions
    // set the state to its defaul value
    if (questionNumber === questions.length) {
      // this should be rendering the result page which is in progress
      this.PostToAPI('http://localhost:9000/api');
      return (
        this.setState(
          {
            questionNumber: 0,
            answers: [],
          }
        )
      )
    }
    questionNumber++;
    answers.push(answer);
    console.log(answers);
    return (
      this.setState(
        {
          questionNumber: questionNumber,
          answers: answers,
        }
      )
    )
  } // this is the end of handleSubmit
  PostToAPI = (url) => {
    fetch(url, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
      answers: this.state.answers
      })
    })
    // .then((data) => console.log(data.json()))
    // .catch((err) => console.error(err))
  }
  // render componenets
  displayRender = () => {
    const questionNumber = this.state.questionNumber;
    const questions = this.state.questions;
    const languagesList = this.state.languagesList;
    if (questionNumber === -1 || questionNumber >= questions.length) {
      return (
        <Languages
        languagesList={languagesList}
        whenClick={this.handleSubmit} />
      );
    }
    return (
      <Question
      question={questions[questionNumber]}
      handleSubmit={this.handleSubmit}/>
    );
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Refugee Match</h2>
        </div>
        <div className="App-container">
          {
            this.displayRender()
          }
        </div>
        <div className="App-footer">
          <Footer />
        </div>
      </div>
    );
  }
}
