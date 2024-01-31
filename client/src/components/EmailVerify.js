import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EmailVerify = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmailToken = async () => {
            const emailToken = searchParams.get("s");
            if (emailToken) {
                try {
                    const response = await fetch(`/auth/verify-Email?s=${emailToken}`);
                    const data = await response.json();
                    // Check if verification was successful
                    if (response.ok) {
                        navigate("/login"); // Redirect to login page after successful verification
                        toast.success(data.message);
                    } else {
                        // Handle verification error
                        toast.error(data.errorMessage);
                        // Optionally, you can display an error message to the user
                    }
                } catch (error) {
                    console.error("Error verifying email:", error);
                    toast.error("Error verifying email:");
                }
            } else {
                // Handle missing email token error
                console.error("No email token found in URL");
                toast.error("No email token found in URL");
            }
        };

        verifyEmailToken();
    }, [searchParams, navigate]); // Removed the extra array brackets here

    return (
        <div>
            {/* Optionally, you can display a loading indicator while verifying */}
            <p>Verifying email...</p>
        </div>
    );
};

export default EmailVerify;
