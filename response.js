var response = (error = false , message = '' , data = null) => {
    var response = {                     
        error : error ,
        message : message ,
        data : data
    }
    return JSON.stringify(response);
}

exports.response = response;