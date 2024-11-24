import React, { useState } from 'react';
import axios from 'axios';

function Enable2FA() {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [email, setEmail] = useState('');

    const handleEnable2FA = async () => {
        try {
            const response = await axios.post('http://localhost:5000/enable-2fa', { email });
            setQrCodeUrl(response.data.qrCodeUrl); // This will contain the QR code data URL
        } catch (error) {
            console.error("Error enabling 2FA:", error);
        }
    };

    return (
        <div>
            <h2>Enable Two-Factor Authentication</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleEnable2FA}>Enable 2FA</button>

            {qrCodeUrl && (
                <div>
                    <h3>Scan this QR code with your Google Authenticator app:</h3>
                    <img src={qrCodeUrl} alt="QR Code" />
                </div>
            )}
        </div>
    );
}

export default Enable2FA;
