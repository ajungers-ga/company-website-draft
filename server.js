const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine', 'ejs');

// Dummy data for Past Work, Staff, and External Links
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
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/staff', (req, res) => {
    res.render('staff', { staff: staffMembers });
});

app.get('/staff/:id', (req, res) => {
    const staffId = parseInt(req.params.id);
    let member;

    for(let i = 0; i < staffMembers.length; i++) {
        if (staffMembers[i].id === staffId) {
            member = staffMembers[i];
            break;
        }
    }

    if (member) {
        res.render('staff-details', { member });
    } else {
        res.status(404).send("Staff member not found");
    }
});

app.get('/pastwork', (req, res) => {
    res.render('pastwork', { projects: pastWork });
});

app.get('/pastwork/:id', (req, res) => {
    const projectId = parseInt(req.params.id);
    const project = pastWork.find(p => p.id === projectId);

    if (project) {
        res.render('pastwork-details', { project });
    } else {
        res.status(404).send("Project not found");
    }
});

app.get('/external-links', (req, res) => {
    res.render('external-links', { links: externalLinks });
});

app.get('/history', (req, res) => {
    res.render('history');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
