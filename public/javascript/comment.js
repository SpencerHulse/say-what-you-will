const commentBtn = document.getElementById("submit-comment");

const commentHandler = async (event) => {
  event.preventDefault();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const comment_text = document.getElementById("comment-body").value.trim();

  console.log(post_id, comment_text);

  const response = await fetch("/api/comments", {
    method: "POST",
    body: JSON.stringify({ post_id, comment_text }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert(response.statusText);
  }
};

commentBtn.addEventListener("click", commentHandler);
