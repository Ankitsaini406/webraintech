

export const metadata = {
    title: "Privacy Policy",
    description: "Read the Privacy Policy of WeBrainTech to understand how we handle your personal information and data.",
    keywords: [
        "Privacy Policy",
        "Data Protection",
        "User Information",
        "WeBrainTech Privacy",
        "Personal Data Handling",
        "Privacy Terms",
        "Data Security"
    ],
    openGraph: {
        title: "Privacy Policy",
        description: "Discover how WeBrainTech safeguards your personal information and handles your data.",
        url: "https://webraintech.in/privacy-policy",
        type: "website",
        // images: [
        //     {
        //         url: "/privacy-banner.jpg",
        //         width: 1200,
        //         height: 630,
        //         alt: "WeBrainTech Privacy Policy",
        //     }
        // ]
    },
};

export default function PrivacyPolicy() {
    return (
        <div className="container p-4 sm:py-8">
            <h1 className="font-bold text-xl sm:text-4xl pb-4">Privacy Policy for Webraintech Academy</h1>
            <h4 className="font-bold">Effective Date: 10-Feb-2025</h4>
            <h4 className="font-bold">Last Upddate: 10-Feb-2025</h4>
            <p className="py-4 ">Welcome to Webraintech Academy. Your privacy is critically important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website, use our services, or interact with us.</p>

            <h2 className="font-bold text-xl sm:text-3xl">1. Information We Collect</h2>
            <p className="py-4">We collect different types of information in various ways to provide and improve our services:</p>

            <h3 className="pl-4 text-xl">A. Personal Information</h3>
            <p className="py-4 pl-6">We may collect personally identifiable information, including but not limited to:</p>
            <ul className="pb-4">
                <li className="pl-6 text-sm">- Name</li>
                <li className="pl-6 text-sm">- Email address</li>
                <li className="pl-6 text-sm">- Phone number</li>
                <li className="pl-6 text-sm">- Postal address</li>
                <li className="pl-6 text-sm">- Payment inforamtion</li>
                <li className="pl-6 text-sm">- Account login credentials</li>
            </ul>

            <h3 className="pl-4 text-xl">B. Non-Personal Information</h3>
            <p className="py-4 pl-6">We collect non-identifiable data such as:</p>
            <ul className="pb-4">
                <li className="pl-6 text-sm">- Browser type and version</li>
                <li className="pl-6 text-sm">- Operating system</li>
                <li className="pl-6 text-sm">- IP address</li>
                <li className="pl-6 text-sm">- Device inforamtion</li>
                <li className="pl-6 text-sm">- Usage data (pages visited, time spent, etc.)</li>
            </ul>

            <h3 className="pl-4 text-xl">C. Cookies and Tracking Technologies</h3>
            <p className="py-4 pl-6">We use cookies and similar tracking technologies to enhance user experience and analyze website traffic.</p>

            <h2 className="font-bold text-xl sm:text-3xl">2. How We Use Your Information</h2>
            <p className="py-4 pl-6">We use the collected information for the following purposes:</p>
            <ul className="pb-4">
                <li className="pl-6 text-sm">- To provide, maintain, and improve our services</li>
                <li className="pl-6 text-sm">- To process payments and transactions</li>
                <li className="pl-6 text-sm">- To communicate updates, promotions, and relevant information</li>
                <li className="pl-6 text-sm">- To personalize user experience</li>
                <li className="pl-6 text-sm">- To comply with legal obligations</li>
                <li className="pl-6 text-sm">- To enhance security and prevent fraud</li>
            </ul>

            <h2 className="font-bold text-xl sm:text-3xl">3. How We Share Your Information</h2>
            <p className="py-4 pl-6">We do not sell, trade, or rent personal information. However, we may share your data with:</p>
            <p className="pl-6"><span className="font-bold">Service Providers:</span>Third-party vendors assisting in operations such as payment processing, hosting, and analytics</p>
            <p className="pl-6"><span className="font-bold">Legal Compliance:</span>Authorities when required by law or to protect our legal rights</p>
            <p className="pb-4 pl-6"><span className="font-bold">Business Transfers:</span>In case of a merger, acquisition, or asset sale</p>

            <h2 className="font-bold text-xl sm:text-3xl">4. Data Security</h2>
            <p className="py-4 pl-6">We implement robust security measures to protect your personal data from unauthorized access, alteration, or disclosure. However, no method of data transmission over the internet is 100% secure.</p>

            <h2 className="font-bold text-xl sm:text-3xl">5. Your Rights and Choices</h2>
            <p className="py-4 pl-6">Depending on your location, you may have the right to:</p>
            <ul className="pb-4">
                <li className="pl-6 text-sm">- Access, update, or delete your personal data</li>
                <li className="pl-6 text-sm">- Opt-out of marketing communications</li>
                <li className="pl-6 text-sm">- Restrict processing of your data</li>
                <li className="pl-6 text-sm">- Request a copy of your data</li>
                <li className="pl-6 text-sm">- Withdraw consent at any time</li>
            </ul>
            <p className="py-4 pl-6">For any such requests, please contact us at *[Insert Contact Email]</p>

            <h2 className="font-bold text-xl sm:text-3xl">6. Third-Party Links</h2>
            <p className="py-4 pl-6">Our website may contain links to third-party websites. We are not responsible for their privacy policies or practices.</p>

            <h2 className="font-bold text-xl sm:text-3xl">7. Children&apos;s Privacy</h2>
            <p className="py-4 pl-6">Our services are not intended for children under 13 years of age. We do not knowingly collect personal data from minors.</p>

            <h2 className="font-bold text-xl sm:text-3xl">8. Changes to This Privacy Policy</h2>
            <p className="py-4 pl-6">We reserve the right to modify this Privacy Policy at any time. Changes will be posted on this page with an updated effective date.</p>

            <h2 className="font-bold text-xl sm:text-3xl">9. Contact Us</h2>
            <p className="py-4 pl-6">For any questions regarding this Privacy Policy, please contact us at:</p>

            <h4 className="font-bold pb-4">Webraintech Academy</h4>
            <p>Email: info@webraintech.in</p>
            <p>Phone: 8233101033</p>
            <p>Address: Webraintech academy, near chandpool gate, Sikar, 332001</p>

            <p className="py-4">Thank you for trusting Webraintech Academy with your personal information.</p>
        </div>
    )
}