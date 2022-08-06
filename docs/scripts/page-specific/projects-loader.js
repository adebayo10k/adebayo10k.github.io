// This script creates and populates the database using fetched json, then ultimately renders database records as project cards on the projects page.
const DB_VERSION = 1;
const DB_NAME = "projects_db";

const pDataURL = "./data/projects.json"; // from the document root apparently
const urlFromReferer = window.location.toString();

// returns a Promise - json object
const getProjectsData = (url, responseType) => {
    return fetch(url).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        else {
            if (responseType === "json") {
                return response.json();
            }
        }
    })
        .catch(err => {
            console.error(`There has been a problem with your fetch operation for resource "${url}": ${err.message}`);
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

            if (!db.objectStoreNames.contains("projects_os")) {
                console.log(`AND NEW.... DB OBJECT STORE FOUND OK`);
                objectStore = db.createObjectStore("projects_os", { keypath: "id", autoIncrement: true });
                objectStore.createIndex("title", "title", { unique: false });
                objectStore.createIndex("devUsername", "devUsername", { unique: false });
                objectStore.createIndex("shortDescription", "shortDescription", { unique: false });
                objectStore.createIndex("gitHubRepoURL", "gitHubRepoURL", { unique: false });
                objectStore.createIndex("devGitHubURL", "devGitHubURL", { unique: false });
                objectStore.createIndex("remoteImageURL", "remoteImageURL", { unique: false });
                objectStore.createIndex("localImageURL", "localImageURL", { unique: false });
                objectStore.createIndex("platforms", "platforms", { unique: false });
                objectStore.createIndex("programmingLanguages", "programmingLanguages", { unique: false });
                objectStore.createIndex("contexts", "contexts", { unique: false });
                objectStore.createIndex("currentStatus", "currentStatus", { unique: false });
                objectStore.createIndex("visibility", "visibility", { unique: false });
            }
            else {
                console.log(`AND STILL.... EXISTING OBJECTSTORE FOUND`);
            }
            console.log("Database setup complete");
        };

        db_open_req.onsuccess = (event) => {
            console.log("Database opened successfully");
            resolve(db_open_req.result);
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




//------------------------------------------------------------------------------------

// called ONLY if json data AND open db acquired
const harmoniseProjectsData = function (jsonObj, objectStore) {

    // called only after successful clearing of exisiting objectStore
    const repopulateDB = function () {
        // 
        for (let i = 0; i < jsonObj.length; i++) {
            let os_add_req = objectStore.add(jsonObj[i]);

            os_add_req.onsuccess = (event) => {
                console.log(`Record addition ${i} finished`);
            };
            os_add_req.onerror = (event) => {
                console.error(`Record addition ${i} failed: ${os_add_req.error}`);
            };
        }// end for loop
    };// end repopulateDB function

    // Since we've got an up-to-date json, delete all existing database records
    // use the clear() function. call a function for this?
    let os_clear_req = objectStore.clear();

    os_clear_req.onsuccess = (event) => {
        console.log(`all data cleared from objectStore`);
        // call function to repopulate db objectStore with json data
        repopulateDB();
    };
}; // end function


//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
// tests all string values match
const checkDataSourcesMatch = (jsonObj, dbRecordArray) => {
    // assume one source has at least one record
    // return true if match
    console.log(`jsonObj.length = ${jsonObj.length}`);
    console.log(`dbRecordArray.length = ${dbRecordArray.length}`);

    // TODO: test EVERY field for change/difference
    const allNameFieldsMatch = () => {
        // return true if match
        // same lengths, so iterate over either one
        let allMatch;
        outerLoop: for (let i = 0; i < jsonObj.length; i++) {
            for (let key in jsonObj[i]) {
                // only comparing string values for now
                if (typeof jsonObj[i][key] === "string") {
                    if (jsonObj[i][key] === dbRecordArray[i][key]) {
                        console.log(`record ${i} field "${key}" MATCHED`);
                        allMatch = true;
                    }
                    else {
                        console.log(`record ${i}  field "${key}" NOT MATCHED!`);
                        allMatch = false;
                        break outerLoop;
                    }
                }
            } // end inner for-loop      
        } // end outer for-loop  
        return allMatch;
    };

    if (jsonObj.length !== dbRecordArray.length) {
        // confirmed source mismatch
        //let biggestSourceLen = Math.max(jsonObj.length, dbRecordArray.length);
        //let biggestSource = biggestSourceLen === jsonObj.length ? "largerJSON" : "largerDB";
        //console.log(`biggestSourceLen = ${biggestSourceLen}`);
        //console.log(`biggestSource = ${biggestSource}`);
        return false;
    }
    else {
        // same size, so now check for content match
        if (allNameFieldsMatch()) {
            return true;
        }
        else {
            return false;
        }
    }
};

//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------

//------------------------------------------------------------------------------------
// at this point a single, consistent source of truth has already been established
const openRenderTransaction = (dataStorageObject, requestedURL) => {
    //console.log(`requested url in openRenderTransaction: ${requestedURL}`);
    let objectStore = openTxScopeObjStore(dataStorageObject, ["projects_os"], "readonly");

    // call this function with an established single source of truth.
    // So, either after db has updated (so with db derived array), or in other senarios too, such as with existing db or with existing or fetched json.
    const renderProjectCards = () => {
        // 
        const projectsArray = os_getAll_req.result; //create a private copy
        const pageContent = document.querySelector(".page-content");

        for (let index = 0; index < projectsArray.length; index++) {

            const projectCard = document.createElement("article");
            projectCard.setAttribute("class", "project-card");
            projectCard.setAttribute("id", `${index}`);

            const cardImage = document.createElement("div");
            cardImage.setAttribute("class", "card-image");
            const imgElem = document.createElement("img");
            // object-fit only works on fixed container size, which isn't the case here
            imgElem.setAttribute("src", `${projectsArray[index].remoteImageURL}`);
            imgElem.setAttribute("alt", `${projectsArray[index].cardImageAlt}`);
            imgElem.setAttribute("width", `${projectsArray[index].cardImageIntrWidth}`);
            cardImage.appendChild(imgElem);

            const cardBody = document.createElement("div");
            cardBody.setAttribute("class", "card-body");
            cardBody.innerHTML = `
      <h3><a href="${projectsArray[index].sitePageURL}" title="go to a brief TL;DR summary of this project" target="_self">${projectsArray[index].title}</a></h3>
      <p>${projectsArray[index].shortDescription}</p>
      `;

            const cardTopFooter = document.createElement("div");
            cardTopFooter.setAttribute("class", "card-topfooter");

            // create strings from array data (platforms, programming languages)
            let platformsStr = projectsArray[index].platforms.join(" | ");
            let programmingLanguagesStr = projectsArray[index].programmingLanguages.join(" | ");

            cardTopFooter.innerHTML = `
      <p>Developed by:
      <a href="${projectsArray[index].devGitHubURL}" title="go to this developers GitHub account (opens in a separate browser tab)" target="_blank">${projectsArray[index].devUsername}</a>
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
    };// end renderProjectCards inner function

    // 
    const scrollWhenArticleRequested = () => {
        // if it exists, get the part (substring) of url that represents a project id

        const requestedUrlStr = requestedURL; // make a private copy

        const doThatScroll = (projectID) => {
            //use the newly discovered scrollIntoView method to get identified article into view by scrolling its' parent
            console.log(`callback function received projectID: ${projectID}`);
            // TODO: check that projectID can be cast to an integer
            // NOTE: smooth behaviour is part of experimental API. is it even cool?      
            const projectIdNum = projectID; // create a private copy
            document.getElementById(`${projectIdNum}`).scrollIntoView({ behavior: "smooth" });
            //document.getElementById(`${projectIdNum}`).scrollIntoView();
        };// end doThatScroll inner-inner function

        // TODO: should really check that this is one and only "#" in the url
        if (requestedUrlStr.includes("#")) {
            let projectID = requestedUrlStr.split("#")[1];
            console.log(projectID);
            doThatScroll(projectID);
        }
    };// end scrollWhenArticleRequested inner function

    //  getAll() into another array is best approach
    let os_getAll_req = objectStore.getAll();

    os_getAll_req.onsuccess = (event) => {
        //console.log(os_getAll_req.result);
        renderProjectCards();
    };

    os_getAll_req.onerror = (event) => {
        console.error(os_getAll_req.error);
    };

    objectStore.transaction.oncomplete = (event) => {
        console.log(`transaction 2 all done!`);
        // if specific project id in the requestedURL, go to that article
        scrollWhenArticleRequested();
    };
    objectStore.transaction.onerror = (event) => {
        console.log(`transaction 2 was NOT done!`);
    };

};

//------------------------------------------------------------------------------------

const associatePageWithProject = (dbObj) => {

    const pageIntroTitle = document.querySelector(".page-intro-para header h1");
    console.log(`page intro title: ${pageIntroTitle.textContent}`);

    const padaAnchor = document.querySelector(".page-intro-para a");
    let hrefValue = padaAnchor.getAttribute("href");
    console.log(hrefValue);

    let minKey = 72000;// arbitrary number higher than any expected key value
    let projectID, currentKey;
    let objectStore = openTxScopeObjStore(dbObj, ["projects_os"], "readonly");

    let os_cursor_req = objectStore.openCursor();

    os_cursor_req.onsuccess = (event) => {
        //console.log(os_cursor_req.result);
        let cursor = os_cursor_req.result;

        if (cursor) {
            //
            console.log(`record id: ${cursor.key}`);
            console.log(`record title: ${cursor.value.title}`);
            currentKey = cursor.key;
            minKey = Math.min(currentKey, minKey);

            // found record to associate with this page, so get it's key
            // based on first record key being reset to zero
            if (cursor.value.title == pageIntroTitle.textContent) {
                console.log("WE GOT A HIT");
                projectID = cursor.key - minKey;
                hrefValue += `#${projectID}`;
                console.log(hrefValue);
                padaAnchor.setAttribute("href", hrefValue);
            }

            cursor.continue();
        }
        else {
            console.log("didn't break out, so ..");
            console.log(`finally, minKey: ${minKey}`);
            console.log(`finally, projectID: ${projectID}`);
        }

    };
    os_cursor_req.onerror = (event) => {
        console.error(os_cursor_req.error);
    };

    objectStore.transaction.oncomplete = (event) => {
        console.log(`transaction 1 all done!`);
    };
    objectStore.transaction.onerror = (event) => {
        console.error(`transaction 1 was NOT done!`);
    };


};

//------------------------------------------------------------------------------------

const queryDatabaseIntoArray = (jsonObj, dbObj, requestedURL) => {
    //console.log(`requested url in queryDatabaseIntoArray: ${requestedURL}`);
    let objectStore = openTxScopeObjStore(dbObj, ["projects_os"], "readwrite");

    let os_get_req = objectStore.getAll();

    os_get_req.onsuccess = (event) => {
        console.log(os_get_req.result);

        // call function to check whether db and json records match (&& db contains stored image blobs?)
        if (checkDataSourcesMatch(jsonObj, os_get_req.result)) {
            // source of truth is 
            console.log(`about to render immediately (in next transaction)`);
        }
        else {// TODO: could this be a sync callback, encapsulating the checks?
            // harmoniseProjectsData (which includes a render phase)
            console.log(`about to harmonise data sources, then render (in next transaction)`);
            harmoniseProjectsData(jsonObj, objectStore);
        }
    };

    os_get_req.onerror = (event) => {
        console.error(os_get_req.error);
    };

    objectStore.transaction.oncomplete = (event) => {
        console.log(`transaction 1 all done!`);
        // open another ro transaction to render from database
        openDB()
            .then((odb) => {
                //console.log(`requested url in oncomplete openDB.then: ${requestedURL}`);
                openRenderTransaction(odb, requestedURL);
            })
            .catch(err => {
                console.error(`transaction 2, from opening the databse..... Investigate. Error message: ${err.message}`);
            })


    };
    objectStore.transaction.onerror = (event) => {
        console.log(`transaction 1 was NOT done!`);
    };

};

//------------------- main --------------------------------

window.onload = () => {

    const thisURL = urlFromReferer;
    console.log(`thisURL: ${thisURL}`);
    //const indexPagePath = "adebayo10k.github.io/index.html";

    // we're running on the index page (where dynamically generated project cards are displayed)
    // for example: http://localhost:8072/index.html    
    if (thisURL.includes("adebayo10k.github.io/index.html") || thisURL.endsWith("adebayo10k.github.io/") // production environment (GitHub Pages)        
        || thisURL.includes("127.0.0.1:5500/index.html") || thisURL.endsWith("127.0.0.1:5500") || thisURL.endsWith("127.0.0.1:5500/") // development environment (VSCode running Live Server)        
        || thisURL.includes("adebayo10k.com/index.html") || thisURL.endsWith("adebayo10k.com") || thisURL.endsWith("adebayo10k.com/") // development environment (local web server)         
        || thisURL.includes("localhost:8072/index.html") || thisURL.endsWith("localhost:8072") || thisURL.endsWith("localhost:8072/") // localhost (docker containerised webserver)
    ) {

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
                queryDatabaseIntoArray(jsd, odb, thisURL);
            })
            .catch(err => {
                console.error(`Caught it! Or did it bubble up 0? Investigate. Error message: ${err.message}`);
            })
    }
    // we're running in one of the project specific pages
    // for example: http://localhost:8072/projects/yoruba-vocab-test.html        
    else if (thisURL.includes("adebayo10k.github.io/projects/") // production environment (GitHub Pages)        
        || thisURL.includes("adebayo10k.com/projects/") // development environment (local web server)        
        || thisURL.includes("127.0.0.1:5500/projects/") // development environment (VSCode running Live Server)        
        || thisURL.includes("localhost:8072/projects/") // localhost (docker containerised webserver)
    ) {

        const openedProjectsDB = openDB();

        //1. try to get records from database
        Promise.all([openedProjectsDB])
            .then((objects) => {
                let odb = objects[0];
                //console.log(odb);
                associatePageWithProject(odb);
            })
            .catch(err => {
                console.error(`Caught it! Or did it bubble up 1? Investigate. Error message: ${err.message}`);
            })

    }
    else {
        console.error("Error: NOT SURE WHICH PAGE WE'RE ON, SO NOTHING TO DO, BUT EXIT!");
    }

}



//------------------------------------------------------------------------------------