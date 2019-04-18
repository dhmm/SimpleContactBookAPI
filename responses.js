var dbQueries = require('./db_queries').dbQueries;
var tokenizer = require('./tokenizer').tokenizer;

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
                    tokenizer.getToken((token) => { 
                            dbQueries.createToken(users[0].user_id , token , () => {
                                res.end('Hello '+ users[0].username+' -> '+token); 
                            });
                        }
                    );
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
responses.logout = (req,res) => {
    var userId = req.headers.userid;
    var token = req.headers.token;

    dbQueries.removeToken(userId ,token , () => {
        res.end('OK');
    });
}

responses.getContacts  = (req,res) => {
    var userId = req.headers.userid;    
    
    dbQueries.getContacts(userId  , (data) => {
        res.send(data);
    })
}

responses.addContact = (req,res) => {    
    var userId = req.headers.userid;
    var data = new Object ({
        userId : userId,
        surname : req.body.surname,
        name : req.body.name,
        phone : req.body.phone
    });

    dbQueries.addContact(userId ,data , () => {
        res.end('OK');
    });
}
exports.responses = responses;