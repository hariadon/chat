module.exports={
    setParams
}


function setParams(user,req){
if(req.body.name)user.name = req.body.name;
if(req.body.password)user.password = req.body.password;
if(req.body.roles)user.roles = req.body.roles;
if(req.body.email)user.email = req.body.email;
if(req.body.mobile)user.mobile = req.body.mobile;
if(req.body.address)user.address = req.body.address;
if(req.body.city)user.city = req.body.city;
if(req.body.state)user.state = req.body.state;
if(req.body.pincode)user.pincode = req.body.pincode;
}
