// add global variables
let db;
let budgetVersion;

//initialize IndexedDB
const request = indexedDB.open('budget_db', budgetVersion || 21); //sync db to upgraded version



request.onupgradeneeded = (e) => {
    db = e.target.result;

    if (db.objectStoreNames.length === 0) { //if object store is empty, create one
        db.createObjectStore('budgetStore', { autoIncrement: true })
    }
};

request.onerror = (e) => {
    console.log("Error handling: ")
    console.log(e.target.errorCode)
}


//check Database then do transactions 
function checkDB(){
    console.log('Check sucessful...')

    let transaction = db.transaction(['budgetStore'], 'readwrite')
    
    const store = transaction.objectStore('budgetStore');

    const getStore = store.getAll();
}






//save record


//add event listener 