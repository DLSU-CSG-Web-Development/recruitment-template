import { SkillTree } from './SkillTree.js/SkillTree.mjs'

const skillTree = new SkillTree('#root', {
    id: 'web-development',
    name: 'Web Development',
    children: [
        {
            id: 'html',
            name: "HTML Basics",
            children: [
                { id: "semantic", name: "Semantic HTML", children: [] },
                { id: "forms", name: "HTML Forms", children: [] }
            ]
        }
    ]
});

skillTree.addSkill({
    id: 'css',
    name: 'CSS Fundamentals',
    prerequisite: 'web-development',
    children: []
})

skillTree.addSkill({
    id: 'css-selectors',
    name: 'CSS Selectors',
    prerequisite: 'css'
});

skillTree.addSkill({
    id: 'javascript',
    name: 'JavaScript Basics',
    prerequisite: 'web-development'
})

skillTree.render();

// console.log(skillTree.traverseSkillTree(skillTree.root, 'css'));

