var dbQueries = require('./db_queries').dbQueries;

var responses = () => { }

responses.index = (req,res) => {    
    res.send('API is up and running');
}
responses.login = (req,res) => {
    if(req.body.user && req.body.password)
    {
        var userName = req.body.user;
        var password = req.body.password;
        dbQueries.getUser(userName,password, 
            (users) => 
            {
                if(users.length == 1) {                    
                    res.end('Hello '+ users[0].username); 
                    return; 
                }
                else
                {
                    res.end('Wrong user');
                }
            }            
        );                                                  
    }
    else
    {
        res.end('No user');        
    }    
}
exports.responses = responses;