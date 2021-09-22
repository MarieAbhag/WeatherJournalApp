/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click', DoSomething);


function DoSomething(){
    console.log("HERE");
    postData('/all', "Here" );
}



const postData = async(url = '', data) => {
    const response = await fetch(url);

    try {
        const newData = await response.json();
        console.log(newData.date);
    } catch (error) {
        console.log(error);
    }
};


postData('/all', "Here" );