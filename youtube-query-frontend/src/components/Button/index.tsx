import React from 'react';
import { Button as BButton } from 'react-bootstrap';

interface Props {
  text: string;
  onClick: () => void;
}

const Button: React.FC<Props> = ({ text, onClick }) => {
  return (
    <BButton variant="primary" onClick={onClick}>
      {text}
    </BButton>
  );
};

export default Button;
