class GetAllProjectsUseCase {

    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute() {
        return this.projectRepository.getAllProjects()
    }
}

module.exports = GetAllProjectsUseCase;