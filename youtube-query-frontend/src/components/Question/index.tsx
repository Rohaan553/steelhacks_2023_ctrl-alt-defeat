import React from 'react' ;
import "./index.css"

interface QuestionProps {
    question: string;
}


const Question = ({question}:QuestionProps) => {
    return (
        <div className="card ml-2" key={question} style={{"width": "10rem", height: "8rem"}}>
      <div className="card-body">
        <p className="card-text">{question}</p>
      </div>
    </div>
    )
}

export default Question