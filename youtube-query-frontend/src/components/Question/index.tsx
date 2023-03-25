import React from 'react' ;
import "./index.css"

const Question = (props) => {
    return (
        <div id="question-containing-div">
            <p id="question-response">{props.question}</p>
        </div>
    )
}

export default Question