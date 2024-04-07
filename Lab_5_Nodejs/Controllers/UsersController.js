const usersModel = require("../Models/UsersModel");
const bcrypt = require("bcrypt");
const userValidation = require("../Utils/UserValidation")

let getAllUsers = async (req,res)=>{

    try 
    {
        let allUsers = await usersModel.find({});
        if(allUsers){
            return res.json(allUsers);
        } else{
            return res.json("No users in DB !!");
        }
    } catch (error) {
        return res.json({"Error": `Cannot get users data !! ${error}`});    
    }
}

let getUserByName = async (req,res)=>{

    try 
    {
        let foundUsers = await usersModel.find({userName: req.params.userName});
        if(foundUsers.length != 0){
            return res.json(foundUsers);
        } else{
            return res.json("No users found in DB !!");
        }
    } catch (error) {
        return res.json({"Error": `Cannot get users data !! ${error}`});    
    }
}

let addNewUser = async (req,res)=>{
    let userData = new usersModel(req.body);
    try {
        if(userValidation(userData))
        {
            await userData.save();
            return res.json({"Success": `User added successfully :)`});  
        } else {
            return res.json(`${userValidation.errors[0].message}`)
        }
    } catch (error) {
        return res.json({"Error": `Cannot add mew user !! ${error}`});    
    }
}


let updateUser = async (req, res) => {
    try {
        let userMail = req.params.email;
        console.log(userMail);
        
        let foundUser = await usersModel.findOne({ email: req.params.email.toLowerCase() });
        // console.log(foundUser);

        if (!foundUser) {
            return res.json("User Not found in DB. Please register first.");
        }
        if(userValidation(foundUser))
        {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(req.body.password, salt);
    
            let updatedUser = await usersModel.findOneAndUpdate(
                { email: userMail.toLowerCase() },
                {
                    userName: req.body.userName,
                    age: req.body.age,
                    address: req.body.address,
                    email: req.body.email.toLowerCase(),
                    password: hashedPassword
                },
                { new: true }
            );
    
            if (!updatedUser) {
                return res.json("Cannot update the user.");
            }
            
            return res.json("User Updated Successfully.");
        } else {
            return res.json(`${userValidation.errors[0].message}`)
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal Server Error");
    }
}

let deleteUser = async (req,res)=>{
    try 
    {
        const userMail = req.params.email;
        const deletedUser = await usersModel.deleteOne({email: userMail});
        // console.log(deletedUser);
        if (deletedUser.deletedCount == 0) 
        {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.json({ success: "User deleted successfully" });
    } catch (err) {
        return res.status(400).json({ error: `Cannot delete this User: ${err.message}` });
    }
}

let Register = async (req, res) => {
    try 
    {
        let foundUser = await usersModel.findOne({ email: req.body.email.toLowerCase() });

        if (foundUser) 
        {
            return res.send("User Already Exist, Please Login");
        }

        if(userValidation(foundUser))
        {
            let salt = await bcrypt.genSalt(10);
            let hashedPassword = await bcrypt.hash(req.body.password, salt);

            let newUser = new usersModel({
                userName: req.body.userName,
                age: req.body.age,
                address: req.body.address,
                email: req.body.email.toLowerCase(),
                password: hashedPassword,
            });

            await newUser.save();

            return res.json({ message: "User Registered Successfully", data: newUser });
        } else {
            return res.json(`${userValidation.errors[0].message}`)
        }
    } catch (error) {
        return res.json({ Error: `Registration Failed: ${error}` });
    }
}


let Login = async (req, res) => {
    try 
    {
        let foundUser = await usersModel.findOne({ email: req.body.email.toLowerCase() });
        // console.log(foundUser);

        if (!foundUser) 
        {
            return res.json("User Doesn't exist, do you want to register?");
        }

        if(userValidation(foundUser))
        {
            let passCompare = await bcrypt.compare(req.body.password, foundUser.password);
            if (!passCompare) 
            {
                return res.json("Invalid UserName or Password !!");
            }
            return res.json("Logged in Successfully :)");
        } else {
            return res.json(`${userValidation.errors[0].message}`)
        }
    } catch (error) {
        return res.json({ "Error": `Login Failed: ${error}` });
    }
}

module.exports = {
    getAllUsers,
    getUserByName,
    addNewUser,
    updateUser,
    deleteUser,
    Register,
    Login
}