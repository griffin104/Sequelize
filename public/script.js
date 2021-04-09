let chart

async function windowActions() {
    const mealIds = getMealIds()
    let meals = await getMeals(mealIds)
    let macros = await getMacros(mealIds)

    // Sorting meals and macros array to assure same order
    meals.sort(function(a,b) {
        return a.meal_id - b.meal_id
    })

    macros.sort(function(a,b) {
        return a.meal_id - b.meal_id
    })

    createChart(meals, macros)
    displayDiningHalls()
}


// Gets 10 random meal IDs without repeat
function getMealIds() {
    let mealIds = []
    let curr
    while (mealIds.length < 10) {
        curr = Math.ceil(Math.random() * 46)
        if (!mealIds.includes(curr)) {
            console.log(curr)
            mealIds.push(curr)
        } else {
            console.log("Repeat!")
        }
    }
    return mealIds
}

// Returns array of meals based on their ID
async function getMeals(mealIds) {
    let meals = []

    await Promise.all(mealIds.map(async id => {
        const res = await fetch (`/api/meals/${id}`)
        const json = await res.json()
        meals.push(json[0])
    }))

    return meals
}


// Returns array of macros based on their ID
async function getMacros(mealIds) {
    let macros = []

    await Promise.all(mealIds.map(async id => {
        const res = await fetch(`/api/macros/${id}`)
        const json = await res.json()
        macros.push(json[0])
    }))

    return macros
}


// Creates CanvasJS chart
function createChart(meals, macros) {
    chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Macros in Each Meal"
        },
        subtitles: [
            {
                text: "(Per Serving Size)"
            }
        ],
        toolTip: {
            shared: true
        },
        legend: {
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "stackedBar",
            name: "Fat",
            showInLegend: "true",
            dataPoints: [
                {label: meals[0].meal_name, y: macros[0].fat/macros[0].serving_size},
                {label: meals[1].meal_name, y: macros[1].fat/macros[1].serving_size},
                {label: meals[2].meal_name, y: macros[2].fat/macros[2].serving_size},
                {label: meals[3].meal_name, y: macros[3].fat/macros[3].serving_size},
                {label: meals[4].meal_name, y: macros[4].fat/macros[4].serving_size},
                {label: meals[5].meal_name, y: macros[5].fat/macros[5].serving_size},
                {label: meals[6].meal_name, y: macros[6].fat/macros[6].serving_size},
                {label: meals[7].meal_name, y: macros[7].fat/macros[7].serving_size},
                {label: meals[8].meal_name, y: macros[8].fat/macros[8].serving_size},
                {label: meals[9].meal_name, y: macros[9].fat/macros[9].serving_size},
            ]
        },
        {
            type: "stackedBar",
            name: "Cholesterol",
            showInLegend: "true",
            dataPoints: [
                {label: meals[0].meal_name, y: macros[0].cholesterol/macros[0].serving_size},
                {label: meals[1].meal_name, y: macros[1].cholesterol/macros[1].serving_size},
                {label: meals[2].meal_name, y: macros[2].cholesterol/macros[2].serving_size},
                {label: meals[3].meal_name, y: macros[3].cholesterol/macros[3].serving_size},
                {label: meals[4].meal_name, y: macros[4].cholesterol/macros[4].serving_size},
                {label: meals[5].meal_name, y: macros[5].cholesterol/macros[5].serving_size},
                {label: meals[6].meal_name, y: macros[6].cholesterol/macros[6].serving_size},
                {label: meals[7].meal_name, y: macros[7].cholesterol/macros[7].serving_size},
                {label: meals[8].meal_name, y: macros[8].cholesterol/macros[8].serving_size},
                {label: meals[9].meal_name, y: macros[9].cholesterol/macros[9].serving_size},
            ]
        },
        {
            type: "stackedBar",
            name: "Protein",
            showInLegend: "true",
            dataPoints: [
                {label: meals[0].meal_name, y: macros[0].protein/macros[0].serving_size},
                {label: meals[1].meal_name, y: macros[1].protein/macros[1].serving_size},
                {label: meals[2].meal_name, y: macros[2].protein/macros[2].serving_size},
                {label: meals[3].meal_name, y: macros[3].protein/macros[3].serving_size},
                {label: meals[4].meal_name, y: macros[4].protein/macros[4].serving_size},
                {label: meals[5].meal_name, y: macros[5].protein/macros[5].serving_size},
                {label: meals[6].meal_name, y: macros[6].protein/macros[6].serving_size},
                {label: meals[7].meal_name, y: macros[7].protein/macros[7].serving_size},
                {label: meals[8].meal_name, y: macros[8].protein/macros[8].serving_size},
                {label: meals[9].meal_name, y: macros[9].protein/macros[9].serving_size},
            ]
        },
        {
            type: "stackedBar",
            name: "Carbohydrates",
            showInLegend: "true",
            dataPoints: [
                {label: meals[0].meal_name, y: macros[0].carbs/macros[0].serving_size},
                {label: meals[1].meal_name, y: macros[1].carbs/macros[1].serving_size},
                {label: meals[2].meal_name, y: macros[2].carbs/macros[2].serving_size},
                {label: meals[3].meal_name, y: macros[3].carbs/macros[3].serving_size},
                {label: meals[4].meal_name, y: macros[4].carbs/macros[4].serving_size},
                {label: meals[5].meal_name, y: macros[5].carbs/macros[5].serving_size},
                {label: meals[6].meal_name, y: macros[6].carbs/macros[6].serving_size},
                {label: meals[7].meal_name, y: macros[7].carbs/macros[7].serving_size},
                {label: meals[8].meal_name, y: macros[8].carbs/macros[8].serving_size},
                {label: meals[9].meal_name, y: macros[9].carbs/macros[9].serving_size},
            ]
        },
        
        
    ]
    })
    chart.render()
}

//Allows toggling of certain macros
function toggleDataSeries(e) {
	if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
		e.dataSeries.visible = false;
	}
	else {
		e.dataSeries.visible = true;
	}
    chart.render()
}

//Gets and displays information on each dining hall
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