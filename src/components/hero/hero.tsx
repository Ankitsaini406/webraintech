import { ButtonBlack, ButtonWhite } from "@/utils/Buttons";
import Image from "next/image";


function Hero() {
    return (
        <div className="container my-7 p-4 sm:p-8 rounded-lg flex items-center justify-between flex-col-reverse sm:flex-row relative gap-8 sm:gap-8">
            <Image className="absolute top-1/4 left-8 animate-moveLeftToRight" alt="pen" src="/svg/pen.svg" width={50} height={50} />
            <Image className="absolute top-10 right-10 animate-moveLeftToRight" alt="pen" src="/svg/airoplan.svg" width={50} height={50} />

            <div className="w-full sm:w-2/3">
                <h1 className="text-4xl leading-tight sm:text-5xl sm:leading-snug lg:text-6xl lg:leading-tight font-bold">Unlock Your Potential with Our Courses</h1>
                <p className="mt-4 sm:mt-8 lg:leading-loose">Discover a wide range of courses designed to elevate your skills and knowledge. Join our community of learners and embark on your journey to success today.</p>
                <div className="flex gap-4 mt-8">
                    <ButtonBlack title="Enroll" />
                    <ButtonWhite title="Learn More" />
                </div>
            </div>

            <div className="w-2/4 justify-center flex relative">
                <Image className="bg-gradient-to-b from-transparent to-black-opacity-30 rounded-full max-w-56 sm:max-w-full" alt="WeBrainTech" src="/svg/1.png" width={500} height={500} />
                <Image className="bg-gradient-to-b from-transparent to-black-opacity-30 rounded-full absolute bottom-0 right-0 animation-delay-2s animate-moveImageUpTODown w-0 sm:w-24 md:w-32" alt="WeBrainTech" src="/svg/2.png" width={150} height={150} />
                <Image className="bg-gradient-to-b from-transparent to-black-opacity-30 rounded-full absolute bottom-0 left-0 animate-moveImageUpTODown w-0 sm:w-24 md:w-32" alt="WeBrainTech" src="/svg/3.png" width={150} height={150} />
            </div>
        </div>
    )
}

export default Hero;
