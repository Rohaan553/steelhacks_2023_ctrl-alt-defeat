import React from 'react';
import { Button as BButton } from 'react-bootstrap';

interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <BButton style={{"backgroundColor":"white", "color": "#555"}} onClick={onClick}>
      {text}
    </BButton>
  );
};

export default Button;
