import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import QuestionCard from './QuestionCard';
import Question from "../Question"
import QuestionType from "../Question"

const QuestionList: React.FC = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    fetch('https://example.com/questions')
      .then(response => response.json())
      .then(data => setQuestions(data));
  }, []);

  return (
    <Container>
      {questions.map(question => (
        <Question key={question.id} question={question} />
      ))}
    </Container>
  );
};

export default QuestionList;