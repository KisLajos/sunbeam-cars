const carname = sessionStorage.getItem("carname")
const pickupdate = sessionStorage.getItem("pickupdate")
const handindate = sessionStorage.getItem("handindate")
const rentaldays = sessionStorage.getItem("rentaldays")
const rentalcost = sessionStorage.getItem("rentalcost")
const total = sessionStorage.getItem("total")
const accessoriescost = sessionStorage.getItem("accessoriescost")
const accessories = JSON.parse(sessionStorage.getItem("goods"))
const firstname = sessionStorage.getItem("firstname");
const lastname = sessionStorage.getItem("lastname");
const streetname = sessionStorage.getItem("streetname");
const numberfloor = sessionStorage.getItem("numberfloor");
const postalcode = sessionStorage.getItem("postalcode");

let template = `
    <h2>Rental information</h2>
    <p>All inclusive:</p>
    <p>TOTAL ${total}</p>
    <p>incl. VAT</p>
    <br>
    <p class="bold-text">${carname}</p>
    <p>Pick-up date: ${pickupdate}</p>
    <p>Return date: ${handindate}</p>
    <p>Rental days: ${rentaldays}</p>
    <br>
    <p class="bold-text">Total car rental cost: ${rentalcost} kr.</p>
    <p>incl. VAT</p>
    <br>
    <h3>Accessories</h3>
    <ul>
`

for (let item of accessories) {
    item = item.substring(0, item.indexOf('('));
    template += `<li>${item}</li>`
}

template += `</ul>
<br>
<p class="bold-text">Accessories total: ${accessoriescost} kr.</p>
<p>incl. VAT</p>
`

const output = document.getElementById("output");
output.insertAdjacentHTML("beforeend", template);

let formtemplate = `
<p>First name: <span class="bold-text">${firstname}</span></p>
<p>Last name: <span class="bold-text">${lastname}</span></p>
<p>Address: <span class="bold-text">${streetname} ${numberfloor}</span></p>
<p>Postal code and city: <span class="bold-text">${postalcode}</span></p>

<div class="flex-full-centered">
    <button class="no-print book-button margin-1" onclick="window.print()">Print receipt</button>
</div>
`

const formoutput = document.getElementById("formoutput");
formoutput.insertAdjacentHTML("beforeend", formtemplate);