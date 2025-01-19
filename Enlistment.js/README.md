# Course Enlistment System
## Overview
The **Course Enlistment System** is a JavaScript-based application that allows 
students to select and manage course enrollments dynamically. It provides an 
interactive UI for viewing available courses, enlisting in courses, and dropping 
them while enforcing a maximum enrollment limit. The system is designed to be 
lightweight, modular, and customizable.

This project is built using vanilla JavaScript, making it compatible with any 
web-based environment without external dependencies.

For library usage guide, go to the following link: 
https://zircon-mind-acb.notion.site/Library-Documentation-Usage-Guide-180c6e28458c80ea980ddb431e6ce8d0?pvs=4

## Features
✅ Dynamic Course Display – Courses are listed with their details, including 
code, section, units, and schedule.
✅ Enlistment & Dropping – Students can enroll in or drop courses with 
a single click.
✅ Unit Limit Enforcement – The system ensures that students do not exceed 
the maximum allowed units.
✅ Event Callbacks – Developers can attach custom functions to respond to 
enlistment, dropping, and enrollment limit reached events.
✅ Fully Customizable – The UI and behavior can be tailored using CSS 
and JavaScript


Usage Guide
1. Creating an Enlistment Instance
In your JavaScript file (script.js or similar), initialize an instance of 
the Enlistment class:

```js
Copy
Edit
import Enlistment from './Enlistment.js';

const courses = [
    { id: "CCPROG1-S15", name: "Introductory Programming in C", units: 3, schedule: "MH 9:00 AM - 10:30 AM" },
    { id: "CCDSALG-S11", name: "Data Structures and Algorithms", units: 3, schedule: "TF 9:00 AM - 10:30 AM" }
];

// Attach the system to a container div
const courseRender = new Enlistment('#root', courses, 6);
```
2. Handling Events
You can define custom behaviors when students enlist, drop, or reach the unit 
limit:

```js
courseRender.onEnlist = (courseId) => {
    console.log(`Enlisted in: ${courseId}`);
};

courseRender.onDrop = (courseId) => {
    console.log(`Dropped from: ${courseId}`);
};

courseRender.onFull = () => {
    console.log("Max enrollment reached!");
};
```
