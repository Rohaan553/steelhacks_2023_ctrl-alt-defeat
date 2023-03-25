import { useState } from 'react'
import RoleCard from './components/RoleCard'
import Header from './components/Header'
import Form from "./components/Form"
import Question from "./components/Question"
import Spinner from 'react-bootstrap/Spinner';

const roles = ['students', 'teachers', 'parents']
function App() {
  let spinnerStyle = "color: white;"
  function getData(url: string, selectedOption: string){
    console.log(url + " " + selectedOption);

    setQuestionAnswers(oldArray => [...oldArray, "Hooray"] );
  }

  const [questionAnswers, setQuestionAnswers] = useState<String[]>([])

  const [loading, setLoading] = useState<Boolean>(false)

  const [role, setRole] = useState('students')
  return (
    <>
      <Header />
      {/* 
      <div className="row justify-content-center">
        <h2>My Role: {role}</h2>
      </div>
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
        </div>
      </div>
    </>
  )
}

export default App
