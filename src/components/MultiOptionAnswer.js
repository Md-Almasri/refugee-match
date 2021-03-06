import React from 'react';

let tempAnswers = [];
let textAreaValue = null;

function collectingAnswer(event) {
  const eventValue = event.target.value;
  const eventId = event.target.id;
  const checked = event.target.checked;
  let value = 1;
  if (checked) {
    if (eventValue === 'Other') {
      value = 0;
    }
    tempAnswers.push({answerId: eventId, answer: eventValue, answerValue: value});
  }else {
    tempAnswers = tempAnswers.filter(value => value.answerId !== eventId);
  }
}

function collectingTextAreaValue(event) {
  textAreaValue = event.target.value;
}

function answerChecking() {
  return tempAnswers.length < 1;
}

function answers() {
  if (textAreaValue !== null) {
    tempAnswers.map(answer => {
      if (answer.answer === 'Other') {
        answer.answer = textAreaValue;
      }
      return answer;
    });
  }
  let value = tempAnswers;
  tempAnswers = [];
  textAreaValue = null;
  return value; 
}

function resetValues() {
  tempAnswers = [];
  textAreaValue = null;
}

export default function MultiOptionAnswer(props) {
  const question = props.question.question;
  const options = props.question.options;
  const handleSubmit = props.handleSubmit;
  const handlePrevious = props.handlePrevious;
  return (
    <form>
      <h3>{question}</h3>
      {
        options.map((answer, index) => {
          return (
            answer.answer !== 'Other' ? (        
              <label key={index} >
                {answer.answer}
                <div className='checkBtn'>
                <input
                  type='checkbox'
                  name='option'
                  value={answer.answer}
                  id={answer.answerId}
                  onChange={collectingAnswer} />
                </div>
              </label>
              ) : (
              <label key={index} >
                {answer.answer}
                <div className='checkBtn'>
                <input
                  type='checkbox'
                  name='option'
                  value={answer.answer}
                  id={answer.answerId}
                  onChange={collectingAnswer} />
                </div>
                <br/>
                <textarea
                  placeholder='Please specify...'
                  onChange={collectingTextAreaValue} />
                  <br/>
              </label>
            )
          );
        })
      }
      <input
        type='button'
        value='Previous'
        className='prevBtn'
        onClick={() => handlePrevious(resetValues())} />
      <input
        type='button'
        value='Next'
        className='nextBtn'
        onClick={() => {answerChecking() ? alert('Please choose answer') : handleSubmit(answers())}} />
    </form>
  );
}

