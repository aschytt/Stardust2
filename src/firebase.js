import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAGyI0h7geBuNuRrUPB8yVm9QIo7de3uBs",
    authDomain: "stardust-4808d.firebaseapp.com",
    databaseURL: "https://stardust-4808d.firebaseio.com",
    projectId: "stardust-4808d",
    storageBucket: "stardust-4808d.appspot.com",
    messagingSenderId: "339517051071"
};

const fire = firebase.initializeApp(config);
const fireDatabase = firebase.database().ref();

export default fire;
export {fireDatabase};