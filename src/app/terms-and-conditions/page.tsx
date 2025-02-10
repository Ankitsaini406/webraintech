export const metadata = {
    title: "Terms and Conditions",
    description: "Read the Terms and Conditions of Webraintech. Information regarding bookings, cancellations, refunds, and academy services.",
    keywords: [
        "Terms and Conditions",
        "Webraintech Terms",
        "Booking Policy",
        "Refund Terms",
        "Cancellation Rules",
        "Travel Services Agreement",
        "Customer Rights"
    ],
    openGraph: {
        title: "Terms and Conditions",
        description: "Familiarize yourself with the Terms and Conditions of Webraintech, covering booking policies, cancellations, refunds, and academy services.",
        url: "https://webraintech.in/terms-and-conditions",
        type: "website",
        // images: [
        //     {
        //         url: "/terms-conditions-banner.jpg",
        //         width: 1200,
        //         height: 630,
        //         alt: "Tripway Holidays Terms and Conditions",
        //     }
        // ]
    },
};

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto p-4 sm:p-8">
            <h1 className="text-3xl font-bold mb-6">WebBainTech Academy Terms and Conditions</h1>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">1. Introduction</h2>
                <p>
                    Welcome to WebBainTech Academy. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions. If you do not agree with any part of these terms, please do not use our services.
                </p>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">2. Enrollment and Registration</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">To enroll in our courses, you must provide accurate and complete information.</li>
                    <li className="pb-1">WebBainTech Academy reserves the right to refuse or cancel any registration if fraudulent, incomplete, or inaccurate information is provided.</li>
                    <li className="pb-1">Students must be at least 16 years old to enroll unless specified otherwise.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">3. Course Access and Materials</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">Course materials, including videos, documents, and other resources, are for personal use only and must not be shared or redistributed.</li>
                    <li className="pb-1">Unauthorized distribution of course content will result in immediate termination of access without a refund.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">4. Payments and Refund Policy</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">Payment for courses must be completed before access is granted.</li>
                    <li className="pb-1">Refunds will only be issued if requested within 7 days of enrollment, provided that the student has not accessed more than 10% of the course content.</li>
                    <li className="pb-1">WebBainTech Academy reserves the right to modify course fees at any time.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">5. Code of Conduct</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">Students must engage in respectful and professional behavior when interacting with instructors, staff, and peers.</li>
                    <li className="pb-1">Harassment, discrimination, or inappropriate behavior will result in immediate expulsion from the academy.</li>
                    <li className="pb-1">Any attempt to hack, cheat, or manipulate the learning platform is strictly prohibited.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">6. Certification and Completion</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">Certificates will be issued only upon successful completion of all course requirements.</li>
                    <li className="pb-1">WebBainTech Academy reserves the right to revoke certificates if academic dishonesty is detected.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">7. Intellectual Property</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">All content, including but not limited to videos, text, graphics, and software, is the property of WebBainTech Academy and is protected under intellectual property laws.</li>
                    <li className="pb-1">Unauthorized use, reproduction, or distribution of content is strictly prohibited.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">8. Limitation of Liability</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">WebBainTech Academy is not responsible for any technical issues, service interruptions, or data loss.</li>
                    <li className="pb-1">We do not guarantee job placement upon course completion.</li>
                    <li className="pb-1">Users assume all risks associated with applying the knowledge gained from our courses.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">9. Modifications to Terms</h2>
                <ul className="list-disc pl-5">
                    <li className="pb-1">WebBainTech Academy reserves the right to update these terms and conditions at any time.</li>
                    <li className="pb-1">Continued use of our services after changes are made constitutes acceptance of the revised terms.</li>
                </ul>
            </section>

            <section className="mb-4">
                <h2 className="text-xl font-semibold pb-4">10. Contact Information</h2>
                <p className="pb-4">For any questions or concerns regarding these terms, please contact us at:</p>
                <p><strong>Email:</strong> <a href="mailto:info@webraintech.in">info@webraintech.in</a></p>
                <p><strong>Phone:</strong> +91 8233101033</p>
            </section>
        </div>
    );
};

export default TermsAndConditions;
