const apiAuth = require('./api_auth').apiAuth;
const userAuth = require('./user_auth').userAuth;

module.exports = (router , responses , upload) => {  
    
    router.get('/' , responses.index);
    
    //Auth
    router.post('/login' ,  apiAuth.authApi, upload.array() , responses.login);    

    //Contacts
  
}