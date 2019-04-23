const apiAuth = require('./api_auth').apiAuth;
const userAuth = require('./user_auth').userAuth;

module.exports = (router , responses , upload) => {  
    
    router.get('/' , responses.index);
    
    //Access
    router.post('/login' ,  apiAuth.authApi, upload.array(), responses.login);    
    router.get('/logout' ,  apiAuth.authApi, upload.array() , responses.logout); 

    //Contacts
    //GET ALL
    router.get('/contacts/:userId', apiAuth.authApi, userAuth.authUser, responses.getContacts);
    //GET WITH SEARCH
    router.post('/contacts/:userId/:searchKeyword', apiAuth.authApi, userAuth.authUser, responses.getContactsWithSearchKeyword);
    //NEW
    router.post('/contacts', apiAuth.authApi, userAuth.authUser,  upload.array() , responses.addContact);   
    //GET ONE CONTACT
    router.get('/contacts/:userId/:contactId' , apiAuth.authApi, userAuth.authUser, responses.getContact);
    //UPDATE CONTACT
    router.put('/contacts/:contactId', apiAuth.authApi, userAuth.authUser, upload.array() , responses.updateContact);
    //DELETE CONTACT
    router.delete('/contacts/:contactId' , apiAuth.authApi, userAuth.authUser, responses.deleteContact);

}