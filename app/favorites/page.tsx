import PlayList from "@/components/PlayList"
import MyMusic from "@/components/MyMusic"

export default function Favorites() {
    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="text-[20px]">PlayList</div>
            <div className="flex overflow-x-auto gap-4">
                <PlayList />
                <PlayList />
                <PlayList />
            </div>
            <div className="text-[20px] mt-8">My Music Recap</div>
            <div className="flex flex-col gap-y-4">
                <MyMusic />
                <MyMusic />
                <MyMusic />
                <MyMusic />
                <MyMusic />
                <MyMusic />
            </div>
        </div>
    )
}