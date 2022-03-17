const url = window.location.search
const urldata = new URLSearchParams(url)
const carname = urldata.get("carname")
const pickupdate = urldata.get("pickupdate")
const handindate = urldata.get("handindate")
const rentaldays = urldata.get("rentaldays")
const rentalcost = parseFloat(urldata.get("rentalcost"))

const template = `
    <div>
        <p>Well chosen!</p>
        <p class="bold-text">${carname}</p>
        <p>Pick-up date: ${pickupdate}</p>
        <p>Return date: ${handindate}</p>
        <p>Rental days: ${rentaldays}</p>
        <p class="bold-text">Rental cost: ${rentalcost} kr. incl. VAT</p>
    </div>
`

const output = document.getElementById("output");
output.insertAdjacentHTML("beforeend", template);

let total = rentalcost; // Global variable, total starts at zero
showTotal(); // Calls function showTotal to show current total

// Event handler - check if checkbox is selected or not and 
// adjust the total value accordingly
function calculateTotal(checkbox, itemprice) {
    if (checkbox.checked === true) { // If the checkbox is seleted then ...
        total = Math.abs(total + parseFloat(itemprice*1.25));
    } else { // if it is not selected then ...
        total = Math.abs(total - parseFloat(itemprice*1.25));
    }
    showTotal();
}

// Shows total value on screen
function showTotal() {
    const output = document.getElementById("totaloutput");
    output.innerHTML = `
    <div class="total-flex">
        <span>All inclusive:</span>
        <span>TOTAL ${total.toLocaleString("da-DK", {style: "currency", currency: "DKK"})}</span>
        <span>incl. VAT</span>
    </div>
    `;
}

const form = document.getElementById("form");
form.reset(); // Resets form every time page loads

const checkboxes = document.getElementsByClassName("slist"); //Build an object list with checkboxes
form.addEventListener("submit", function(e) {
    e.preventDefault();
    let shoppinglist = []; // Define shopping list
    for (const checkbox of checkboxes) {
        if (checkbox.checked === true) { // If the item is selected ...
            shoppinglist.push(checkbox.dataset.item + "(dkr. " + checkbox.value + ")"); // add it to the shopping list.
        }
    }

    // Stores information in sessionstorage
    sessionStorage.setItem("goods", JSON.stringify(shoppinglist));
    sessionStorage.setItem("carname", carname);
    sessionStorage.setItem("pickupdate", pickupdate);
    sessionStorage.setItem("handindate", handindate);
    sessionStorage.setItem("rentaldays", rentaldays);
    sessionStorage.setItem("rentalcost", rentalcost);
    sessionStorage.setItem("accessoriescost", total-rentalcost);
    sessionStorage.setItem("total", total.toLocaleString("da-DK", {style: "currency",currency: "DKK"}));

    location.href="customer.html"; // Redirect user to customer.html
})