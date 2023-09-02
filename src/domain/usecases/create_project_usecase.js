// src/domain/usecases/CreateProjectUseCase.js

const Project = require('../entities/project');

class CreateProjectUseCase {
    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    async execute(id, title, description, imageUrl) {

        const newProject = new Project(
            id,
            title,
            description,
            imageUrl,

        )
        return this.projectRepository.createProject(newProject);
    }
}

module.exports = CreateProjectUseCase;
