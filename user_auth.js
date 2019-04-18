var dbQueries = require('./db_queries').dbQueries;
var userAuth = () => {}

userAuth.authUser = (req,res,next) => {   
    if(req.headers.token)
    {
        var userId = req.params.userId;
        var token = req.headers.token;   

        dbQueries.getToken(userId , token , (data) => {            
            if(data.length == 1) {
                console.log('ASDASDASDASD');
                var details = data[0];                
                if(details.user_id == userId && details.token == token)
                {                    
                    next();
                    return;                    
                }              
            }              
            res.end('Token not set or wrong');
            return;                        
        });        
    } 
    else 
    {
        res.end('Token not set or wrong');    
    }

}
exports.userAuth = userAuth;