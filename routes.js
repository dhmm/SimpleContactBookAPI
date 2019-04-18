const apiAuth = require('./api_auth').apiAuth;
const userAuth = require('./user_auth').userAuth;

module.exports = (router , responses , upload) => {  
    
    router.get('/' , responses.index);
    
    //Access
    router.post('/login' ,  apiAuth.authApi, upload.array() , responses.login);    
    router.get('/logout' ,  apiAuth.authApi, upload.array() , responses.logout); 

    //Contacts
    router.get('/get_contacts/:userId', apiAuth.authApi, userAuth.authUser, responses.getContacts);
    router.put('/contact', apiAuth.authApi, userAuth.authUser,  upload.array() , responses.addContact);
}