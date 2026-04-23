document.getElementById("registerForm")
.addEventListener("submit", function(e) {
    e.preventDefault();

    const data = {
        fullName: fullName.value,
        email: email.value,
        domain: domain.value,
        university: university.value
    };

    // Save to localStorage
    localStorage.setItem("student", JSON.stringify(data));

    // Redirect
    window.location.href = "/dashboard.html";
});