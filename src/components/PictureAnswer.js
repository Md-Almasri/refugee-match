import React from 'react';

let tempAnswer = {
      answerId: null,
      answer: null
    };


function answerChecking() {
  return (tempAnswer.answerId === null);
}

function collectingAnswer(event) {
  tempAnswer.answer = event.target.value;
  tempAnswer.answerId = event.target.id;
}

function answer() {
  
  let value = tempAnswer;
  tempAnswer = {
    answerId: null,
    answer: null
  };
  
  return value;
}


export default function PictureAnswer(props) {
  const question = props.question.question;
  const options = props.question.options;
  const handleSubmit = props.handleSubmit;
  return (
    <form>
      <h3>{question}</h3>
      {
        options.map((answer, index) => {
          return (
            <label htmlFor={answer.answerId} key={index} >
                <input
                  className='pictureQuestion'
                  type='radio'
                  name='answer'
                  value={answer.answer}
                  id={answer.answerId}
                  onChange={collectingAnswer} />
                  <img className = 'picAnswer' src={require(`../images/${answer.answer}.png`)} alt={answer.answer} />
              </label>
          );
        })
      }
      <input
        type='button'
        value='Previous'
        onClick={() => console.log('some thing to do')} />
      <input
        type='button'
        value='Next'
        onClick={() => {answerChecking() ? alert('Please choose one picture'):handleSubmit(answer())}} />
    </form>
  );
}

