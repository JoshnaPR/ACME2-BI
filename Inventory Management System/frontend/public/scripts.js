/* global $, jQuery */
$(document).ready(function () {
    $("#logoutButton").click(async () => {
        try {
            await fetch(`/logout`);
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
            } else {
                alert(error || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Error logging in:", error);
            alert("An error occurred while logging in.");
        }
    });
});
