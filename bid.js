const bidForm = document.getElementById("bidForm");
const bidderNameInput = document.getElementById("bidderName");
const bidAmountInput = document.getElementById("bidAmount");
const highestBidText = document.getElementById("highestBid");
const highestBidderText = document.getElementById("highestBidder");
const bidMessage = document.getElementById("bidMessage");
const bidList = document.getElementById("bidList");

let bids = JSON.parse(localStorage.getItem("artBids")) || [];

displayBids();

bidForm.addEventListener("submit", function(event) {
  event.preventDefault();

  const bidderName = bidderNameInput.value.trim();
  const bidAmount = Number(bidAmountInput.value);

  const highestBid = getHighestBid();

  if (bidderName === "") {
    bidMessage.textContent = "Please enter your name.";
    return;
  }

  if (bidAmount <= highestBid) {
    bidMessage.textContent = `Your bid must be higher than $${highestBid}.`;
    return;
  }

  const newBid = {
    name: bidderName,
    amount: bidAmount,
    time: new Date().toLocaleString()
  };

  bids.push(newBid);
  localStorage.setItem("artBids", JSON.stringify(bids));

  bidderNameInput.value = "";
  bidAmountInput.value = "";

  bidMessage.textContent = "Bid placed successfully.";
  displayBids();
});

function getHighestBid() {
  if (bids.length === 0) {
    return 0;
  }

  return Math.max(...bids.map(bid => bid.amount));
}

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
