var dbQueries = require('./db_queries').dbQueries;
var response = require('./response').response;
var userAuth = () => {}

userAuth.authUser = (req,res,next) => {   
    if(req.headers.token)
    {
        var userId = req.headers.userid;
        var token = req.headers.token;           

        dbQueries.getToken(userId , token , (data) => {            
            if(data.length == 1) {                
                var details = data[0];                
                if(details.user_id == userId && details.token == token)
                {                    
                    next();
                    return;                    
                }              
            }              
            res.end(response(true,'Token not set or wrong',null));
            
            return;                        
        });        
    } 
    else 
    {
        res.end(response(true,'Token not set or wrong',null));   
    }

}
exports.userAuth = userAuth;