var responses = () => { }

responses.index = (req,res) => {
    res.send('API is up and running');
}
responses.login = (req,res) => {
    if(req.body.user)
    {
        console.log(`user is ${req.body.user}`);
    }
    else
    {
        console.log('no user');
    }
    res.send('OK');
}
exports.responses = responses;