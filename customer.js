const carname = sessionStorage.getItem("carname")
const pickupdate = sessionStorage.getItem("pickupdate")
const handindate = sessionStorage.getItem("handindate")
const rentaldays = sessionStorage.getItem("rentaldays")
const rentalcost = sessionStorage.getItem("rentalcost")
const total = sessionStorage.getItem("total")
const accessoriescost = sessionStorage.getItem("accessoriescost")
const accessories = JSON.parse(sessionStorage.getItem("goods"))

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

fetch("https://dawa.aws.dk/postnumre")
.then(function (data) {
    return data.json()
})
.then(function (post) {
    //status, address
    const datalist = document.getElementById('codelist')
    const listofcities = post;

    for (city of listofcities){
        datalist.insertAdjacentHTML("beforeend",`<option>${city.nr} ${city.navn}</option>`)
    }
})

const form = document.getElementById("customerform");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const firstname = document.getElementById("firstname").value;
    const lastname = document.getElementById("lastname").value;
    const streetname = document.getElementById("streetname").value;
    const numberfloor = document.getElementById("numberfloor").value;
    const postalcode = document.getElementById("postalcode").value;
    
    sessionStorage.setItem("firstname", firstname);
    sessionStorage.setItem("lastname", lastname);
    sessionStorage.setItem("streetname", streetname);
    sessionStorage.setItem("numberfloor", numberfloor);
    sessionStorage.setItem("postalcode", postalcode);
    
    document.location.href = "receipt.html";
})