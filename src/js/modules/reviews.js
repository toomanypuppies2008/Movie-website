const reviewsContainer = document.querySelector(".reviews-container");

export function getAndShowReviews() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((res) => {
      return res.json();
    })
    .then((reviews) => {
      let i = 0;
      const interval = setInterval(() => {
        let div1 = document.createElement("div");
        div1.textContent = `Я - название издания: ${reviews[i].title}`;
        div1.classList.add("review-title");
        reviewsContainer.appendChild(div1);
        let div2 = document.createElement("div");
        div2.textContent = `Я - отзыв: "${reviews[i].body}"`;
        div2.classList.add("review-text");
        reviewsContainer.appendChild(div2);
        i++;
      }, 1000);
      setTimeout(() => {
        clearInterval(interval);
      }, 7000);
    })
    .catch((error) => {
      reviewsContainer.textContent = `Кажется, что-то пошло не так: ${error.message}`;
    });
}
