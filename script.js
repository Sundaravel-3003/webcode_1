//for creating a div tag -
var div = document.createElement("div");
div.setAttribute("id", "content");
div.style.textAlign = "center";
div.style.margin = "150px";
div.style.marginLeft = "200px";
div.style.marginRight = "200px";
div.style.paddingBottom = "200px";
div.style.border = "5px solid red";
div.style.backgroundColor = "seagreen"
document.body.append(div);

// for creating the h1 tag -
var h1 = document.createElement("h1");
h1.style.margin = "10px 0px 20px 0px";
h1.innerHTML = "Nationality Tracker";
h1.style.color = "darkblue";
div.append(h1);

// for creating the search box and -
var input = document.createElement("input");
input.setAttribute("type", "text");
input.setAttribute("id", "name");
input.setAttribute("placeholder", "Enter the Name");
input.setAttribute("title", "Enter the Name Here!!! ")
input.style.marginBottom = "20px";
div.append(input);

// for creating the search button -
var button = document.createElement("button");
button.classList.add("btn", "btn-primary");
button.innerHTML = "Search";
button.addEventListener("click", nam);
div.append(button);

// for displaying the name of the person -
var person = document.createElement("div");
person.setAttribute("id", "nameOfThePerson");
person.style.color = "white";
person.style.fontFamily = "times new roman";
person.style.marginBottom = "10px";
person.style.fontSize = "larger";
div.append(person);

//for displaying the top two countries -
var twoCountries = document.createElement("div");
twoCountries.setAttribute("id", "topTwo");
twoCountries.style.color = "white";
twoCountries.style.fontFamily = "times new roman";
twoCountries.style.marginBottom = "10px";
twoCountries.style.fontSize = "larger";
div.append(twoCountries);

// for displaying the probability ratio - 
var probability = document.createElement("div");
probability.setAttribute("id", "prob");
probability.style.color = "white";
probability.style.fontFamily = "times new roman";
probability.style.marginBottom = "10px";
probability.style.fontSize = "larger";
div.append(probability);

// function for extracting the required data in array of objects format - 
async function nam() {


    var personName = document.getElementById("name").value;
    console.log(personName);

    // using trycatch method to handle any errors - 
    try {
        var res = await fetch(`https://api.nationalize.io/?name=${personName}`)
        var res1 = await res.json();
        console.log(res1);
    } catch (error) {
        console.log("error");
    }


    // for dispalying the required results - 
    person.innerHTML = `Name of the Person Given:<br><b> ${personName}</b>`;
    console.log(res1.country.length);

    // condition is used if the given name is not valid or it has only one possible outcome - 
    if (res1.country.length === 0) {
        twoCountries.innerHTML = `Sorry,the name <b>${personName}</b> is not found in any Countries <br><b>Please Enter a Valid name</b>`;
        probability.innerHTML = "";

    }
    else if (res1.country.length === 1) {
        twoCountries.innerHTML = `This name is Possible in one Country only <br> Country Name : <br><b>${res1.country[0].country_id}</b>`;
        probability.innerHTML = `Probability Value of this Name in this Country : <br><b>${res1.country[0].probability}`;
    }
    else {
        twoCountries.innerHTML = `Top Two Possible Countries : <br><b>${res1.country[0].country_id}<br>${res1.country[1].country_id}`;
        probability.innerHTML = `Probability Values of this Name in these Countries : <br><b>${res1.country[0].probability}<br>${res1.country[1].probability}`;

    }
}
