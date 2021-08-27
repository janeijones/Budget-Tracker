// add global variables
let db;
let budgetVersion;

//initialize IndexedDB
const request = indexedDB.open('budget_db', budgetVersion || 21);

//sync db to upgraded version

request.onupgradeneeded = (e) => {
    db = e.target.result;

    if (db.objectStoreNames.length === 0) { //if object store is empty, create one
        db.createObjectStore('budgetStore', { autoIncrement: true })
    }
};




//check Database then do transactions 






//save record


//add event listener 