import Enlistment from './Enlistment.js/Enlistment.js'

const root = document.getElementById('root');
const courses = [
    /**
     * TODO: Populate this list with the following course offerings:
     * 
     * - CCPROG1 (Section S15)
     * - CCPROG1 (Section S16)
     * - CCDSALG (Section S11)
     * - CCDSALG (Section S12)
     */

    {
        id: 'CCPROG1-S15',
        name: 'Programming 1',
        units: 3,
        schedule: 'MH 9:00 AM - 10:30 AM'
    },
    {
        id: 'CCPROG1-S16',
        name: 'Programming 1',
        units: 3,
        schedule: 'TF 1:00 PM - 3:00 PM'
    },
    {
        id: 'CCDSALG-S11',
        name: 'Data Structures and Algorithms',
        units: 3,
        schedule: 'MH 10:30 AM - 12:00 PM'
    },
    {
        id: 'CCDSALG-S12',
        name: 'Data Structures and Algorithms',
        units: 3,
        schedule: 'TF 3:00 PM - 5:00 PM'
    },
    {
        id: 'CCAPDEV-S18',
        name: 'Web Application Development',
        units: 3,
        schedule: 'WS 1:00 PM - 2:30 PM'
    }
];

const courseRender = new Enlistment('#root', courses);

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
