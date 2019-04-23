const Sequelize  = require('sequelize');
const database = 'contacts';
const userName = 'root';
const password = '';
const hostName = 'localhost';
const dialect = 'mysql';

const sequelize = new Sequelize(
    database ,
    userName ,
    password ,
    {
        host : hostName ,
        dialect : dialect
    }
)

var dbQueries = () => {}

dbQueries.getUser = (userName, password , next) => {        
    sequelize
    .query('SELECT * FROM users WHERE username = :username AND password = :password' , 
    {
        type: sequelize.QueryTypes.SELECT ,
        replacements : {
            username: userName,
            password : password
        }
    })
    .then((data) =>{                
        next(data);
    });
}
dbQueries.createToken = (userId , token , next) => {
    sequelize
    .query('INSERT INTO access_tokens VALUES ( :userId , :token )' , {
        type: sequelize.QueryTypes.INSERT ,
        replacements : {
            userId : userId,
            token : token
        }   
    })
    .then( () => {
        next(userId,token);
    })    
}
dbQueries.clearPreviousTokens = (userId, nextToken, next) => {
    sequelize
    .query('DELETE FROM access_tokens WHERE user_id = :userId' , 
    {
        type: sequelize.QueryTypes.DELETE ,
        replacements : {
            userId: userId
        }
    })
    .then(() =>{                        
        next(userId,nextToken);
    });    
}
dbQueries.getToken = (userId , token , next) => {
    sequelize
    .query('SELECT * FROM access_tokens WHERE user_id = :userId AND token = :token' , 
    {
        type: sequelize.QueryTypes.SELECT ,
        replacements : {
            userId: userId ,
            token: token
        }
    })
    .then((data) =>{                        
        next(data);
    });
}
dbQueries.removeToken = (userId , token , next) => {
    sequelize
    .query('DELETE FROM access_tokens WHERE user_id = :userId AND token = :token' , 
    {
        type: sequelize.QueryTypes.DELETE ,
        replacements : {
            userId: userId ,
            token: token
        }
    })
    .then(() =>{                        
        next();
    });
}
dbQueries.getContacts = (userId, next) => {
    sequelize
    .query('SELECT * FROM contacts WHERE user_id = :userId' , 
    {
        type: sequelize.QueryTypes.SELECT ,
        replacements : {
            userId: userId
        }
    })
    .then((data) =>{                
        next(data);
    });
}

dbQueries.getContactsWithSearchKeyword = (userId, searchKeyword, next) => {
    sequelize
    .query('SELECT * FROM contacts WHERE user_id = :userId and ( surname like \'%'+searchKeyword+'%\' OR name like \'%'+searchKeyword+'%\' OR phone like \'%'+searchKeyword+'%\' ) ' , 
    {
        type: sequelize.QueryTypes.SELECT ,
        replacements : {
            userId: userId
        }
    })
    .then((data) =>{                
        next(data);
    });
}

dbQueries.addContact = (userId , data , next) => {    
    sequelize
    .query('INSERT INTO contacts VALUES ( NULL , :userId , :surname , :name , :phone )' , 
    {
        type: sequelize.QueryTypes.INSERT ,
        replacements : {
            userId: userId ,
            surname: data.surname,
            name: data.name,
            phone: data.phone
        }
    })
    .then((data) =>{                
        next(data);
    });
}

dbQueries.getContact = (userId, contactId, next) => {
    sequelize
    .query('SELECT * FROM contacts WHERE user_id = :userId AND contact_id = :contactId' , 
    {
        type: sequelize.QueryTypes.SELECT ,
        replacements : {
            userId: userId ,
            contactId: contactId
        }
    })
    .then((data) =>{                
        next(data);
    });
}


dbQueries.updateContact = (userId , contactId, data , next) => {    
    sequelize
    .query('UPDATE contacts SET surname = :surname , name = :name , phone = :phone WHERE ( user_id = :userId AND contact_id = :contactId )' , 
    {
        type: sequelize.QueryTypes.UPDATE ,
        replacements : {
            userId: userId ,
            contactId: contactId,
            surname: data.surname,
            name: data.name,
            phone: data.phone
        }
    })
    .then(() =>{                
        next();
    });
}

dbQueries.deleteContact = (userId , contactId, next) => {    
    sequelize
    .query('DELETE FROM contacts WHERE ( user_id = :userId AND contact_id = :contactId )' , 
    {
        type: sequelize.QueryTypes.DELETE ,
        replacements : {
            userId: userId ,
            contactId: contactId
        }
    })
    .then(() =>{                
        next();
    });
}

dbQueries.getUsers = (next) => {
    sequelize
    .query('SELECT * FROM users' , 
    {
        type: sequelize.QueryTypes.SELECT
    })
    .then((data) =>{                
        next(data);
    });
}

dbQueries.addUser = (data , next) => {    
    sequelize
    .query('INSERT INTO users VALUES ( NULL , :username , :password , :admin )' , 
    {
        type: sequelize.QueryTypes.INSERT ,
        replacements : {
            username: data.username,
            password: data.password,
            admin: data.admin
        }
    })
    .then((data) =>{                
        next(data);
    });
}

dbQueries.deleteUser= (userToDeleteId , next) => {    
    sequelize
    .query('DELETE FROM users WHERE ( user_id = :userToDeleteId )' , 
    {
        type: sequelize.QueryTypes.DELETE ,
        replacements : {
            userToDeleteId: userToDeleteId 
        }
    })
    .then(() =>{                
        next();
    });
}

dbQueries.getUserForEditing = (userForEditId, next) => {
    sequelize
    .query('SELECT * FROM users WHERE user_id = :userId' , 
    {
        type: sequelize.QueryTypes.SELECT ,
        replacements : {
            userId: userForEditId
        }
    })
    .then((data) =>{                
        next(data);
    });
}

dbQueries.updateUser = (userForEditId , data , next) => {    
    sequelize
    .query('UPDATE users SET username = :username , password = :password , is_admin = :admin WHERE ( user_id = :userId  )' , 
    {
        type: sequelize.QueryTypes.UPDATE ,
        replacements : {
            userId: userForEditId ,
            username: data.username,
            password: data.password,
            admin: data.admin
        }
    })
    .then(() =>{                
        next();
    });
}
exports.dbQueries = dbQueries;