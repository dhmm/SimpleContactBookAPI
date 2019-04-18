var apiAuth = () => {}

apiAuth.authApi = (req,res , next) => {
    if(req.headers['api-key'])
    {
        if(req.headers['api-key'] == 'A0123456789')
        {
            next(); 
            return;                      
        }
    }    
    res.send('API key not set or wrong');        
}

exports.apiAuth = apiAuth;