/* Carousel by Radu 
Source: https://codepen.io/maxym11/pen/dyGEzay */

const text1_options = [
    "Suzuki",
    "Opel",
    "Audi",
    "Volkswagen"
]

const text2_options = [
    "Way of Life.",
    "The Future is Everyone.",
    "Everyone dreams of an Audi.",
    "Das Auto."
]

const color_options = [
    "#EBB9D2",
    "#FE9968",
    "#7FE0EB",
    "#6CE5B1"
]

const image_options = [
    "https://images.unsplash.com/photo-1624464823981-ae6ef2c9a469?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1616574981661-026a4ec42aec?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1555652736-e92021d28a10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1561517118-6068d92c6474?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1142&q=80"
]

let clickdetected = false
let refreshIntervalId = setInterval(() =>  {
    optionNext.click()
}, 6500)

var i = 0
const currentOptionText1 = document.getElementById("current-option-text1")
const currentOptionText2 = document.getElementById("current-option-text2")
const currentOptionImage = document.getElementById("image")
const carousel = document.getElementById("carousel-wrapper")
const mainMenu = document.getElementById("menu")
const optionPrevious = document.getElementById("previous-option")
const optionNext = document.getElementById("next-option")

currentOptionText1.innerText = text1_options[i]
currentOptionText2.innerText = text2_options[i]
currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")"
mainMenu.style.background = color_options[i]

optionNext.onclick = function (e) {
    clickdetected = e.isTrusted //check if genuine click or a generated one

    if (clickdetected)
    {
        clearInterval(refreshIntervalId)
    }

    i = i + 1
    i = i % text1_options.length
    
    currentOptionText1.dataset.nextText = text1_options[i]
    currentOptionText2.dataset.nextText = text2_options[i]

    mainMenu.style.background = color_options[i]
    carousel.classList.add("anim-next")

    setTimeout(() => {
        currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")"
    }, 455)

    setTimeout(() => {
        currentOptionText1.innerText = text1_options[i]
        currentOptionText2.innerText = text2_options[i]
        carousel.classList.remove("anim-next")
    }, 650)
}

optionPrevious.onclick = function (e) {
    clickdetected = e.isTrusted //check if genuine click or a generated one
    
    if (clickdetected)
    {
        clearInterval(refreshIntervalId)
    }

    if (i === 0) {
        i = text1_options.length
    }
    i = i - 1

    currentOptionText1.dataset.previousText = text1_options[i]
    currentOptionText2.dataset.previousText = text2_options[i]

    mainMenu.style.background = color_options[i]
    carousel.classList.add("anim-previous")

    setTimeout(() => {
        currentOptionImage.style.backgroundImage = "url(" + image_options[i] + ")"
    }, 455)

    setTimeout(() => {
        currentOptionText1.innerText = text1_options[i]
        currentOptionText2.innerText = text2_options[i]
        carousel.classList.remove("anim-previous")
    }, 650)
}

/* Typewriter by Coding in Public
Source: https://codepen.io/Coding-in-Public/pen/yLPYjrv */

class Typewriter {
    constructor(element, options){
        this.element = element
        this.words = [... this.element.dataset.typewriter.split(',')]
        this.speed = options?.speed || 150
        this.delay = options?.delay || 1500
        this.repeat = options?.repeat
        this.initTyping()
    }

    wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    toggleTyping = () => this.element.classList.toggle('typing')
    
    async typewrite(word) {
        await this.wait(this.delay) //wait a bit
        this.toggleTyping() //remove blinking cursor
        for (const letter of word.split('')) {
            //add each letter based on the passed speed
            this.element.textContent += letter
            await this.wait(this.speed)
        }
        this.toggleTyping() //add back cursor
        await this.wait(this.delay) //wait a bit
        this.toggleTyping() //remove blinking cursor
        while (this.element.textContent.length !== 0) {
            //as long as there are letters in the word
            //remove them one by one
            this.element.textContent = this.element.textContent.slice(0, -1)
            await this.wait(this.speed)
        }
        this.toggleTyping() //add back cursor
    }
    
    async initTyping() {
        for (const word of this.words) {
            await this.typewrite(word)
        }

        if(this.repeat){
            await this.initTyping()
        }
        else {
            this.element.style.animation = 'none'
        }
    }
}

new Typewriter(
    document.querySelector('[data-typewriter]'),

    {   
        speed: 50,
        delay: 1000,
        repeat: true
    }
)