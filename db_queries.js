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
        next();
    })    
}

exports.dbQueries = dbQueries;