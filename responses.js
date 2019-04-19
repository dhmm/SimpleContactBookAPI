var dbQueries = require('./db_queries').dbQueries;
var tokenizer = require('./tokenizer').tokenizer;
var response = require('./response').response;

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
                            dbQueries.createToken(users[0].user_id , token , (userId , token) => {
                                var data = 
                                {
                                    userId : userId,
                                    token : token
                                }                                
                                res.end(response(false,'Hello user '+userName,  data )); 
                            });
                        }
                    );
                    return; 
                }
                else
                {
                    res.end(response(true,'Wrong user',null));
                }
            }            
        );                                                  
    }
    else
    {
        res.end(response(true,'No user',null));        
    }    
}
responses.logout = (req,res) => {
    var userId = req.headers.userid;
    var token = req.headers.token;
    dbQueries.removeToken(userId ,token , () => {
        res.end(response(false,'Logged out',null));        
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

responses.getContact  = (req,res) => {
    var userId = req.headers.userid;    
    var contactId = req.params.contactId;

    dbQueries.getContact(userId  , contactId,  (data) => {
        res.send(data);
    })
}

responses.updateContact  = (req,res) => {
    var userId = req.headers.userid;    
    var contactId = req.params.contactId;
    
    var data = new Object ({
        userId : userId,
        surname : req.body.surname,
        name : req.body.name,
        phone : req.body.phone
    });


    dbQueries.updateContact(userId  , contactId,  data , () => {
        res.end('OK');
    })
}

responses.deleteContact  = (req,res) => {
    var userId = req.headers.userid;    
    var contactId = req.params.contactId;
        
    dbQueries.deleteContact(userId  , contactId,  () => {
        res.end('OK');
    })
}
exports.responses = responses;