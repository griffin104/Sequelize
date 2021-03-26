function windowActions() {
    displayDiningHalls()
}



async function displayDiningHalls() {
    const table = document.querySelector('.table-body')
    const response = await fetch("/api/dining")
    const json = await response.json()
    console.log(json)
    json.data.forEach(place => {
        table.innerHTML += `<tr>
        <td>${place.hall_name}</td>
        <td>${place.hall_address}</td>
    </tr>`
})
}
 

window.onload = windowActions();