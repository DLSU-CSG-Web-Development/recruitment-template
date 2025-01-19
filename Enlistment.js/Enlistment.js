/**
 * @class Enlistment
 * @description Handles course enlistment logic, including rendering available 
 * courses, tracking enlisted courses, and enforcing maximum enrollment limits.
 */
export default class Enlistment {

    /**
     * Creates an Enlistment instance.
     * @param {HTMLElement|string} container - The DOM element or selector 
     *      string where the enlistment UI should be rendered.
     * @param {Array<Object>} courses - The list of available courses.
     * @param {number} [maxEnrollment=9] - The maximum allowed units a student 
     *      can enroll in. Defaults to 9.
     */
    constructor(container, courses, maxEnrollment = 9) {
        
        this.onEnlist = null;   // Callback for when a course is enlisted
        this.onDrop = null;     // Callback for when a course is dropped
        this.onFull = null;     // Callback for when enrollment limit is reached

        if (typeof container === 'string') {
            this.root = document.querySelector(container);
        } else {
            this.root = container;
        }

        this.courses = courses;     // List of course offerings
        this.enlistedCourses = [];  // List of currently enlisted course IDs

        this.enlistedCoursesDiv = document.createElement('div');        
        this.courseOfferingDiv = document.createElement('div');

        this.root.appendChild(this.courseOfferingDiv);
        this.root.appendChild(this.enlistedCoursesDiv);

        this.renderCourses();

    }

    /**
     * Calculates the total units of enlisted courses.
     * @returns {number} The total number of units the student has enlisted.
     */
    getTotalUnits() {
        let units = 0;

        for (const courseId of this.enlistedCourses) {
            const course = this.courses.find(course => course.id === courseId);
            units += course.units;
        }

        return units;
    }

    /**
     * Renders the list of available and enlisted courses.
     */
    renderCourses() {
        this.courseOfferingDiv.innerHTML = '<h2>Course Offerings</h2>';
        this.enlistedCoursesDiv.innerHTML = '<h2>Enlisted Course</h2>';

        this.courses.forEach(course => {
            if (!this.enlistedCourses.includes(course.id)) {
                this.renderCourseItem(
                    this.courseOfferingDiv, 
                    course, 
                    'Enlist', () => this.enlist(course.id));
            }
        });

        this.enlistedCourses.forEach(courseId => {
            const course = this.courses.find(c => c.id === courseId);
            if (course) {
                this.renderCourseItem(
                    this.enlistedCoursesDiv, 
                    course, 
                    'Drop', () => this.drop(course.id));
            }
        });
    }
    
    /**
     * Renders an individual course item with an action button.
     * @param {HTMLElement} container - The DOM element to append the course 
     *      item to.
     * @param {Object} course - The course object.
     * @param {string} actionText - The text for the action button (e.g., 
     *      "Enlist" or "Drop").
     * @param {Function} actionCallback - The function to call when the action 
     *      button is clicked.
     */
    renderCourseItem(container, course, actionText, actionCallback) {
        const courseCard = document.createElement('div');
        const { id, name, units, schedule } = course;
        const { code, section } = this.parseCourseId(id);
        
        courseCard.id = id;
        courseCard.className = 'course-item';
        courseCard.innerHTML = `
            <h4>[${code} | ${section}] ${name}</h4>
            <p>${units} units </p>
            <p>${schedule}</p>
        `;

        const actionButton = document.createElement('button');
        actionButton.addEventListener('click', actionCallback);
        actionButton.id = `btn-${id}`
        actionButton.innerText = actionText;
        courseCard.appendChild(actionButton);

        container.appendChild(courseCard);
    }

    /**
     * Parses a course ID into its code and section components.
     * @param {string} id - The course ID string (e.g., "CCPROG1-S15").
     * @returns {Object} An object containing `code` and `section`.
     */
    parseCourseId(id) {
        const [ code, section ] = id.split('-');

        return {
            code: code,
            section: section
        };
    }

    /**
     * Enlists a course if it does not exceed the max enrollment limit.
     * @param {string} courseId - The ID of the course to enlist.
     */
    enlist(courseId) {

        if (!this.enlistedCourses.includes(courseId)) {

            const { units } = this.courses.find(
                course => course.id === courseId);
            
            if (this.getTotalUnits() + units > this.maxEnrollment) {
                this.onFull();
                return;
            }

            this.enlistedCourses.push(courseId);
            this.renderCourses();
        }

        if (this.onEnlist) {
            this.onEnlist(courseId);
        }
    }

    /**
     * Drops a course from the enlisted list.
     * @param {string} courseId - The ID of the course to drop.
     */
    drop(courseId) {
        this.enlistedCourses = this.enlistedCourses.filter(
            id => id !== courseId
        );
        this.renderCourses();

        if (this.onDrop) {
            this.onDrop(courseId);
        }
    }

};
