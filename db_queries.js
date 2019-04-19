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
exports.dbQueries = dbQueries;