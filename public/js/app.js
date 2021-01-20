window.onload = function () {
    const formLocation = document.querySelector('form')
    const search = document.querySelector('input')
    const msg1 = document.querySelector('#msg-1')
    const msg2 = document.querySelector('#msg-2')

    formLocation.addEventListener('submit', (ev) => {
        ev.preventDefault()

        msg1.textContent = 'Loading...'
        msg2.textContent = ' '

        const location = search.value

        const url = 'http://localhost:3000/weather?address=' + location


        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error){
                    console.log(data.error)
                    msg1.textContent = data.error
                }
                else{
                    console.log(data)
                    msg1.textContent = 'Shawing the result for ' + data.place
                    msg2.textContent = 'latitude: ' + data.latitude + ' longitude: ' + data.latitude
                }
            })
        })


    })
}

