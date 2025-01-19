import Enlistment from './Enlistment.js/Enlistment.js'

const courses = [
    /**
     * TODO: Populate this list with the following course offerings:
     * 
     * - CCPROG1 (Section S15)
     *   Name: Introductory Programming in C
     *   Units: 3
     *   Schedule: MH 9:00 AM - 10:30 AM
     * 
     * - CCAPDEV (Section S16)
     *   Name: Web Application Development
     *   Units: 3
     *   Schedule: TF 1:00 PM - 3:00 PM
     * 
     * - CCDSALG (Section S17)
     *   Name: Data Structures and Algorithms
     *   Units: 3
     *   Schedule: TF 9:00 AM - 10:30 AM
     */
];

const root = document.getElementById('root');
const courseRender = new Enlistment(
    /**
     * TODO: Initialize the enlistment render object. Assume max enrollment is 6.
     */
);

courseRender.onEnlist = (courseId) => {
    /**
     * TODO: Create a notification modal that provides feedback
     */
}

courseRender.onDrop = (courseId) => {
    /**
     * TODO: Create a notification modal that provides feedback
     */
}

courseRender.onFull = () => {
    /**
     * BONUS TODO: Create an error modal that provides feedback
     */
}

/**
 * BONUS TODO: Style the application accordingly to be more visually appealing.
 * HINT: Go to `index.html`.
 */
