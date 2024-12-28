

function FeatureSection() {

    return (
        <div className="container my-7 p-4 sm:p-8 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex flex-col gap-4">
                <p className="text-red-500">A Vision for Next-Gen</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">Medium length section heading goes here</h2>
                <p className="pb-0 sm:pb-4">Our courses are designed to equip you with practical skills and knowledge. Whether you are a beginner or looking to advance, we have something for everyone.</p>
                <ul className="list-disc counter-reset list-counter pl-8 sm:pl-6">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>
            </div>
            <div className="border bg-gradient-to-b from-transparent to-black/30 aspect-square w-full">
            </div>
        </div>
    )
}

export default FeatureSection;

export function FeatureListSection() {
    return (
        <div className="relative my-7 p-4 sm:p-8 h-96 sm:h-auto">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center" ></div>
            <div className=" container bg-gradient-to-b from-transparent to-black/30 aspect-video w-full">

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/60"></div>

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4 text-center">
                    <h1 className="container text-2xl sm:text-5xl font-bold mb-4 w-full">Unlock Your Potential with Our Expert-Led Courses and Flexible Learning Options</h1>
                </div>
            </div>
        </div>
    )
}
