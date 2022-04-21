const firstInput = document.querySelector('#first-input')
const secondInput = document.querySelector('#second-input')

fetch('https://api.exchangerate.host/latest?base=RUB&symbols=USD')
    .then(resp => resp.json())
    .then(data => {
        firstInput.value = 1;
        secondInput.value = data.rates.USD
        firstInput.parentNode.querySelector('p').innerHTML = `1 RUB = ${data.rates.USD} USD`
        secondInput.parentNode.querySelector('p').innerHTML = `1 USD = ${1 / data.rates.USD} RUB`
    })
    .catch(err => alert(err))

const currencies = document.querySelectorAll('.wrapper__app-list')

let changeCurrencyForFirst = 'USD';
let changeCurrencyForSecond = 'RUB';

currencies[0].childNodes.forEach(e => {
    e.addEventListener('click', (event) => {
        event.target.parentNode.querySelector('.wrapper__app-active').classList.remove('wrapper__app-active')
        event.target.classList.add('wrapper__app-active')

        let currentCurrency = event.target.innerHTML
        changeCurrencyForSecond = event.target.innerHTML
        let changeCurrency = currencies[1].querySelector('.wrapper__app-active').innerHTML

        if (currentCurrency == changeCurrency) {
            secondInput.value = firstInput.value
            firstInput.parentNode.querySelector('p').innerHTML = `1 ${changeCurrency} = 1 ${currentCurrency}`
            secondInput.parentNode.querySelector('p').innerHTML = `1 ${changeCurrency} = 1 ${currentCurrency}`
        } else {
            if (changeCurrency == 'EURO') {
                changeCurrency = 'EUR'
            }
            fetch(`https://api.exchangerate.host/latest?base=${currentCurrency}&symbols=${changeCurrency}`)
                .then(resp => resp.json())
                .then(data => {
                    secondInput.value = firstInput.value * data.rates[`${changeCurrency}`]
                    firstInput.parentNode.querySelector('p').innerHTML = `1 ${currentCurrency} = ${data.rates[`${changeCurrency}`]} ${changeCurrencyForFirst}`
                    secondInput.parentNode.querySelector('p').innerHTML = `1 ${changeCurrency} = ${data.rates[`${changeCurrency}`]}  ${changeCurrencyForSecond}`
                })
                .catch(err => alert(err))
        }
    })
})

currencies[1].childNodes.forEach(e => {
    e.addEventListener('click', (event) => {
        event.target.parentNode.querySelector('.wrapper__app-active').classList.remove('wrapper__app-active')
        event.target.classList.add('wrapper__app-active')

        let currentCurrency = event.target.innerHTML
        changeCurrencyForFirst = event.target.innerHTML
        let changeCurrency = currencies[0].querySelector('.wrapper__app-active').innerHTML

        if (currentCurrency == changeCurrency) {
            secondInput.value = firstInput.value
            firstInput.parentNode.querySelector('p').innerHTML = `1 ${changeCurrency} = 1 ${currentCurrency}`
            secondInput.parentNode.querySelector('p').innerHTML = `1 ${changeCurrency} = 1 ${currentCurrency}`
        } else {
            if (currentCurrency == 'EURO') {
                currentCurrency = 'EUR'
            }
            fetch(`https://api.exchangerate.host/latest?base=${changeCurrency}&symbols=${currentCurrency}`)
                .then(resp => resp.json())
                .then(data => {
                    secondInput.value = firstInput.value * data.rates[`${currentCurrency}`]
                    firstInput.parentNode.querySelector('p').innerHTML = `1 ${changeCurrency} = ${data.rates[`${currentCurrency}`]} ${changeCurrencyForFirst}`
                    secondInput.parentNode.querySelector('p').innerHTML = `1 ${currentCurrency} = ${data.rates[`${currentCurrency}`]}  ${changeCurrencyForSecond}`
                })
                .catch(err => alert(err))
        }
    })
})

firstInput.addEventListener('keyup', () => {
    let currentCurrency = currencies[0].querySelector('.wrapper__app-active').innerHTML
    let changeCurrency = currencies[1].querySelector('.wrapper__app-active').innerHTML

    if (firstInput.value[firstInput.value.length - 1] == ',') {
        firstInput.value = firstInput.value.replace(',', '.')
    }

    if (firstInput.value.length == 0) {
        firstInput.value = 0
    }

    if (firstInput.value[firstInput.value.length - 1].match(/[^0-9.,]/g)) {
        alert('Herf ve ya simvol daxil edilmishdir!!!')
        firstInput.value = 1
    }

    if (currentCurrency == changeCurrency) {
        secondInput.value = firstInput.value
    } else {
        if (currentCurrency == 'EURO') {
            currentCurrency = 'EUR'
        }
        fetch(`https://api.exchangerate.host/latest?base=${currentCurrency}&symbols=${changeCurrency}`)
            .then(resp => resp.json())
            .then(data => {
                secondInput.value = firstInput.value * data.rates[`${changeCurrency}`]
            })
            .catch(err => alert(err))
    }
})

secondInput.addEventListener('keyup', () => {
    let currentCurrency = currencies[1].querySelector('.wrapper__app-active').innerHTML
    let changeCurrency = currencies[0].querySelector('.wrapper__app-active').innerHTML

    if (secondInput.value[secondInput.value.length - 1] == ',') {
        secondInput.value = secondInput.value.replace(',', '.')
    }

    if (secondInput.value[secondInput.value.length - 1].match(/[^0-9.,]/g)) {
        alert('Herf ve ya simvol daxil edilmishdir!!!')
        secondInput.value = 1
    }

    if (currentCurrency == changeCurrency) {
        firstInput.value = secondInput.value
    } else {
        if (currentCurrency == 'EURO') {
            currentCurrency = 'EUR'
        }
        fetch(`https://api.exchangerate.host/latest?base=${currentCurrency}&symbols=${changeCurrency}`)
            .then(resp => resp.json())
            .then(data => {
                firstInput.value = secondInput.value * data.rates[`${changeCurrency}`]
            })
            .catch(err => alert(err))
    }
})