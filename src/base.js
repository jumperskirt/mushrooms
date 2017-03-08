import Rebase from 're-base';

//connection to firebase database
const base = Rebase.createClass({
    apiKey: "AIzaSyD7Njds1ihe2gQpamsLgFzbvONms_csqJo",
    authDomain: "mushrooms-49abc.firebaseapp.com",
    databaseURL: "https://mushrooms-49abc.firebaseio.com",
});

export default base;