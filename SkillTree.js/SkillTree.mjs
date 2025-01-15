
export class SkillTree {
    
    constructor(container, mainSkill) {
        this.container = container;
        this.root = mainSkill
    }

    addSkill(skill) {
        
        const prerequisiteId = skill['prerequisite']
        delete skill['prerequisite']
        
        const prerequisite = this.traverseSkillTree(this.root, prerequisiteId)
        prerequisite['children'].push(skill)

    }

    traverseSkillTree(tree, skillId) {
        
        // Check if the current node is the one we are looking for

        if (tree['id'] == skillId) {
            return tree
        }

        // If the node has children, iterate through them
        if (tree['children'] && tree['children'].length > 0) {
            for (let child of tree['children']) {
                // Recursively call the function on each child
                let result = this.traverseSkillTree(child, skillId);

                if (result) {
                    return result;
                }
            }
        }
    
        // If the node is not found, return null
        return null;
    }

    addSkills(skills) {

    }

    render() {
        const container = document.querySelector(this.container);
        container.className += 'skill-tree';
        
        const levels = []
        const traverse = (node, level = 0) => {

            if (!levels[level]) {
                levels[level] = [];
            }

            levels[level].push(node)

            if (node['children']) {

                node['children'].forEach(child => {
                    traverse(child, level + 1);
                });

            }
        }

        traverse(this.root)
        console.log(levels);
        

        levels.forEach((level, index) => {
            const levelDiv = document.createElement('div');
            levelDiv.className += 'skill-level';
            
            level.forEach((skill) => {
                
                const skillNode = document.createElement('div');
                skillNode.className += 'skill-node';
                skillNode.innerHTML = skill.name;
                
                if (index > 0) {
                    
                    console.log(index);
                    const connector = document.createElement('div');
                    connector.className += 'connector';
                    skillNode.appendChild(connector);
                    console.log(skillNode);
                    
                    
                }
                
                levelDiv.appendChild(skillNode);

            });

            container.appendChild(levelDiv)
        });
    }

    update(skillId, updates) {

    }

    on(event, callback) {

    }

}
