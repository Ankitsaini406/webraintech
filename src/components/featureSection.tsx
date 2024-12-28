

function FeatureSection() {

    return(
        <div className="my-7 p-4 sm:p-8 flex flex-col sm:flex-row gap-4">
            <div className="flex flex-col gap-4">
            <p className="text-red-500">A Vision for Next-Gen</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">Medium length section heading goes here</h2>
            <p className="pb-4">Our courses are designed to equip you with practical skills and knowledge. Whether you are a beginner or looking to advance, we have something for everyone.</p>
            <ul className="list-disc counter-reset list-counter pl-6">
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
