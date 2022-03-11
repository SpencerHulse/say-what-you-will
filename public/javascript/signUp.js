const signUpBtn = document.getElementById("sign-up-btn");

const signUpBtnHandler = async (event) => {
  event.preventDefault();

  const username = document.getElementById("signUp-username").value.trim();
  const password = document.getElementById("signUp-password").value.trim();
  console.log(username, password);

  if (username && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

signUpBtn.addEventListener("click", signUpBtnHandler);
