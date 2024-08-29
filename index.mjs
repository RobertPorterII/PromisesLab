// Importing database functions. DO NOT MODIFY THIS LINE.
import { central, db1, db2, db3, vault } from "./databases.mjs";

async function getUserData(id) { // added async to base function
    const dbs = {  // for syntax moved this back to top after code alteration
        db1: db1,
        db2: db2,
        db3: db3
      };
    //==== step one find users in the databases using central
    const dataBaseName = await central(id); // Class solution
    console.log(dataBaseName)  // class solution
    //======== step 2 user's basic information
    const basicInfo = await dbs[dataBaseName](id) // called valueReturnedFromCentralin lab example
    console.log(basicInfo); // output promise pending until u put await in line above
    //====== Step 3 access vault i.e private data within
    const personalData = await vault(id);  // called const ReturnedValue in lab example
      console.log(personalData); // private data
      // ========= Part 2
      // combing 2 objects basicInfo and personalData into 1 output 
      return {
        ...basicInfo,
        ...personalData
      }
    // group answer below
//   const getDatabase = await central(id); // group solution
//     console.log(getDatabase); // group solution
//     const result = await dbs[getDatabase](id); // group solution
//     console.log(result); // group solution
    
}


//const returnedValue = await vault(5)
// console.log(returnedValue);
// getUserData(1);
// getUserData(9);

// console.log(getUserData(5));
const user =  await getUserData(6)
console.log(user);

// Promise.all technique in application development can significantly increase the speed
async function fetchUserData(id) {
   const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
   };
   const returnedValue = await central(id);
  


Promise.all([dbs[returnedValue](id),vault(id)]).then(([result, vaultResult]) => {
  const finalObj = {'id': id, ...result, ...vaultResult}
  console.log(finalObj);
  
});

}
// time start and time end
 console.time('fetchUserData');
 getUserData(6);  //  0.032958984375 ms
 console.timeEnd('fetchUserData');
