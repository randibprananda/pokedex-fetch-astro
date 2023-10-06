import type { FC, ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  disabled: boolean;
}

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      className='bg-orange-600 font-bold text-slate-100 px-4 py-2 rounded-lg hover:bg-orange-700 hover:text-slate-200'
      disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
