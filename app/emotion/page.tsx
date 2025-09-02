import SectionTitle from "@/components/SectionTitle";
import Image from "next/image";
import CrystalBall from "@/components/CrystalBall";

const profileImage = `https://i.pinimg.com/236x/99/68/4e/99684ef58dd53fad550b0c00c0678d05.jpg`;

export default function Emotion() {
    return (
        <>
            <SectionTitle title="Each feeling shines as your color" />
            <div className="flex flex-col items-center justify-center">
                <div className="flex flex-row items-center justify-center">
                    <Image src={profileImage} alt="profile" width={64} height={64} className="rounded-full w-16 h-16 object-cover" />
                </div>
                <CrystalBall />
            </div>
        </>
    )
}