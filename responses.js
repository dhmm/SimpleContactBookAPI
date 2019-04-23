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
                            dbQueries.clearPreviousTokens(users[0].user_id , token , (userId, nextToken) => {                                 
                                dbQueries.createToken(users[0].user_id , token , (userId , token) => {
                                    var data = 
                                    {
                                        userId : userId,
                                        token : token
                                    }                                
                                    res.end(response(false,'Hello user '+userName,  data )); 
                                    return;
                                }); 
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
    var userId = req.params.userId;    
    
    dbQueries.getContacts(userId  , (data) => {
        var contacts = 
        {
            contacts : data
        }
        res.end(response(false, 'OK' , contacts));
    })
}
responses.getContactsWithSearchKeyword  = (req,res) => {        
    var userId = req.params.userId;    
    var searchKeyword = req.params.searchKeyword;

    dbQueries.getContactsWithSearchKeyword(userId  , searchKeyword, (data) => {
        var contacts = 
        {
            contacts : data
        }
        res.end(response(false, 'OK' , contacts));
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
        res.end(response(false, 'OK' , null));
    });
}

responses.getContact  = (req,res) => {
    var userId = req.headers.userid;    
    var contactId = req.params.contactId;

    dbQueries.getContact(userId  , contactId,  (data) => {
        res.end(response(false, 'OK' , data));
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
        res.end(response(false, 'OK' , null));
    })
}

responses.deleteContact  = (req,res) => {
    var userId = req.headers.userid;    
    var contactId = req.params.contactId;
        
    dbQueries.deleteContact(userId  , contactId,  () => {
        res.end(response(false, 'OK' , null));
    })
}

responses.getUsers = (req,res) => {        
        
    dbQueries.getUsers((data) => {
        var users = 
        {
            users : data
        }
        res.end(response(false, 'OK' , users));
    })
}
responses.addUser = (req,res) => {        
    var data = new Object ({
        username : req.body.username,
        password : req.body.password,
        admin : req.body.admin
    });

    dbQueries.addUser(data , () => {
        res.end(response(false, 'OK' , null));
    });
}
exports.responses = responses;