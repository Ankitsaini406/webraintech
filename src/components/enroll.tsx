import { ButtonLink, ButtonWhite } from "@/utils/Buttons";

function Enroll() {

    const enrollData = [
        {
            title: "Accessing Course Content Made Easy",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
        {
            title: "Stay Engaged with Interactive Learning",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
        {
            title: "Support at Every Step of Your Journey",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
        {
            title: "Medium length section heading goes here",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.",
        },
    ]

    return (
        <div className="my-7 p-4 sm:p-8 bg-gray-100 dark:bg-zinc-800">
        <div className="container">
            <p className="pb-6">Enroll</p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:w-full">Simple Steps to Enroll in Courses</h1>
            <h2 className="w-full sm:w-3/4 xl:w-1/2 pb-8">Enrolling in our courses is a straightforward process. Just choose your desired course, complete the registration, and start learning immediately.</h2>

                {/* Card Items */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pb-10">
                    {
                        enrollData.map((item) => (
                            <div key={item.title} className="flex flex-col items-center sm:items-start cursor-pointer">
                                <div className="border bg-gradient-to-b from-transparent to-black/30 aspect-square w-full sm:w-40 lg:w-full"></div>
                                <h3 className="py-2 sm:py-4 text-base sm:text-xl font-bold">{item.title}</h3>
                                <h4>{item.description}</h4>
                            </div>
                        ))
                    }
                </div>

            <div className="flex gap-8 items-center">
            <ButtonWhite title="Learn More" />
            <ButtonLink title="Sign Up" />
            </div>
        </div>
        </div>
    )
}

export default Enroll;