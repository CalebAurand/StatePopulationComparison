
/**have to have 2 fetch calls
 * have to have user interaction
 * have to have enough comments or write up for the code
 */


/**
 * fetch data from the datausa.io API for the US
 * then - convert that data to json
 * then - output that data as json to the console
 * print nation name to console
 * print 2019 population data to console
 */
//create a function
const getUSData = () =>{
    fetch("https://datausa.io/api/data?drilldowns=Nation&measures=Population&year=latest")
        .then(function(resp){
        //do this when the results come back
        console.log("Processing fetch results");
 
        //now have to extract the data from the json
        return resp.json();
    })
//  .then(result => console.log(result))
    .then(function(json){
        //do something with the json payload
        console.log("The json payload is ", json);
        console.log("nation", json.data[0].Nation);
        console.log("2019", json.data[0].Population);
        //put the nation name in the us-name h3
        document.getElementById("us-name").innerText=json.data[0].Nation;
        //put the population in the us-pop h3
        document.getElementById("us-population").innerText = `Year ${json.data[0].Year} Population ${json.data[0].Population}`;
    })
};

/**
 * create a div that will hold the dallas info
 * assign name header the value of the dallas city name
 * assign 
 */
const getTXData = () =>{
    fetch("https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest")
    .then(function(resp){
        //do this when the results come back
        console.log("Processing fetch results");
 
        //now have to extract the data from the json
        return resp.json();
    })
//  .then(result => console.log(result))
    .then(function(json){
        //do something with the json payload
        console.log("The json payload is ", json);
        console.log("nation", json.data[43].Nation);
        console.log("state", json.data[43].State);
        console.log("2019", json.data[43].Population);

        //create a variable to easily reach tx-name h2 el
        let txName = document.getElementById("tx-name");
     //set h2 el innertext to the TX State name
        txName.innerText = json.data[43].State;

     //set h3 el tx-population to the 2019 state population number
        document.getElementById("tx-population").innerText = `Year ${json.data[43].Year} Population ${json.data[43].Population}`;
    })
}

//creating a function that will capture the data sent from
//the form, to mySubmit(event) function
const mySubmit = (event) =>{
    event.preventDefault();
    //assign the dropdown element to the variable dropdown
    let dropdown = document.getElementById("dropdown");
    //print its value to the console to see if we can access its data
    console.log(dropdown.value);
    //set a variable to point to the h2 that will hold state name
    let state = document.getElementById("state-name");

    
    state.innerText = dropdown.value;

    //call getStateData function that will give that states population data for 2019
    getStateData(dropdown.value);
    
};

//create a function that will
const getStateData = (state) =>{
    //capture the user choice from dropdown of the states
    // dropdown with id = dropdown name = states
    //fetch the states data from datausa.io/api
    fetch("https://datausa.io/api/data?drilldowns=State&measures=Population&year=latest")
    .then(function(resp){
        //do this when the results come back
        console.log("Processing fetch results for states");
 
        //now have to extract the data from the json
        return resp.json();
    })
//  .then(result => console.log(result))
    .then(function(json){
        //do something with the json payload
        console.log("The json payload is ", json);
        //create a variable to hold the json data array of states and their info
        let stateArray = json.data;
        /**create a variable to hold index of the found state, 
         * use callback function to find it
        */

        let stateIndex = stateArray.findIndex((object) => {
            //if the State key value pair matches the state* parameter in the 
            //getStateData function then return true with found index
            if(object.State === state){
                return true;
            };
            //otherwise will return -1
        });

        //use the associated index number to access that state's 
        //population data in the json object and store in variable
        let population = stateArray[stateIndex].Population;

        let populationElement = document.getElementById("state-population");
        //set the h2 state-name to be assigned the value of the dropdown selection

        //post the population data to the h3 element on the webpage
        populationElement.innerText = `Year ${stateArray[stateIndex].Year} Population ${population}`;

    });
    
    
};



/**
 * create another h2 element to hold the compare state's name
 * create another h3 element to hold the compare state's population
 * fetch the data for the comparison state
 * plug the state's data into the above h2 and h3 el's
 *      using innerText
 * 
 */