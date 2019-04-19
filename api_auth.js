var response = require('./response').response;

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
    res.end(response(true,'API key not set or wrong',null));         
}

exports.apiAuth = apiAuth;