import { useState } from 'react'
import RoleCard from './components/RoleCard'
import Header from './components/Header'
// import YoutubeForm from './components/YoutubeForm'

const roles = ['Students', 'Teachers', 'Parents']
function App() {
  const [role, setRole] = useState('students')
  return (
    <>
      <Header />
      {/* <YoutubeForm /> */}
      {/* <div className="row justify-content-center">
        <h2>My Role: {role}</h2>
      </div> */}
      <div className="divider" />
      <div className="row justify-content-center">
        {roles.map((role) => (
          <div className="col" key={`role_${role}`}>
            <RoleCard role={role} setRole={setRole} />
          </div>
        ))}
      </div>
    </>
  )
}

export default App
