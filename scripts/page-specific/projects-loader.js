//
const DB_VERSION = 1;
const DB_NAME = "projects_db";

const pDataURL = "./data/projects.json";// from the root apparently

// returns a Promise - json object
const getProjectsData = (url, responseType) => {
  return fetch(url).then(response => {
    if(!response.ok){
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    else {
      if (responseType === "json"){
        return response.json();
      }
    }
  })
  .catch(err => {
    console.log(`There has been a problem with your fetch operation for resource "${url}": ${err.message}`);
  })
}; // end function

// returns a Promise - a database opened on an objectStore
const openDB = () => {
  return new Promise((resolve, reject) => {

    if (!window.indexedDB) {
      console.log("Database failed to open");
      reject("IndexedDB not supported.");
    }

    const db_open_req = window.indexedDB.open(DB_NAME, DB_VERSION);

    db_open_req.onerror = (event) => {
      reject(`DB open error: ${db_open_req.result}`);
    };

    db_open_req.onupgradeneeded = (event) => {
      const db = db_open_req.result;
      let objectStore;

      if (!db.objectStoreNames.contains("projects_os")){
        console.log(`AND NEW.... DB OBJECT STORE FOUND OK`);
        objectStore = db.createObjectStore("projects_os", {keypath:"id", autoIncrement:true});
        objectStore.createIndex("name", "name", {unique : false});
        objectStore.createIndex("developers", "developers", {unique : false});
        objectStore.createIndex("shortDescription", "shortDescription", {unique : false});
        objectStore.createIndex("remoteRepoURL", "remoteRepoURL", {unique : false});
        objectStore.createIndex("remoteSourceURL", "remoteSourceURL", {unique : false});
        objectStore.createIndex("remoteImageURL", "remoteImageURL", {unique : false});
        objectStore.createIndex("localImageURL", "localImageURL", {unique : false});
        objectStore.createIndex("platforms", "platforms", {unique : false});
        objectStore.createIndex("programmingLanguages", "programmingLanguages", {unique : false});
        objectStore.createIndex("contexts", "contexts", {unique : false});
        objectStore.createIndex("currentStatus", "currentStatus", {unique : false});
        objectStore.createIndex("visibility", "visibility", {unique : false});
      }
      else {
        console.log(`AND STILL.... EXISTING OBJECTSTORE FOUND`);
      }
      console.log("Database setup complete");
    };

    db_open_req.onsuccess = (event) => {
      console.log("Database opened successfully");
      resolve (db_open_req.result);      
    }
  })
}; // end openDB function

//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------

// make a tx scope objectStore to be pass around to specific operations as required during the life of the transaction
const openTxScopeObjStore = (db, storeList, transactionMode) => {
  let transax = db.transaction(storeList, transactionMode);
  let objectStore = transax.objectStore(storeList);

  return objectStore;  
};

//------------------------------------------------------------------------------------

// called only after successful clearing of exisiting objectStore
const repopulateDB = (jsonObj, objectStore) => {

  //console.log(`objectStore index namsa : ${objectStore.indexNames[0]}`);

  for (let i = 0; i < jsonObj.length; i++){
    let os_add_req = objectStore.add(jsonObj[i]);
    
    os_add_req.onsuccess = (event) => {
      console.log(`Record addition ${i} finished`);
    };
    os_add_req.onerror = (event) => {
      console.log(`Record addition ${i} failed: ${os_add_req.error}`);
    };  
  }// end for loop  

};// end repopulateDB function

//------------------------------------------------------------------------------------

// called ONLY if json data AND open db acquired
const harmoniseProjectsData = (dataStorageObjects) => {

  let jsonObj = dataStorageObjects[0];
  let dbObj = dataStorageObjects[1];
  // use same transaction for multiple operations
  let objectStore = openTxScopeObjStore(dbObj, ["projects_os"], "readwrite");

  // Since we're got an up-to-date json, delete all existing database records
  // unfortunately, from here all these async requests will have to be nested, so the happen in correct order
  // later, we'll use promises 
  // use the clear() function. call a function for this
  let os_clear_req = objectStore.clear();

  os_clear_req.onsuccess = (event) => {
    console.log(`all data cleared from objectStore`);
    // call function to repopulate db objectStore with json data
    repopulateDB(jsonObj, objectStore);
  };

  objectStore.transaction.oncomplete = (event) => {
    console.log(`transactions all done!`);
    dbObj.close();
  };
  objectStore.transaction.onerror = (event) => {
    console.log(`transaction was NOT done!`);
  };
  
}; // end harmoniseProjectsData function

//------------------- main --------------------------------

const projectsJSONData = getProjectsData(pDataURL, "json");
const openedProjectsDB = openDB();

Promise.all([projectsJSONData, openedProjectsDB])
.then((objects) => {
  harmoniseProjectsData(objects);
})
.catch(err => {
  console.log(`Caught it! Or did it bubble up? Investigate. Error message: ${err.message}`);
});


//------------------------------------------------------------------------------------