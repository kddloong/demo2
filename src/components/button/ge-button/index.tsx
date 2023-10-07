import { FC, ReactNode } from 'react';
import './styles.css';

type GeButtonProps = {
  children: ReactNode;
  disabled?: boolean;

  onClick?: () => void;
};
const GeButton: FC<GeButtonProps> = (props) => {
  return (
    <button
      onClick={props?.onClick}
      style={{ minWidth: '82px' }}
      className={`ui blue small basic ${props.disabled ? 'disabled' : ''} button ml-auto`}
    >
      {props.children}
    </button>
  );
};

export { GeButton };
