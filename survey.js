let selectedRating = 0;

const starButtons = document.querySelectorAll(".stars button");
const ratingText = document.getElementById("ratingText");
const submitButton = document.getElementById("submitRating");
const results = document.getElementById("results");

const yourRating = document.getElementById("yourRating");
const averageRating = document.getElementById("averageRating");
const totalVotes = document.getElementById("totalVotes");

const bars = {
  1: document.getElementById("bar1"),
  2: document.getElementById("bar2"),
  3: document.getElementById("bar3"),
  4: document.getElementById("bar4"),
  5: document.getElementById("bar5")
};

const counts = {
  1: document.getElementById("count1"),
  2: document.getElementById("count2"),
  3: document.getElementById("count3"),
  4: document.getElementById("count4"),
  5: document.getElementById("count5")
};

let ratings = JSON.parse(localStorage.getItem("collectionRatings")) || [5, 4, 5, 4, 3, 5, 4];

starButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedRating = Number(button.dataset.rating);
    updateStars(selectedRating);
    ratingText.textContent = `You selected ${selectedRating} out of 5 stars.`;
  });
});

submitButton.addEventListener("click", () => {
  if (selectedRating === 0) {
    ratingText.textContent = "Pick a star rating first.";
    return;
  }

  ratings.push(selectedRating);
  localStorage.setItem("collectionRatings", JSON.stringify(ratings));

  showResults();
  submitButton.disabled = true;
  submitButton.textContent = "Rating Submitted";
});

function updateStars(rating) {
  starButtons.forEach(button => {
    const starValue = Number(button.dataset.rating);

    if (starValue <= rating) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function showResults() {
  results.classList.remove("hidden");

  const voteCount = ratings.length;
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  const average = (sum / voteCount).toFixed(1);

  yourRating.textContent = `Your rating: ${selectedRating} out of 5 stars`;
  averageRating.textContent = `Average rating: ${average} out of 5 stars`;
  totalVotes.textContent = `Total responses: ${voteCount}`;

  for (let i = 1; i <= 5; i++) {
    const count = ratings.filter(rating => rating === i).length;
    const percent = (count / voteCount) * 100;

    bars[i].style.width = percent + "%";
    counts[i].textContent = count;
  }
}
