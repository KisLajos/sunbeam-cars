function validDates(pickupdate, handindate) {
    const pickup = new Date(pickupdate);
    const handin = new Date(handindate);

    // Creating a return object
    const res = {
        value: "",
        message: ""
    }

    // If the given dates are invalid, we return false and an error message
    if ((pickup.toString() === "Invalid Date") ||
        (handin.toString() === "Invalid Date") ) {
        res.value = false
        res.message = "Invalid date or dates!"
    }
    else {
        // If the given dates are wrong, we return false and an error message
        if (pickup >= handin) {
            res.value = false
            res.message = "The hand in date must be later than the pick up date!"
        } else {
            // Otherwise anything should be fine, so we return true and no error message
            res.value = true
            res.message = ""
        }
    }

    // A result object is always returned
    return res
}

function calcRentalDays(pickupdate, handindate) {
    const pickup = new Date(pickupdate);
    const handin = new Date(handindate);
    const timediff = handin.getTime() - pickup.getTime(); // The difference in time is in milliseconds
    const diffindays = timediff / (1000 * 3600 * 24) + 1; // so here we compensate for that with the 1000
    
    return diffindays; // We return the number of days (including the pick-up and hand-in day)
}

function calcRentalCost(days, priceperday, supplement) {
    // The total should be the base price + the price per day + the supplement per day
    // and then adding the 25% VAT to that subtotal
    const base = 495
    let totalprice = ((base + days*(priceperday+supplement)) * 1.25).toFixed(2)

    return totalprice;
}

function checkCar(car, persons, suitcases) {
    // If the input is smaller than the current car's data, we return true
    if (car.people >= persons && car.suitcases >= suitcases) {
        return true
    }
    else {
        return false // Otherwise it's false
    }
}

const form = document.getElementById("form");

// Event handler that is triggered when user clicks on submit button
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Do not reload after submit button is pressed

    // Bind javascript to the html elements with their id
    const pickupdate = document.getElementById("pick-up-date");
    const handindate = document.getElementById("hand-in-date");
    const persons = document.getElementById("persons");
    const suitcases = document.getElementById("suitcases")

    // Set up output areas
    const products = document.getElementById("products")
    const error = document.getElementById("error")
    products.innerHTML = ""
    error.innerHTML = ""

    // Initialize values for later
    let showCar = false
    let datesValid = false

    // Validate given dates
    datesValid = validDates(pickupdate.value, handindate.value);

    // If correct dates were given
    if (datesValid.value) {
        // We grab the data from the github repo
        fetch("https://kislajos.github.io/api/cars.json")
        .then(function (data) { // Waiting for the server to respond (promise)
            return data.json();
        })
        .then(function (post) {
            const carlist = post; // Assigning post as our datalist

            // We go through each car, and check if they need to be shown
            for (const car of carlist) {
                showCar = checkCar(car, persons.value, suitcases.value) // Checking if the car matches the criterias
                let template = ""
                if (showCar) {
                    // We need to add the car in the HTML
                    let rentaldays = calcRentalDays(pickupdate.value, handindate.value)
                    let calculatedPrice = calcRentalCost(rentaldays, 100, car.supplement)
                    
                    template = `
                    <div class="flex-full-centered">
                    <div class="cars car-3">
                        <div class="car-info flex-center-space-evenly">
                            <img src="${car.image}" alt="${car.carname}"> 
                            <h3>${car.carname}</h3>
                        </div>
                        <div class="car-details flex-full-centered">
                            <div class="flex flex-column">
                                <span>Category: ${car.category}</span>
                                <span>Persons: ${car.people}</span>
                                <span>Suitcases: ${car.suitcases}</span>
                            </div>
                        </div>
                        <div class="car-price-box flex-full-centered flex-column small-gap">
                            <span class="car-price">${calculatedPrice}</span>
                            <a class="book-button" href="accessories.html?carname=${car.carname}&pickupdate=${pickupdate.value}&handindate=${handindate.value}&rentaldays=${rentaldays}&rentalcost=${calculatedPrice}">Book Now</a>
                        </div>
                        </div>
                    </div>
                    `
                }
                // No else branch is needed, because the template remains empty if we found no cars

                products.insertAdjacentHTML("beforeend", template)
            }

            // If the output is somehow empty, we change it to show that there were no results
            if (products.innerHTML.length == 0) {
                let noresults = `<span class="no-results"> No results found :( </span>`

                products.insertAdjacentHTML("beforeend", noresults)
            }
        })
    }
    else {
        error.innerHTML = datesValid.message // The dates were incorrect, we show the corresponding error message
    }

}) // End of event handler