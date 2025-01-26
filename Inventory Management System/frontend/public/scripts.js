/* global $, jQuery */
$(document).ready(function () {
    const checkSession = async () => {
        try {
            const response = await fetch("http://localhost:5000/check");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(await response.json());
            // console.log(success, id);
            // $("#loginForm").removeClass("codeRequested");
            // $("#2FABox").removeClass("ready");
            // if (success) {
            //     $("body").addClass("logged");
            //     $("#userId").text(id);
            // } else {
            //     $("body").removeClass("logged");
            //     $("#userId").text("");
            // }
        } catch (error) {
            console.error("Error checking session:", error);
        }
    };

    // Initialize the app
    checkSession();

    $("#logoutButton").click(async () => {
        try {
            await fetch(`/logout`);
            await checkSession();
        } catch (error) {
            console.error("Error logging out:", error);
        }
    });

    $("#loginForm").submit(async (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const password = e.target.password.value;
        const code = e.target.code.value;
        let url = `/login?id=${id}&password=${password}`;
        if (code) url += `&code=${code}`;
        try {
            const response = await fetch(url);
            const { success, error, codeRequested } = await response.json();

            if (codeRequested) {
                $("#loginForm").addClass("codeRequested");
                return;
            }

            if (success) {
                $("#loginForm").trigger("reset");
                await checkSession();
            } else {
                alert(error || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in.");
        }
    });

    $("#enable2FAButton").click(async () => {
        try {
            const token = localStorage.getItem('token');
            document.cookie = `token=${token}`;
            const response = await fetch('http://localhost:5000/qrImage', {
                method: 'GET',
                credentials: 'include', // This is important to include cookies
            });
            const { image, success } = await response.json();
            if (success) {
                $("#qrImage").attr("src", image);
                $("#2FABox").addClass("ready");
            } else {
                alert("Unable to fetch the QR image.");
            }
        } catch (error) {
            console.error("Error enabling 2FA:", error);
            alert("An error occurred while enabling 2FA.");
        }
    });

    $("#twoFAUpdateForm").submit(async (e) => {
        e.preventDefault();
        const code = e.target.code.value;
        try {
            const response = await fetch("http://localhost:5000/set2FA?code=" + code, {
                method: 'GET',
                credentials: 'include', // This is important to include cookies
            }
            );
            const { success } = await response.json();
            console.log("success", success)
            if (success) {
                alert("SUCCESS: 2FA enabled/updated.");
            } else {
                alert("ERROR: Unable to update/enable 2FA.");
            }
            $("#twoFAUpdateForm").trigger("reset");
        } catch (error) {
            console.error("Error updating 2FA:", error);
            alert("An error occurred while updating 2FA.");
        }
    });
});
