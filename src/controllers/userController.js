const router = require('express').Router();
const userService = require('../services/userService')
router.get('/register',(req,res) => {
    res.render('user/register')
})


router.post('/register',async(req,res) => {
    const {username,password,repeatPassword} = req.body
    
    try {
        await userService.register({username,password,repeatPassword})
        res.redirect('/users/login')
    } catch (err) {
        console.log(err.errors);
        const {message:errorMessages} = err;
        console.log(errorMessages);
        res.status(404).render('user/register',{errorMessage:errorMessages})
    } 
})


router.get('/login',(req,res) => {
    res.render('user/login')
})


router.post('/login',async(req,res) => {
    //find the user
    const {username,password} = req.body
    const token = await userService.login(username,password)

    res.cookie('auth',token,{httpOnly:true})
    res.redirect('/')
})


module.exports = router