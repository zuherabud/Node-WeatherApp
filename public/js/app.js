console.log('Zuher JS loaded')

const weatherForm = document.querySelector('form')
const searchButton = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    
    const location = searchButton.value

    fetch("/weather?address="+ location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = data.error
        }else{
            messageOne.textContent = data.Location
            messageTwo.textContent = 'Temperature: ' + data.Temperatur
        }
    })
})
})

// searchButton.addEventListener('submit', (e) => {
//     e.preventDefault()

//     const location = searchButton.value

//     console.log(location)

//     fetch("http://localhost:3000/weather?address="+ location).then((response) => {
//     response.json().then((data) => {
//         if (data.error){
//             console.log(data.error)
//         }else{
//             console.log(data)
//         }
//     })
// })
// })