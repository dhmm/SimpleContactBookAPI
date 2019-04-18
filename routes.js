module.exports = (router , responses , upload , apiAuth) => {  
    
    router.get('/' , responses.index);
    
    //Auth
    router.post('/login' ,  apiAuth.authApi, upload.array() , responses.login);    
}