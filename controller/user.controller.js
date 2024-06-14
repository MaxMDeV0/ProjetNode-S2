import UserModel from '../model/user.js'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
const secret = "secret hashing token"


export function getHome(req, res) {
    res.render('main/signinForm')
}

export function getLoginForm(req, res) {
    res.render('main/loginForm')
}

export async function addUser(req, res) {
    const {firstname, lastname, email, password, confirmpassword} = req.body
    const errors = {}

    if( !firstname || firstname.trim() == "" ) {
        errors.firstname = "Invalid firstname !"
    }
    if( !lastname || lastname.trim() == "" ) {
        errors.lastname = "Invalid lastname !"
    }
    if( !email || email.trim() == "" ) {
        errors.email = "Invalid email !"
    }
    if( !password || password.trim() == "" || password!=confirmpassword) {
        errors.password = "Invalid pasword !"
        console.log(password, confirmpassword)
    }
    
    if(Object.keys(errors).length != 0) {
        res.render("main/signinForm", {errors})
        return
    }

    const user = await UserModel.findOne({email: email})

    if ( user ) {
        const errors = {wrongEmail : "Email already used !"}
        res.render('main/signinForm', {errors})
        return

    }
    else {
        const sha256Hasher = crypto.createHmac("sha256", secret);
        const hash = sha256Hasher.update(password).digest("hex");
    
        const newUser = new UserModel({
            firstname,
            lastname,
            email,
            password : hash
        })
        newUser.save()
            .then(() => {
                res.redirect('/login')
                return
            })

    }

}

export async function loginUser(req, res) {
    const {email, password} = req.body
    const sha256Hasher = crypto.createHmac("sha256", secret);
    const hash = sha256Hasher.update(password).digest("hex");

    const user = await UserModel.findOne({email : email, password : hash})

    if (user) {
        const token = jwt.sign({userId: 1}, process.env.JWT_SECRET, {algorithm: "HS256"});
        req.session.token = token

        res.redirect("/dashboard")
    }
    else {

        const errors = {wrongPassword : "Wrong Password !"}
        res.render('main/loginForm', {errors})
        return

    }
}

export async function getUser(req, res) {
    const users = await UserModel.find({})
    res.render("main/dashboard", {users})
}