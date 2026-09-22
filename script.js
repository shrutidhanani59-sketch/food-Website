let user = "shrutidhanani59@gmail.com";
let pass = "123456";

document.querySelector(".btn").onclick = function () {

    let email = document.querySelector(".email").value;
    let password = document.querySelector(".password").value;

    if (email === user && password === pass) {

        alert("Login Successful ✅");
        location.href="Home.html";

    } else {

        alert("Wrong Email or Password ❌");

    }
    
    
};



// બધા ADD+ buttons select કરો
