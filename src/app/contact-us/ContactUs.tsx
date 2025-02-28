function ContactUs() {
    return (
        <div className="flex flex-col gap-4 md:gap-8 mb-8">
            <div className="relative bg-gradient-to-b from-transparent to-black-opacity-30 h-[300px] w-full">
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-4xl z-10">Contact Us</h1>
            </div>
            <div className="container">

                <div>
                    
                </div>

                <div className="w-full h-[400px] m-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1406.3016693028756!2d75.13453509889692!3d27.609120414261007!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396ca5c6b764d8ad%3A0x4cc2cfdc103c4783!2sWeBrainTech!5e0!3m2!1sen!2sin!4v1740718401461!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;