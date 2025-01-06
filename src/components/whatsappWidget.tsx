'use client';

import Script from 'next/script';

const WhatsAppWidget = () => {
    const widgetId = "xiStMw"; // Replace with the correct widget-id

    return process.env.NODE_ENV === "production" ? (
        <>
            <Script
                type="text/javascript"
                src="https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js"
                strategy="lazyOnload" // Ensures the script loads after the page
                onLoad={() => console.log("Aisensy Widget Loaded")}
                onError={(e) => console.error("Error loading Aisensy Widget", e)}
                id="aisensy-wa-widget"
                widget-id={widgetId}
                data-widget-id={widgetId}
            />
        </>
    ) : (
        <></>
    );
};

export default WhatsAppWidget;
