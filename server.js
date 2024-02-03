// Create express app
var express = require("express")
var path = require("path");
const bodyParser = require('body-parser');

var students = [
    {
        id: 1,
        first_name: "jon",
        last_name: "smith",
        age: "15",
        gender: "male"
    },
    {
        id: 2,
        first_name: "sally",
        last_name: "smith",
        age: "16",
        gender: "female"
    },
    {
        id: 3,
        first_name: "jeff",
        last_name: "jones",
        age: "17",
        gender: "male"
    }
]

var app = express();

// Insert here other API endpoints
app.use(express.static(path.join(__dirname,'client')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Root endpoint
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,'client/index.html'));
});

app.get("/api/getstudents", (req, res) => {
    res.json(students);
});

app.get("/api/getstudent", (req, res) => {   
    let id = req.query.id;
    let student = students.find (function(item) {
        return item.id === Number(id);
    })
    res.json(student);
});

app.post("/api/addstudent", (req, res) => {
    const idMax = Math.max(...students.map(function(item){ 
        return Number(item.id);
    }));

    let student = {
        id: idMax + 1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        age: req.body.age,
        gender: req.body.gender
    }
    students.push(student)
    res.json({Result: true, Message: "Added"})
});

app.post("/api/updatestudent", (req, res) => {
    let id = req.body.id;
    let foundIndex  = students.findIndex (function(item) {
        return item.id === Number(id)
    });

    students[foundIndex].first_name = req.body.first_name;
    students[foundIndex].last_name = req.body.last_name;
    students[foundIndex].age = req.body.age;
    students[foundIndex].gender = req.body.gender;

    res.json({Result: true, Message: "Updated"})
});

app.post("/api/deletestudent", (req, res) => {
    let id = req.body.id;
    students.forEach((item, index) => {
        if (item.id === Number(id)) {
            students.splice(index, 1);
        }
    });
    res.json({Result: true, Message: "Deleted"})
});

// Server port
var HTTP_PORT = 8000 
// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

