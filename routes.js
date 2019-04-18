const apiAuth = require('./api_auth').apiAuth;

module.exports = (router , responses , upload) => {  
    
    router.get('/' , responses.index);
    
    //Auth
    router.post('/login' ,  apiAuth.authApi, upload.array() , responses.login);    
}