import { ButtonLink, ButtonWhite } from "@/utils/Buttons";


function FeatureSection() {

    return (
        <div className="container my-7 p-4 sm:p-8 flex flex-col-reverse sm:flex-row gap-4">
            <div className="flex flex-col gap-4 w-full">
                <p className="text-red-500">A Vision for Next-Gen</p>
                <h2 className="text-4xl sm:text-5xl font-bold mb-6">Medium length section heading goes here</h2>
                <p className="pb-0 sm:pb-4">Our courses are designed to equip you with practical skills and knowledge. Whether you are a beginner or looking to advance, we have something for everyone.</p>
                <ul className="list-disc counter-reset list-counter pl-8 sm:pl-6">
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                    <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
                </ul>
            </div>
            <div className="border bg-gradient-to-b from-transparent to-black/30 aspect-video w-full">
            </div>
        </div>
    )
}

export default FeatureSection;

export function FeatureListSection() {
    return (
        <div className="relative my-7 p-4 sm:p-8 h-96 sm:h-auto">
            {/* Background Image */}
            <div className="absolute inset-0 bg-cover bg-center"
            // style={{ backgroundImage: "url('/images/front_image.jpg')" }}
            ></div>
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

export function BlogSection() {
    return (
        <div className="container p-4 sm:p-8">
            <div className="flex flex-col gap-4 sm:gap-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-0 md:items-end pb-4 sm:pb-8">
                    <div>
                        <p className="text-red-500 pb-4 sm:pb-8">Blog</p>
                        <h3 className="text-2xl sm:text-5xl pb-2 sm:pb-6 font-bold">Insights and Inspirations</h3>
                        <p>Explore our latest articles and success stories.</p>
                    </div>
                    <ButtonWhite title="View all" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                    <div className="block w-full">
                        <div>
                            <div className="bg-gradient-to-b from-transparent to-black/30 h-60 mb-4"></div>
                            <div className="flex flex-row gap-4 sm:gap-8 items-center mb-2">
                                <h5 className="bg-gray-200 p-1 text-sm">Education</h5>
                                <p className="text-sm">5 min read</p>
                            </div>
                            <h4 className="font-bold text-base sm:text-lg pb-3">Unlocking Potential Through Education</h4>
                            <p className="text-sm pb-2">Discover how education transforms lives and careers.</p>

                            <ButtonLink title="Read more" />
                        </div>
                    </div>

                    <div className="block w-full">
                        <div>
                            <div className="bg-gradient-to-b from-transparent to-black/30 h-60 mb-4"></div>
                            <div className="flex flex-row gap-4 sm:gap-8 items-center mb-2">
                                <h5 className="bg-gray-200 p-1 text-sm">Success</h5>
                                <p className="text-sm">6 min read</p>
                            </div>
                            <h4 className="font-bold text-base sm:text-lg pb-3">Empowering Stories of Achievement</h4>
                            <p className="text-sm pb-2">Read inspiring stories from our successful students.</p>

                            <ButtonLink title="Read more" />
                        </div>
                    </div>

                    <div className="block w-full">
                        <div>
                            <div className="bg-gradient-to-b from-transparent to-black/30 h-60 mb-4"></div>
                            <div className="flex flex-row gap-4 sm:gap-8 items-center mb-2">
                                <h5 className="bg-gray-200 p-1 text-sm">Upadates</h5>
                                <p className="text-sm">4 min read</p>
                            </div>
                            <h4 className="font-bold text-base sm:text-lg pb-3">Latest News in Education</h4>
                            <p className="text-sm pb-2">Stay informed with latest updates from our community.</p>

                            <ButtonLink title="Read more" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CourseSection() {
    return (
        <div className="container p-4 sm:p-8">
            <p className="text-red-500 text-center pb-4 sm:pb-8">Courses</p>
            <h3 className="text-center text-2xl sm:text-5xl pb-4 sm:pb-8 font-bold">Explore Our Course Offerings</h3>
            <p className="text-center pb-4 sm:pb-8">Diverse course tailored for every learner&#39;s needs.</p>

            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 justify-center">

                <div className="flex flex-col justify-between gap-4 lg:flex-row">
                    <div className="border border-black dark:border-white p-2 sm:p-4 flex flex-col justify-between gap-10">
                        <div>
                            <h4 className="font-bold text-lg sm:text-xl">Find Your Perfect Course</h4>
                            <p>Choose from beginner to advanced levels.</p>
                        </div>
                        <ButtonLink title="Learn" />
                    </div>

                    <div className="border border-black dark:border-white p-2 sm:p-4 flex flex-col justify-between gap-10">
                        <div>
                            <h4 className="font-bold text-lg sm:text-xl">Specialized Courses for Professionals</h4>
                            <p>Enhance your skills with expert-led training.</p>
                        </div>
                        <ButtonLink title="Enroll" />
                    </div>
                </div>

                <div className="border border-black dark:border-white flex flex-col lg:flex-row gap-4">
                    <div className="bg-gradient-to-b from-transparent to-black/30 w-full h-40 lg:w-80 lg:h-60">
                    </div>
                    <div className="flex flex-col gap-4 justify-center p-2 lg:p-0">
                        <p>Topics</p>
                        <h4>Flexible Learning Options Available</h4>
                        <h6>Study at your own pace, anytime, anywhere.</h6>
                        <ButtonLink title="Join" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export function AboutSection() {
    return (
        <div className="container p-4 sm:p-8">
            <div className="flex gap-4 flex-col">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div>
                        <p className="text-red-500 pb-2 sm:pb-4">Learn</p>
                        <h3 className="text-2xl sm:text-5xl font-bold">Empowering Your Learning Journey with Us</h3>
                    </div>
                    <div className="flex flex-col gap-8 w-full">
                        <p>Founded with a vision to make education accessible, our platform has evolved to offer a diverse range of courses tailored to various learning styles. Our mission is to empower individuals through quality education, fostering a community of lifelong learners. Join us as we continue to innovate and inspire learning experiences that transform lives.</p>
                        <div className="flex gap-4 items-center">
                            <ButtonWhite title="Enroll" />
                            <ButtonLink title="Explore" />
                        </div>
                    </div>
                </div>
                <div className="bg-gradient-to-b from-transparent to-black/30 w-full aspect-video ">

                </div>
            </div>
        </div>
    )
}