interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string;
  name?: string;
  className?: string;
  disabled?: boolean;
}

export default function Input({ 
  value, 
  onChange, 
  placeholder, 
  type = "text",
  name,
  className = "",
  disabled = false
}: InputProps) {
  return (
    <div className="relative">
      <input
        className={`w-full h-14 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-400/50 transition-all duration-300 backdrop-blur-md hover:bg-white/10 hover:border-white/20 ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        name={name}
        disabled={disabled}
        suppressHydrationWarning
      />
      {/* 포커스 시 그라데이션 효과 */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 opacity-0 focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}