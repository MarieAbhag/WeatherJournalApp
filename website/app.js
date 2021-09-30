
/*=====================================================*/ 
/*======    Global variables, objects and events   ====*/ 
/*=====================================================*/ 


// data to server object
var userSentObj = {
    date:'',
    time:'',
    zip: '',
    country: '',
    feeling: ''
 }

// Submit button event registration 
document.getElementById('generate').addEventListener('click', SubmitData);


/*=====================================================*/ 
/*======    APIs and helper functions  ================*/ 
/*=====================================================*/ 

// return a string of the current time (hh:mm:ss) 
function GetCurrentTime(){
    var d = new Date();
    return d.getHours()+':'+ d.getMinutes() +':'+ d.getSeconds();
}

// return a string of the current date (dd.mm.yyyy) 
function GetCurrentDate(){
    var d = new Date();
    return  d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
}

// check the user enteries 
function CheckEntries(zip, feeling){
    if ( (!/\d/.test(zip))  || (zip.length < 4)) {
        return 1;
    }

    if ( (/\d/.test(feeling))  || (feeling.length < 1)) {
        return 2;
    }

}

// Get user data, check it and then send it to the server
function SubmitData(){
    var zipCode = document.getElementById('zip').value;
    var userCountry = document.getElementById('country').value;
    var userFeelings = document.getElementById('feelings').value;
    switch (CheckEntries(zipCode, userFeelings)) {
        case 1:
            window.alert("The zip code is not valid. It should has at least a number and 3 letters.");
            return;
        case 2:
            window.alert("please write a valid feeling.");
            return;
        default:
            break;
    }
    userSentObj.zip = zipCode;
    userSentObj.feeling = userFeelings;
    userSentObj.country = userCountry;
    userSentObj.date = GetCurrentDate();
    userSentObj.time = GetCurrentTime();
    postData('/addnew', userSentObj);
}


function UpdateUI(){
    getData('/all');
}

// add the data from the server to the entery table UI component 
function AddDataRowToTable(entryObj){
    var table = document.getElementById('entriesTable');
    var newRow = document.createElement('tr');
    var col1 = document.createElement('th');
    col1.innerHTML = entryObj.date;
    var col2 = document.createElement('th');
    col2.innerHTML = entryObj.time;
    var col3 = document.createElement('th');
    col3.innerHTML = entryObj.country;
    var col4 = document.createElement('th');
    col4.innerHTML = entryObj.zip;
    var col5 = document.createElement('th');
    col5.innerHTML = entryObj.feeling;
    var col6 = document.createElement('th');
    col6.innerHTML = entryObj.temp;
    newRow.appendChild(col1);
    newRow.appendChild(col2);
    newRow.appendChild(col3);
    newRow.appendChild(col4);
    newRow.appendChild(col5);
    newRow.appendChild(col6);
    table.appendChild(newRow);
}

/*=====================================================*/ 
/*======    Server-wise functions      ================*/ 
/*=====================================================*/ 

// sending data to the server (POST request)
const postData = async(url = '', data = {}) => {
    const response = await fetch(url, {
        method:'POST',
        credentials:'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const status = await response.statusText;
        if (status === "OK") {
            window.alert("Your data has been added.");
            UpdateUI();
        } else {
            window.alert("Something went wrong. Please try again later..");
        }
    } catch (error) {
        console.log(error);
    }
};

// getting data from the server (GET request)
const getData = async(url = '') => {
    const response = await fetch(url);
    try {
        const status = await response.json();
        AddDataRowToTable(status[0]);
    } catch (error) {
        console.log(error);
    }
};
