import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
//This section of imports adds to databse (PUT)
export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};


// TODO: Add logic for a method that gets all the content from the database
//This section of imports GETS the database
export const getDb = async () => {
  console.log('GET all from the database');
  const jateDb = await openDB('jate', 1); //connection to jate which we want to use
  const tx = jateDb.transaction('jate', 'readonly');//new transcation and privileges to data created
  const store = tx.objectStore('jate');//opens the objectStore
  const request = store.getAll();//.getAll() function to get data in the database
  const result = await request;//Confirmation step to know request was accepted
  console.log('result.value', result);
  return result?.value;
}

initdb();
