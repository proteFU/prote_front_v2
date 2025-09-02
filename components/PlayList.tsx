"use client"

export default function PlayList() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col gap-1">
                <div className="w-[150px] h-[150px] bg-white rounded-lg" />
                <div className="flex flex-col gap-1">
                    <div className="text-[16px] mt-1">Music Title</div>
                    <div className="text-[12px] text-[#A1A1A1]">Sub Title</div>
                </div>
            </div>
        </div>
    )
}