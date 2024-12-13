'use client';

import { useEffect } from "react";
import { Alert } from "antd";

const DevelopmentAlert = () => {
    useEffect(() => {
        if (process.env.NODE_ENV === "production") {
            const handleContextMenu = (e: MouseEvent) => {
                e.preventDefault(); // Disable right-click in production
            };

            document.addEventListener("contextmenu", handleContextMenu);

            return () => {
                document.removeEventListener("contextmenu", handleContextMenu);
            };
        }
    }, []);

    return (
        process.env.NODE_ENV === "development" ? null : ( // Show alert only in production
            <Alert
                style={{
                    width: "100%",
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                }}
                banner
                message="Our platform is currently under development mode. Coming Soon..."
                type="warning"
                showIcon
            />
        )
    );
};

export default DevelopmentAlert;
