var express = require('express')
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');        // Connecting To database
const List = require('./models/List');          //Database Secham 
const app = express();

app.set('view engine', 'ejs');              // viewing engin 
app.set('views', path.join(__dirname, 'views'));        //path
app.use(express.urlencoded());              //dcodes data from webpages
app.use(express.static('assets'));          //static file storage like CSS nas JS


app.get('/',function(req,res){

    List.find({}, function(err, List){
        if(err){
            console.log("Error in Fetching ");
            return;
        }

        return res.render('home', { 
        header: "TO-DO List",
        todo_list : List
    })

    })
})


//Creating task
app.post('/create-list',function(req,res){
    // List.push(req.body);
    console.log(req.body);

    List.create(req.body,function(err, newContact){
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

    List.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting object from database');
            return;
        }

        return res.redirect('back');
    });

})


// Port listening
app.listen(port, function(err){
    if (err) {
        console.log("Error in running the server", err);
    }
    console.log('Yup!My Server is running on Port', port);
})