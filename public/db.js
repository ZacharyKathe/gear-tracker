
// let db;
// let GearVersion;

// // allowing for different browsers
// const indexedDB = 
//   window.indexedDB ||
//   window.mozIndexedDB ||
//   window.webkitIndexedDB ||
//   window.msIndexedDB ||
//   window.shimIndexDB;

// //creating a new db request for "gearwise"
// const request = indexedDB.open("gearWise", GearVersion || 3);

// request.onupgradeneeded = function (e) {
//    console.log("upgrade needed in indexDB")

//    const { oldVersion } = e;
//    const newVersion = e.newVersion || db.version;

//    console.log(`DB Updated from version ${oldVersion} to ${newVersion}`);

//   db = e.target.result;

//   if (db.objectStoreNames.length === 0) {
//     db.createObjectStore('GearwiseTrips', { autoIncrement: true });
//   }
// };

// request.onerror = function (e) {
//     console.log(`wrong lol ${e.target.errorCode}`)
// };

// function checkDatabase() {
//     console.log("checking db now")

//     //open a trip on GearWiseTrips
//     let trip = db.trip(['GearwiseTrips'], 'readwrite');
//     //access gearwisestore object
//     const store = trip.objectStore('GearwiseTrips');
//     //get all records from store and set
//     const getAll = store.getAll();

//     getAll.onsuccess = function () {
//         if (getAll.result.length > 0) {
//             fetch("/api/trips/bulk", {
//                 method: "POST",
//                 body: JSON.stringify(getAll.result),
//                 headers: {
//                   Accept: "application/json, text/plain, */*",
//                   "Content-Type": "application/json"
//                 },
//             })
//             .then((response) => response.json())
//             .then((res) => {
//                 if (res.length !== 0){
//                    trip = db.trip(['GearwiseTrips'], 'readwrite');
//                    //assign currentstore to new var
//                    const currentStore = trip.objectStore("GearwiseTrips")
//                    //clear existing entries because bulk worked 
//                    currentStore.clear();
//                    console.log('Clearing store 🧹');
//                 }
//             })  
//         }
//     }
// }


// request.onsuccess = function (e) {
//     console.log('success');
//     db = e.target.result;
  
//     // Check if app is online before reading from db
//     if (navigator.onLine) {
//       console.log('Backend online! 🗄️');
//       checkDatabase();
//     }
//   };

// const saveRecord = (record) => {
//     console.log('Save record invoked');
//     // Create a transaction on gearwise
//     const trip = db.trip(['GearwiseTrips'], 'readwrite');
    
//     // Access gearwise object store
//     const store = trip.objectStore('GearwiseTrips');
  
//     // Add record to store .
//     store.add(record);
//   };
  
//   // Listen for app coming back online
//   window.addEventListener('online', checkDatabase);
  