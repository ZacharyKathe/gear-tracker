if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('../service-worker.js')
            .then((reg) => console.log('Service worker registered.', reg))
            .catch((err) => console.log('Service worker error:', err))
    });
}
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker
//             .register('../service-worker-site.js')
//             .then((reg) => console.log('Service worker registered.', reg))
//             .catch((err) => console.log('Service worker error:', err))
//     });
// }

if (document.querySelector("#loginForm")) {
    document.querySelector("#loginForm").addEventListener("submit", event => {
        event.preventDefault();
        const fetchObj = {
            email: document.querySelector("#loginEmail").value,
            password: document.querySelector("#loginPassword").value,
        }
        fetch("/portal/login", {
            method: "POST",
            body: JSON.stringify(fetchObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            console.log(res);
            if (res.ok) {
                // alert("logged in successfully!")
                location.replace("/dashboard")
            } else {
                alert("Account information not found!")
                location.reload();
            }
        })
    })
}

if (document.querySelector("#signupForm")) {
    document.querySelector("#signupForm").addEventListener("submit", event => {
        event.preventDefault();
        const fetchObj = {
            email: document.querySelector("#signupEmail").value,
            password: document.querySelector("#signupPassword").value,
            username: document.querySelector("#signupUsername").value,
        }
        console.log(fetchObj);
        fetch("/portal/new", {
            method: "POST",
            body: JSON.stringify(fetchObj),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.ok) {
                // console.log("signed up successfully!")
                location.replace("/dashboard")
            } else {
                alert("signup failed!")
                location.reload();
            }
        })
    })
}

