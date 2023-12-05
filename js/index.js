// // Envoi d'une requête à l'API météo pour la ville de Londres
// const reponse = fetch("http://api.weatherapi.com/v1/current.json?key=a74b07ca075b4dbf970112759230412&q=London&aqi=no")
//     .then(function(reponse) { // promesse du fetch
//         return reponse.json(); //Traduction réponse  format JSON et retourne promesse en json
//     })
//     .then(function(meteo) { // La promesse json() est résolue
//         const { current } = meteo; // Extraction de la propriété 'current' de l'objet JSON
//         const { location } = meteo; // Extraction de la propriété 'location' de l'objet JSON
//         console.log(current);
//         console.log(location); 
//     });

// Dans le code plus l'affichage marche mais j'ai des erreur en console par rapport à deconstruction d'objet et undefined




// 
let key = "a74b07ca075b4dbf970112759230412";

let cityInput = document.querySelector("input");

cityInput.addEventListener('keydown', async function(event) {
    if (event.key === 'Enter') {
        try {
            // Await the result of GetMeteo before calling display
            const meteoData = await GetMeteo();

            // displayEuropeCities();
            display(meteoData);
        } catch (error) {
            console.log(error.message);
        }
    }
});

async function GetMeteo() {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${cityInput.value}&aqi=no`);
        if (response.ok) {
            // Attend la response.json avant de faire la fx display. Sinon l'objet dans display je peux pas le deconstruir car donne un message d'erreur : il est undefiened 
            const meteoData = await response.json();
            return meteoData;
        } else {
            let meteoInput = document.querySelector("main");
            meteoInput.innerHTML =`Location non trouvée, verifié l'orthographe et que la localisation existe`
            throw new Error("Erreur de fetch");
        }
    } catch (error) {
        console.log(error.message);
        // Re-throw error  in the event listener
        throw error;
    }
}

function display(meteoData) {
    const { location: { name, region, country },
             current: { condition: { text, icon }, temp_c } } = meteoData;

    let meteoInput = document.querySelector(".meteoCherché");

    meteoInput.innerHTML = `
        <div class="card">
            <img src="${icon}">
            <div class="card-content">
                <div class="city-name"> ${name},
                 ${region} <br>
                ${country}</div>
                <div class="meteoCondition"> ${text}</div>
                <p> ${temp_c}°C</p>
            </div>
        </div>
    `;
}




// function filterEuropeCities(meteoDataList) {
//     // Filter meteoData objects based on the condition
//     const europeCities = meteoDataList.filter(city => city.location.tz_id.startsWith("Europe"));

//     // Now 'europeCities' contains only the meteoData objects that satisfy the condition
//     return europeCities;
//     console.log(europeCities)
// }

// // Example usage:
// // Assume 'meteoDataList' is an array of meteoData objects
// // const filteredEuropeCities = filterEuropeCities(meteoDataList);

// // // Now you can work with 'filteredEuropeCities' as needed
// // filteredEuropeCities.forEach(europeCity => {
// //     // Do something with each Europe city
// //     let EuropeDiv = document.querySelector(".Europe")
  
// //         EuropeDiv.innerHTML = `
// //         <div class="card">
// //             <img src="${icon}">
// //             <div class="card-content">
// //                 <div class="city-name"> ${name},
// //                  ${region} <br>
// //                 ${country}</div>
// //                 <div class="meteoCondition"> ${text}</div>
// //                 <p> ${temp_c}°C</p>
// //             </div>
// //         </div>
// //     `
 
// // });





