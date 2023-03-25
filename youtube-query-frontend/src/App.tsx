import { useState } from 'react'
import RoleCard from './components/RoleCard'
import Header from './components/Header'
import Form from "./components/Form"

const roles = ['students', 'teachers', 'parents']
function App() {
  function getData(url: string, selectedOption: string){
    console.log(url + " " + selectedOption);
  }

  const [formData, setFormData] = useState("")
  const [role, setRole] = useState('students')
  return (
    <>
      <Header />
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
      <Form passFormData={getData}/>
    </>
  )
}

export default App
