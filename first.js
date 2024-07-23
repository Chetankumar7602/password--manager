document.addEventListener("DOMContentLoaded", () => {
    const tb = document.querySelector("table");
    const usernameInput = document.querySelector("#username");
    const passwordInput = document.querySelector("#password");
    const addButton = document.querySelector(".btn");
    const form = document.querySelector("#password-form");

    const loadPasswords = () => {
        let data = localStorage.getItem("passwords");
        if (data == null) {
            tb.innerHTML += "<tr><td colspan='4'>No data to show</td></tr>";
        } else {
            let arr = JSON.parse(data);
            let str = "";
            arr.forEach((element, index) => {
                str += `<tr>
                    <td>${element.website}</td>
                    <td>${element.username}</td>
                    <td><span class="blurred">${element.password}</span> <button class="toggle-view">View</button></td>
                    <td><button class="delete" data-index="${index}">Delete</button></td>
                </tr>`;
            });
            tb.innerHTML += str;
        }
    };

    const validateInputs = () => {
        if (usernameInput.value === "" || passwordInput.value === "" || document.querySelector("#website").value === "") {
            alert("All fields must be filled");
            return false;
        }
        return true;
    };

    addButton.addEventListener("click", (e) => {
        e.preventDefault();
        if (!validateInputs()) return;

        const websiteInput = document.querySelector("#website");
        let passwords = localStorage.getItem("passwords");
        let json = passwords ? JSON.parse(passwords) : [];

        json.push({ website: websiteInput.value, username: usernameInput.value, password: passwordInput.value });
        localStorage.setItem("passwords", JSON.stringify(json));
        alert("Password saved");

        websiteInput.value = "";
        usernameInput.value = "";
        passwordInput.value = "";

        // Refresh the table to show the new data
        location.reload();
    });

    tb.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
            let index = e.target.getAttribute("data-index");
            let passwords = JSON.parse(localStorage.getItem("passwords"));
            passwords.splice(index, 1);
            localStorage.setItem("passwords", JSON.stringify(passwords));
            location.reload();
        } else if (e.target.classList.contains("toggle-view")) {
            const passwordSpan = e.target.previousElementSibling;
            if (passwordSpan.classList.contains("blurred")) {
                passwordSpan.classList.remove("blurred");
                e.target.textContent = "Hide";
            } else {
                passwordSpan.classList.add("blurred");
                e.target.textContent = "View";
            }
        }
    });

    loadPasswords();
});
