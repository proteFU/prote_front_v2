"use client"

const Button = ({ selected, id, onClick, children }: { selected: boolean, id: string, onClick: (id: string) => void, children: React.ReactNode }) => {
    const handleClick = () => {
        onClick(id);
    }
    return (
        <>
        <button className={`px-4 py-2 rounded-xl border transition-colors ${
            selected 
                ? 'bg-[#7D2EEE] text-white border-[#7D2EEE]' 
                : 'bg-transparent text-white border-white/30 hover:border-white/50'
            }`}
            onClick={handleClick}
        >
            {children}
        </button>
        </>
    )
}

export default Button;