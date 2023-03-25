import React from 'react';
import './index.css';

interface RoleCardProps {
  role: string;
  setRole: (role: string) => void;
}

const RoleCard = ({ role, setRole }:RoleCardProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setRole(role);
  }
  return (
    <div className="card" onClick={handleClick}>
      <div className="card-body">
        <h5 className="card-title">{role}</h5>
        {/* <h6 className="card-subtitle mb-2 text-body-secondary">Card subtitle</h6> */}
        {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
      </div>
    </div>
  )
}

export default RoleCard;
