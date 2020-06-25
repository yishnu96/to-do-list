var express = require('express')
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');        // Connecting To database
const List = require('./models/List');          //Database Sechma
const app = express();

app.set('view engine', 'ejs');              // viewing engins
app.set('views', path.join(__dirname, 'views'));        //parth
app.use(express.urlencoded());              //dcodes data from webpages
app.use(express.static('assets'));          //static file storage like CSS nas JS


var  TaskList = [
    {
        name: "Arpan",
        date: 2012-04-23,
        time : 12,
        type : "meeting"
    },
    {
        name: "Tony Stark",
        date : 2016-05-19,
        type : "personal"
    },
    {
        name: "Coding Ninjas",
        date : 2016-05-24,
        type : "other"
    }
]

app.get('/',function(req,res){
    return res.render('home', { 
        header: "TO-DO List",
        todo_list : TaskList
    })
})
//Creating task
app.post('/create-list',function(req,res){
    // List.push(req.body);
    // console.log(req.body);

    List.create({
        name : req.body.name,
        date : req.body.date,
        time : req.body.time,
        type : req.body.type

    },function(err, newContact){
        if(err){console.log('Error in creating a contact!') 
            return;
        }
    console.log('******', newContact);
    return res.redirect('back');
    })
})
//delete task
app.get('/delete-task',function(req,res){
    console.log(req.query)
    let id = req.query.id

    List.findOneAndDelete(id, function(err){
        if(err){
            console.log('Cannot Delete The Task');
            return;
        }
        return res.redirect('back');
    })

})

// Port listening
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})