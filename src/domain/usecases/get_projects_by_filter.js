class GetProjectsByFilterUsecase {

    constructor(projectRepository) {
        this.projectRepository = projectRepository;
    }

    execute(filter) {
        return this.projectRepository.getProjectsByFilter(filter)
    }
}

module.exports = GetProjectsByFilterUsecase;