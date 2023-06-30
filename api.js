// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore,collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite"
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJWYb1A-o12ECI7-gq3JMhcxQ1nc7bkG0",
  authDomain: "vanlife-2dfed.firebaseapp.com",
  projectId: "vanlife-2dfed",
  storageBucket: "vanlife-2dfed.appspot.com",
  messagingSenderId: "350361143966",
  appId: "1:350361143966:web:1c1f32c5e5365720afc98f"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


// //Refactoring the fetching functions

const vansCollectionRef = collection(db, "vans")
const users = collection(db, "users")

export async function getVans(){
    const querySnapshot = await getDocs(vansCollectionRef)
    const dataArr = await querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}



export async function getVan(id){
    const docRef =  doc(db, "vans", id);
    const vanSnapshot = await getDoc(docRef);
    return{
        ...vanSnapshot.data(),
        id: vanSnapshot.id
    }
}

export async function getHostVans(){
    const q =  query(vansCollectionRef, where("hostId","==","123"))
    const querySnapshot = await getDocs(q)
    const dataArr = await querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
    }))
    return dataArr
}

// export async function loginUser(creds){
//     const docRef =  doc(db, "users", id);
//     const vanSnapshot = await getDoc(docRef);
//     return{
//         ...vanSnapshot.data(),
//         id: vanSnapshot.id
//     }
// }



// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }



export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}