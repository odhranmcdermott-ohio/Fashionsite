const bidForm = document.getElementById("bidForm");
const bidderNameInput = document.getElementById("bidderName");
const bidAmountInput = document.getElementById("bidAmount");
const highestBidText = document.getElementById("highestBid");
const highestBidderText = document.getElementById("highestBidder");
const bidMessage = document.getElementById("bidMessage");
const bidList = document.getElementById("bidList");
const resetBidsButton = document.getElementById("resetBids");

let bids = JSON.parse(localStorage.getItem("artBidsFresh")) || [];

displayBids();

bidForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const bidderName = bidderNameInput.value.trim();
  const bidAmount = parseFloat(bidAmountInput.value);

  if (bidderName === "") {
    bidMessage.textContent = "Please enter your name.";
    return;
  }

  if (isNaN(bidAmount) || bidAmount <= 0) {
    bidMessage.textContent = "Please enter a valid bid amount.";
    return;
  }

  const newBid = {
    name: bidderName,
    amount: bidAmount,
    time: new Date().toLocaleString()
  };

  bids.push(newBid);
  localStorage.setItem("artBidsFresh", JSON.stringify(bids));

  bidderNameInput.value = "";
  bidAmountInput.value = "";

  bidMessage.textContent = "Bid placed successfully.";
  displayBids();
});

resetBidsButton.addEventListener("click", function() {
  const confirmReset = confirm("Are you sure you want to reset all bids?");

  if (confirmReset) {
    bids = [];
    localStorage.removeItem("artBidsFresh");
    bidMessage.textContent = "Bid history has been reset.";
    displayBids();
  }
});

function displayBids() {
  bidList.innerHTML = "";

  if (bids.length === 0) {
    highestBidText.textContent = "$0";
    highestBidderText.textContent = "No bids yet";
    bidList.innerHTML = "<li>No bids have been placed yet.</li>";
    return;
  }

  const sortedBids = [...bids].sort((a, b) => b.amount - a.amount);
  const highest = sortedBids[0];

  highestBidText.textContent = `$${highest.amount}`;
  highestBidderText.textContent = `Highest bidder: ${highest.name}`;

  sortedBids.forEach(bid => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        <span class="bid-name">${bid.name}</span><br>
        <small>${bid.time}</small>
      </span>
      <span class="bid-amount">$${bid.amount}</span>
    `;

    bidList.appendChild(li);
  });
}
