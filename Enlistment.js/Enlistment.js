
export default class Enlistment {

    constructor(container, courses, maxEnrollment = 9) {
        
        this.onEnlist = null;
        this.onDrop = null;
        this.onFull = null;

        if (typeof container === 'string') {
            this.root = document.querySelector(container);
        } else {
            this.root = container;
        }

        this.courses = courses;
        this.enlistedCourses = [];

        this.enlistedCoursesDiv = document.createElement('div');        
        this.courseOfferingDiv = document.createElement('div');

        this.root.appendChild(this.courseOfferingDiv);
        this.root.appendChild(this.enlistedCoursesDiv);

        this.renderCourses();

    }

    getTotalUnits() {
        let units = 0;

        for (const courseId of this.enlistedCourses) {
            const course = this.courses.find(course => course.id === courseId);
            units += course.units;
        }

        return units;
    }

    renderCourses() {
        this.courseOfferingDiv.innerHTML = '<h2>Course Offerings</h2>';
        this.enlistedCoursesDiv.innerHTML = '<h2>Enlisted Course</h2>';

        this.courses.forEach(course => {
            if (!this.enlistedCourses.includes(course.id)) {
                this.renderCourseItem(this.courseOfferingDiv, course, 'Enlist', () => this.enlist(course.id));
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

    parseCourseId(id) {
        const [ code, section ] = id.split('-');

        return {
            code: code,
            section: section
        };
    }

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

    drop(courseId) {
        this.enlistedCourses = this.enlistedCourses.filter(id => id !== courseId);
        this.renderCourses();

        if (this.onDrop) {
            this.onDrop(courseId);
        }
    }

};
