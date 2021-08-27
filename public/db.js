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
};


//check Database then do transactions 
function checkDB() {
    console.log('Check sucessful...')

    let transaction = db.transaction(['budgetStore'], 'readwrite') //initialize transaction

    const store = transaction.objectStore('budgetStore');

    const getStore = store.getAll(); //getAll method for retrieving all transactions 
    //console.log('Checking get store ' + getStore);

    getStore.onsucess = function () {
        if (getStore.result.length > 0) {
            fetch('/api/transaction/bulk', {
                method: "POST",
                body: JSON.stringify(getAll.result),
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.length !== 0) {

                        transaction = db.transaction(['budgetStore'], 'readwrite')

                        const currentStore = transaction.objectStore('budgetStore');

                        currentStore.clear(); //clear store
                        console.log("Clearing Store")
                    }
                });
        }
    }
}

request.onsuccess = (e) => {
    console.log('Successfully added..'); 
    db = e.target.result;
    
    if (navigator.onLine){
        console.log('DB is online');
        checkDB(); 
    } else {
        console.log("Error: " + errorCode)
    }
}

//save record

const saveRecord = (record) => {

    const transaction = db.transaction(['budgetStore'], 'readwrite')

    const store = transaction.objectStore('budgetStore');

    store.add(record);
    console.log('Record of transaction saved')
};

//add event listener 
window.addEventListener('online', checkDB);