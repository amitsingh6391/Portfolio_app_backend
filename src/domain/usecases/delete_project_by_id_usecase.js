class DeleteProjectByIdUseCase {

    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }
    execute(id) {
        return this.projectRepository.deleteProject(id)
    }
}

module.exports = DeleteProjectByIdUseCase;