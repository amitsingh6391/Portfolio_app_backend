// src/domain/usecases/CreateProjectUseCase.js

const Project = require('../entities/project');

class UpdateProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(id, title, description, imageUrl, projectUrl) {

        const updatedProject = new Project(
            id,
            title,
            description,
            imageUrl,
            projectUrl,

        )
        return this.projectRepository.updateProject(updatedProject);
    }
}

module.exports = UpdateProjectUseCase;
