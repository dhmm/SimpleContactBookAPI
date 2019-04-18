var userAuth = () => {}

userAuth.authUser = (req,res,next) => {
    console.log('user auth');

    if(req.headers['token'])
    {
        if(req.headers['token'] == '1a8b7aba718b103a8d3485225fba36e8664d8efaaf18d2358742efeb7f15b649b8482b68bfd94ba16413282991b9afc9')
        {
            next(); 
            return;                      
        }
    }    
    res.send('Token not set or wrong');    
}
exports.userAuth = userAuth;