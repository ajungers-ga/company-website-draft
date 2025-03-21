const express = require('express'); // importing the express framework
const app = express();              // creating an express app instance
const port = 3005;                  // this is my local port 

app.use(express.static('public'));  // this is telling express to service unchanging files like css into public folder
app.set('view engine', 'ejs');      // instrictiong espress to use the ejs for templating by html routes

//  BELOW Lines 13-29
// 
// represent arrays for generic data. 


const pastWork = [
    { id: 1, title: "E-commerce Platform", description: "Developed a full-stack e-commerce platform for a retail client." },
    { id: 2, title: "Mobile App", description: "Built a cross-platform mobile application for a health startup." },
    { id: 3, title: "Inventory System", description: "Designed an inventory tracking system for a logistics company." }
];

const staffMembers = [
    { id: 1, name: "Alice Johnson", position: "CEO", email: "alice@example.com", phone: "123-456-7890" },
    { id: 2, name: "Bob Smith", position: "CTO", email: "bob@example.com", phone: "987-654-3210" },
    { id: 3, name: "Charlie Brown", position: "Lead Engineer", email: "charlie@example.com", phone: "555-666-7777" }
];

const externalLinks = [
    { name: "TechCrunch", url: "https://techcrunch.com" },
    { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
    { name: "Stack Overflow", url: "https://stackoverflow.com" }
];

// Routes
app.get('/', (req, res) => {        // the home directory
    res.render('home');
});

app.get('/staff', (req, res) => {
    res.render('staff', { staff: staffMembers }); // this is sending the staff memeber data to staff.ejs
});                                               // to render a staff listing page

app.get('/staff/:id', (req, res) => {               // route definition. The colon denotes a dynamoc URL param.:id represebts a placeholder
    const staffId = parseInt(req.params.id);        // parseInt covers this string to an integer to match the IDs as numbers
    let member;

    for(let i = 0; i < staffMembers.length; i++) {      // i'm initializing the variable named member by
        if (staffMembers[i].id === staffId) {           // looping through each item in staffMembers[i] from the array 
            member = staffMembers[i];                   // by checking if the current items .id property matches the requested staffId
            break;                                      // break stops immediately when a match is found
        }
    }

    if (member) {                                               // checks if a staff member was successful found    
        res.render('staff-details', { member });                // if no matching member is found, 
    } else {
        res.status(404).send("Staff member not found");         // we set the HTTP response to display status 404 with text = "Staff member not found"
    }
});

app.get('/pastwork', (req, res) => {                            // route to our Past Work
    res.render('pastwork', { projects: pastWork });             // this line renders the pastwork.ejs file and passes it to the array pastWork
});

app.get('/pastwork/:id', (req, res) => {                        // defining the dynamic route. :id is a placeholder that captures whats typed in url AFTER /pastwork/
    const projectId = parseInt(req.params.id);                  //  capturing the ID from the URL as a string. In this case (1,2,3)// parseint converts into an integer(number) which matches how ids are stored
    const project = pastWork.find(project => project.id === projectId);     //find() method of array returns the first element in array that matches the id

// example ABOVE: http://localhost:3000/pastwork/1 will show id: 1, title: "E-commerce Platform" from the pastWord array

    if (project) {
        res.render('pastwork-details', { project });            // if an existing id matches, render the project array
    } else {
        res.status(404).send("Project not found");              //  we set the HTTP response to display status 404 with text = "Staff member not found"
    }
});

app.get('/external-links', (req, res) => {                          // route to our external links  
    res.render('external-links', { links: externalLinks });         // show our external links 
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});


app.listen(port, '0.0.0.0', () => {
   console.log(`Server running at http://localhost:${port}`);
});