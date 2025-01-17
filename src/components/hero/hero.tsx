import { ButtonBlack, ButtonWhite } from "@/utils/Buttons";
import Image from "next/image";


function Hero() {
    return (
    <div className="container">
        <div className="my-7 p-4 rounded-lg flex justify-around gap-4 sm:gap-0 flex-col-reverse sm:flex-row relative items-center">
            <Image className="absolute top-1/4 left-8 animate-moveLeftToRight" alt="pen" src="/svg/pen.svg" width={50} height={50} />
            <Image className="absolute top-10 right-10 animate-moveLeftToRight" alt="pen" src="/svg/airoplan.svg" width={50} height={50} />

            <div className="w-full sm:w-2/3">
                <h1 className="text-4xl leading-tight sm:text-4xl lg:text-6xl sm:leading-snug lg:leading-tight font-bold">Transform Your <span className="text-red-500">Skills</span><br></br> Start Achieving <span className="text-red-500">Goals</span></h1>
                {/* <p className="mt-4 sm:mt-8 lg:leading-loose">Step into the future with confidence—start learning today!</p> */}
                <div className="flex gap-4 mt-8">
                    <ButtonBlack title="Enroll" />
                    <ButtonWhite title="Learn More" />
                </div>
            </div>

            <div className="w-2/4 justify-center flex relative">
                <Image className="bg-gradient-to-b from-transparent to-black-opacity-30 rounded-full max-w-56 sm:max-w-full" alt="WeBrainTech" src="/svg/1.png" width={500} height={500} />
                <Image className="bg-gradient-to-b from-transparent to-black-opacity-30 rounded-full absolute bottom-0 right-0 animation-delay-2s animate-moveImageUpTODown w-0 sm:w-24 lg:w-32" alt="WeBrainTech" src="/svg/hero-1.webp" width={150} height={150} />
                <Image className="bg-gradient-to-b from-transparent to-black-opacity-30 rounded-full absolute bottom-0 left-0 animate-moveImageUpTODown w-0 sm:w-24 lg:w-32" alt="WeBrainTech" src="/svg/hero-2.webp" width={150} height={150} />
            </div>
        </div>
        <div className="hidden sm:flex flex-wrap justify-center gap-4 lg:gap-8 items-center">
                <button className="px-6 py-2 rounded-full bg-red-500 text-white w-max font-bold animate-moveImageUpTODown">Web&nbsp;Technology</button>
                <button className="px-6 py-2 rounded-full bg-red-500 text-white w-max font-bold animate-moveImageUpTODown">AI&nbsp;Python</button>
                <button className="px-6 py-2 rounded-full bg-red-500 text-white w-max font-bold animate-moveImageUpTODown">Ethical&nbsp;Hacking</button>
                <button className="px-6 py-2 rounded-full bg-red-500 text-white w-max font-bold animate-moveImageUpTODown">Digital&nbsp;Markting</button>
                <button className="px-6 py-2 rounded-full bg-red-500 text-white w-max font-bold animate-moveImageUpTODown">Graphic&nbsp;Animation</button>
                <button className="px-6 py-2 rounded-full bg-red-500 text-white w-max font-bold animate-moveImageUpTODown">German&nbsp;Language</button>
                <button className="px-6 py-2 rounded-full bg-red-500 text-white w-max font-bold animate-moveImageUpTODown">Spoken&nbsp;English</button>
                </div>
    </div>
    )
}

export default Hero;
