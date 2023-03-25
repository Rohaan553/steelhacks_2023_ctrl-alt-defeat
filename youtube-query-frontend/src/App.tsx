import { useState } from 'react'
import RoleCard from './components/RoleCard'
import Header from './components/Header'
import Form from "./components/Form"
import Question from "./components/Question"
import Spinner from 'react-bootstrap/Spinner';
import Recommendation from './components/Recommendations'

const roles = ['students', 'teachers', 'parents']
function App() {
  let spinnerStyle = "color: white;"
  let results = []

  function loadResults(){
    //Clear old array before populating
    setQuestionSuggestions(oldArray => [])

    setQuestionSuggestions(oldArray => [...oldArray, "AI Explained: What Is A Neural Net?:https://www.youtube.com/watch?v=xS2G0oolHpo", "Deep Learning Basics: Introduction and Overview:https://www.youtube.com/watch?v=O5xeyoRL95U", "How Neural Networks Work | Neural Networks Explained:https://www.youtube.com/watch?v=rJmBhnLzjOM"])
  }

  function getData(url: string, selectedOption: string){
    console.log(url + " " + selectedOption);
    //Clear old array
    setQuestionAnswers(oldArray => [])

    setShowResults(true);

    setQuestionAnswers(oldArray => [...oldArray, "Can neural networks be used for tasks other than classification, such as regression or clustering?", "How are neural networks trained, and what are some common techniques for optimizing their performance?", "What are some common activation functions used in neural networks, and how do they impact the performance of the network?"]);

    setQuestionsAnswered(oldArray => [...oldArray, "What is a neural network and how does it work", "What are some common applications of neural networks, such as image recognition and natural language processing?", "What are the basic components of a neural network, including input layer, hidden layer, and output layer?"])
  }

  const [questionAnswers, setQuestionAnswers] = useState<String[]>([])

  const [questionSuggestions, setQuestionSuggestions] = useState<String[]>([])

  const [questionsAnswered, setQuestionsAnswered] = useState<String[]>([])

  const [loading, setLoading] = useState<Boolean>(false)

  const [showResults, setShowResults] = useState<Boolean>(false)

  const [role, setRole] = useState('students')
  return (
    <>
      <Header />
      <div className="divider" />
      <div className="row justify-content-center">
        {roles.map((role) => (
          <div className="col" key={`role_${role}`}>
            <RoleCard role={role} setRole={setRole} />
          </div>
        ))}
      </div>
      <br></br>
      */}
      <h1>Content Creators</h1>
      <Form passFormData={getData}/>
      <br />
      <br />
      <br />
      <br />
      {loading ? 
                <>
                <Spinner animation="grow" role="status" variant="light">
                 <span className="visually-hidden">Loading...</span>
                 </Spinner>
                 <Spinner animation="grow" role="status" variant="light">
                 <span className="visually-hidden">Loading...</span>
                 </Spinner>
                 <Spinner animation="grow" role="status" variant="light">
                 <span className="visually-hidden">Loading...</span>
                 </Spinner>
                </>
      :<></>}
      <div className="questions-div-super-container">
        <div id="questions-div-home-container">
          {questionAnswers.map((question, index) =>{
            return (
              <div id="questions-div">
                <Question question={question}/>
              </div>
            )
          })}
          <br />
          <br />
          <br />
          {questionsAnswered.map((question, index) =>{
            return (
              <div id="questions-div">
                <Question question={question}/>
              </div>
            )
          })}
        </div>
      </div>
      <br />
      <br />
      {/* Refactor into a component later */}
      <h1>Viewers</h1>
      <div id="viewer-container-div">
        <div id="question-entry-div">
          <input type="text" placeholder="Enter a Question" id="viewer-question-entry"/>
        </div>
        <br />
        <div id="submit-element-div">
          <input type="button" className="submit-button" id="submit-element" value="Analyze" onClick={loadResults}/>
        </div>
      </div>
      <br />
      <div className="questions-div-super-container">
        <div id="questions-div-home-container">
          {questionSuggestions.map((link, index) =>{
            return (
              <div id="questions-div">
                <Recommendation link={link}/>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
