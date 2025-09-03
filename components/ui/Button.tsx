"use client"

interface ButtonProps {
  selected?: boolean;
  id?: string;
  onClick?: (id?: string) => void | (() => void);
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const Button = ({ 
  selected = false, 
  id, 
  onClick, 
  children, 
  className = "",
  disabled = false,
  type = "button"
}: ButtonProps) => {
    const handleClick = () => {
        if (onClick) {
            if (id) {
                (onClick as (id: string) => void)(id);
            } else {
                (onClick as () => void)();
            }
        }
    }
    
    return (
        <button 
            className={`px-6 py-3 rounded-xl border transition-all duration-200 font-semibold ${
                selected 
                    ? 'bg-[#7D2EEE] text-white border-[#7D2EEE] shadow-lg' 
                    : 'bg-white/10 text-white border-white/20 hover:border-white/40 hover:bg-white/20 backdrop-blur-sm'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'} ${className}`}
            onClick={handleClick}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    )
}

export default Button;