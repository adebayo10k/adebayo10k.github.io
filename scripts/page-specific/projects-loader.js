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

//------------------------------------------------------------------------------------

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
        objectStore.createIndex("title", "title", {unique : false});
        objectStore.createIndex("devUsername", "devUsername", {unique : false});
        objectStore.createIndex("shortDescription", "shortDescription", {unique : false});
        objectStore.createIndex("gitHubRepoURL", "gitHubRepoURL", {unique : false});
        objectStore.createIndex("devGitHubURL", "devGitHubURL", {unique : false});
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

// make a transaction scope objectStore to be pass around to specific operations as required during the life of the transaction
const openTxScopeObjStore = (db, storeList, transactionMode) => {
  //let transax = db.transaction(storeList, transactionMode);
  let objectStore = db.transaction(storeList[0], transactionMode).objectStore(storeList);

  return objectStore;  
};

//------------------------------------------------------------------------------------


// called only after successful clearing of exisiting objectStore
const repopulateDB = function (jsonObj, objectStore) {

  // 

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
const harmoniseProjectsData = function (jsonObj, objectStore) {

  // Since we've got an up-to-date json, delete all existing database records
  // use the clear() function. call a function for this?
  let os_clear_req = objectStore.clear();

  os_clear_req.onsuccess = (event) => {
    console.log(`all data cleared from objectStore`);
    // call function to repopulate db objectStore with json data
    repopulateDB(jsonObj, objectStore);
  };
}; // end function


//------------------------------------------------------------------------------------

const allNameFieldsMatch = (jsonObj, dbRecordArray) => {
  // return true if match
  // same lengths, so iterate over either one
  let allMatch;
  for (let i = 0; i < jsonObj.length; i++){
    if (jsonObj[i].title === dbRecordArray[i].title)
    {
      console.log(`record ${i} title fields MATCHED`);
      allMatch = true;
    }
    else{
      console.log(`record ${i} title fields NOT MATCHED!`);
      allMatch = false;
      break;

    }
  }
  return allMatch;


};
//------------------------------------------------------------------------------------
// cursory checks for now. TODO: later make more rigorous, at least testing more fields
const checkDataSourcesMatch = (jsonObj, dbRecordArray) => {
  // assume one source has at least one record
  // return true if match
  console.log(`jsonObj.length = ${jsonObj.length}`);
  console.log(`dbRecordArray.length = ${dbRecordArray.length}`);

  if (jsonObj.length !== dbRecordArray.length){
    // confirmed source mismatch
    //let biggestSourceLen = Math.max(jsonObj.length, dbRecordArray.length);
    //let biggestSource = biggestSourceLen === jsonObj.length ? "largerJSON" : "largerDB";
    //console.log(`biggestSourceLen = ${biggestSourceLen}`);
    //console.log(`biggestSource = ${biggestSource}`);
    return false;
  }
  else{
    // same size, so check for content match
    if (allNameFieldsMatch(jsonObj, dbRecordArray)){
      return true;
    }
    else{
      return false;
    }    
  }
     
};

//------------------------------------------------------------------------------------

// want to call this either after db has updated (so with db derived array), or in other senarios such as with existing db or with existing or fetched json.
const renderProjectCards = (projectsArray) => {

  // 
  const pageContent = document.querySelector(".page-content");
  
  for (let index = 0; index < projectsArray.length; index++){
    
    const projectCard = document.createElement("section");
    projectCard.setAttribute("class", "project-card");

    const cardImage = document.createElement("div");
    cardImage.setAttribute("class", "card-image");
    const imgElem = document.createElement("img");
    imgElem.setAttribute("src", `${projectsArray[index].remoteImageURL}`);
    imgElem.setAttribute("alt", `${projectsArray[index].cardImageAlt}`);
    imgElem.setAttribute("width", `${projectsArray[index].cardImageIntrWidth}`);
    cardImage.appendChild(imgElem);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");
    cardBody.innerHTML = `
    <h3>${projectsArray[index].title}</h3>
    <p>${projectsArray[index].shortDescription}</p>
    `;

    const cardTopFooter = document.createElement("div");
    cardTopFooter.setAttribute("class", "card-topfooter");

    // create strings from array data (platforms, programming languages)
    let platformsStr = projectsArray[index].platforms.join(" | ");
    let programmingLanguagesStr = projectsArray[index].programmingLanguages.join(" | ");

    cardTopFooter.innerHTML = `
    <p>Developed by:
    <a href="${projectsArray[index].devGitHubURL}" title=" " target="_blank">${projectsArray[index].devUsername}</a>
    </p>
    <p>
    ${platformsStr} ${programmingLanguagesStr}
    </p>

    `;

    // create string from array data (contexts)
    let contextsStr = projectsArray[index].contexts.join(" | ");

    const cardBottomFooter = document.createElement("div");
    cardBottomFooter.setAttribute("class", "card-bottomfooter");
    cardBottomFooter.innerHTML = `
    <p>
    ${contextsStr}
    </p>
    <p>Status:
    ${projectsArray[index].currentStatus}
    </p>
    `;

    projectCard.appendChild(cardImage);
    projectCard.appendChild(cardBody);
    projectCard.appendChild(cardTopFooter);
    projectCard.appendChild(cardBottomFooter);

    pageContent.appendChild(projectCard);
  }
  
  


};

//------------------------------------------------------------------------------------

const openRenderTransaction = (dataStorageObject) => {

  let objectStore = openTxScopeObjStore(dataStorageObject, ["projects_os"], "readonly");

  //  getAll() into another array is best approach
  let os_getAll_req = objectStore.getAll();

  os_getAll_req.onsuccess = (event) => {
    //console.log(os_getAll_req.result);
    renderProjectCards(os_getAll_req.result);
  };

  os_getAll_req.onerror = (event) => {
    console.log(os_getAll_req.error);
  };

  objectStore.transaction.oncomplete = (event) => {
    console.log(`transaction 2 all done!`);
    
  };
  objectStore.transaction.onerror = (event) => {
    console.log(`transaction 2 was NOT done!`);
  };

};

//------------------------------------------------------------------------------------

const queryDatabaseIntoArray = (jsonObj, dbObj) => {

  let objectStore = openTxScopeObjStore(dbObj, ["projects_os"], "readwrite");

  let os_get_req = objectStore.getAll();

  os_get_req.onsuccess = (event) => {
    console.log(os_get_req.result);

    // call function to check whether db and json records match (&& db contains stored image blobs?)
    if (checkDataSourcesMatch(jsonObj, os_get_req.result)){
      // source of truth is 
      console.log(`about to render immediately (in next transaction)`); 
    }
    else {
      // harmoniseProjectsData (which includes a render phase)
      console.log(`about to harmonise data sources, then render (in next transaction)`);
      harmoniseProjectsData(jsonObj, objectStore);
    }
  };

  os_get_req.onerror = (event) => {
    console.log(os_get_req.error);
  };

  objectStore.transaction.oncomplete = (event) => {
    console.log(`transaction 1 all done!`);
    // open another ro transaction to render from database
    openDB()
    .then((odb) => {
      openRenderTransaction(odb);
    })
    .catch(err => {
      console.log(`transaction 2, from opening the databse..... Investigate. Error message: ${err.message}`);
    })


  };
  objectStore.transaction.onerror = (event) => {
    console.log(`transaction 1 was NOT done!`);
  };

};

//------------------- main --------------------------------

window.onload = () => {

  // TODO: if can't get new json, use locally stored copy...
  const projectsJSONData = getProjectsData(pDataURL, "json");
  const openedProjectsDB = openDB();

  //1. try to get records from database
  Promise.all([projectsJSONData, openedProjectsDB])
  .then((objects) => {
    let jsd = objects[0];
    let odb = objects[1];
    //console.log(jsd);
    //console.log(odb);
    queryDatabaseIntoArray(jsd, odb);   
  })
  .catch(err => {
    console.log(`Caught it! Or did it bubble up? Investigate. Error message: ${err.message}`);
  })
  
}



//------------------------------------------------------------------------------------