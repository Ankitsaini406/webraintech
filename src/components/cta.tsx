import { ButtonBlack, ButtonWhite } from "@/utils/Buttons";


function CtaSection() {
    return (
        <div className="container border border-black dark:border-white m-auto my-8 w-4/5 flex flex-col sm:flex-row justify-between">
            <div className="p-4 sm:p-8">
            <h2 className="text-2xl sm:text-5xl pb-4 sm:pb-8 font-bold">Discover Your Next Course</h2>
            <h4>Explore our diverse course offerings and find the perfect fit for your learning journey.</h4>
            <div className="flex gap-4 sm:gap-8 pt-4 sm:pt-8 flex-wrap">
                <ButtonBlack title="Enroll" />
                <ButtonWhite title="Learn More" />
            </div>
            </div>
            <div className="bg-gradient-to-b from-transparent to-black/30 w-full sm:w-1/2 aspect-video sm:aspect-video"></div>
        </div>
    )
}

export default CtaSection;