// ==========================
// REGISTER
// ==========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {

            const response = await fetch("http://localhost:5000/api/auth/register", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                alert("Registration Successful!");

                window.location.href = "login.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Server Error!");

        }

    });

}

// ==========================
// LOGIN
// ==========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("loginEmail").value.trim();
        const password = document.getElementById("loginPassword").value;

        try {

            const response = await fetch("http://localhost:5000/api/auth/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })

            });

            const data = await response.json();

            if (response.ok) {

                // Save Token
                localStorage.setItem("token", data.token);

                // Save User Name
                localStorage.setItem("username", data.user.name);

                alert("Login Successful!");

                window.location.href = "index.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Server Error!");

        }

    });

}


// =======================
// BOOK TOUR
// =======================

const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const booking = {

            fullName: document.getElementById("fullName").value,

            email: document.getElementById("bookingEmail").value,

            phone: document.getElementById("phone").value,

            destination: document.getElementById("destination").value,

            travelers: document.getElementById("travelers").value,

            travelDate: document.getElementById("travelDate").value,

            message: document.getElementById("message").value

        };

        try {

            const response = await fetch("http://localhost:5000/api/bookings", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(booking)

            });

            const data = await response.json();

            if (response.ok) {

                alert("🎉 Booking Successful!");

                bookingForm.reset();

            }

            else {

                alert(data.message);

            }

        }

        catch (error) {

            alert("Server Error");

            console.log(error);

        }

    });

}


// ==========================
// CONTACT FORM
// ==========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const contact = {

            name: document.getElementById("contactName").value,

            email: document.getElementById("contactEmail").value,

            subject: document.getElementById("contactSubject").value,

            message: document.getElementById("contactMessage").value

        };

        try {

            const response = await fetch("http://localhost:5000/api/contact", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(contact)

            });

            const data = await response.json();

            if (response.ok) {

                alert("Message Sent Successfully!");

                contactForm.reset();

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Server Error!");

        }

    });

}

// ==========================
// USER LOGIN STATUS
// ==========================

const navButtons = document.getElementById("navButtons");

if (navButtons) {

    const username = localStorage.getItem("username");

    if (username) {

        navButtons.innerHTML = `

            <span style="color:#ff7a00;font-weight:bold;margin-right:15px;">
                👋 Welcome, ${username}
            </span>

            <button id="logoutBtn" class="book-btn">
                Logout
            </button>

        `;

        document.getElementById("logoutBtn").addEventListener("click", () => {

            localStorage.removeItem("token");
            localStorage.removeItem("username");

            alert("Logged Out Successfully!");

            window.location.href = "login.html";

        });

    }

}



// ==========================
// HOME PAGE SEARCH
// ==========================

const searchForm = document.getElementById("searchForm");

if (searchForm) {

    searchForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const destination = document.getElementById("searchDestination").value;
        const date = document.getElementById("searchDate").value;
        const guests = document.getElementById("searchGuests").value;

        window.location.href =
            `booking.html?destination=${encodeURIComponent(destination)}&date=${encodeURIComponent(date)}&guests=${encodeURIComponent(guests)}`;

    });

}


// ==========================
// AUTO FILL BOOKING FROM HOME SEARCH
// ==========================

const params = new URLSearchParams(window.location.search);

const searchDestination = params.get("destination");
const searchDate = params.get("date");
const searchGuests = params.get("guests");

const destinationField = document.getElementById("destination");
const dateField = document.getElementById("travelDate");
const travelersField = document.getElementById("travelers");

if (destinationField && searchDestination) {
    destinationField.value = searchDestination;
}

if (dateField && searchDate) {
    dateField.value = searchDate;
}

if (travelersField && searchGuests) {

    // Convert "2 Persons" to 2
    const number = parseInt(searchGuests);

    if (!isNaN(number)) {
        travelersField.value = number;
    }

}