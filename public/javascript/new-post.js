const newPostBtn = document.getElementById("create-post-btn");

const newPostHandler = async () => {
  const title = document.getElementById("new-post-title").value.trim();
  const post_text = document.getElementById("new-post-content").value.trim();

  if (title && post_text) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, post_text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      window.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

newPostBtn.addEventListener("click", newPostHandler);
