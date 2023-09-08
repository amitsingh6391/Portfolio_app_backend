
class ProjectController {

    constructor(
        getAllProjectsUseCase,
        createProjectUseCase, updateProjectUseCase,
        deleteProjectUseCase, getProjectsByFilterUsecase
    ) {
        this.getAllProjectsUseCase = getAllProjectsUseCase;
        this.createProjectUseCase = createProjectUseCase;
        this.updateProjectUseCase = updateProjectUseCase;
        this.deleteProjectUseCase = deleteProjectUseCase;
        this.getProjectsByFilterUsecase = getProjectsByFilterUsecase;
        console.log(`this is value : and this is here....${JSON.stringify(this)}`);
    }

    async getAllProjects(req, res) {

        try {
            const projects = await this.getAllProjectsUseCase.execute();
            res.json(projects);

        } catch (error) {

            res.status(500).json({ error: `Internal server error... ${error}` });

        }


    }

    async projectsByFilter(req, res) {

        const { projectCategory } = req.query;

        console.log(`this is filter controller :${JSON.stringify(projectCategory)}`);

        if (!projectCategory) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        try {
            const projects = await this.getProjectsByFilterUsecase.execute(projectCategory);
            res.json(projects);
        } catch (error) {
            res.status(500).json({ error: `Internal server error : ${error}` });
        }

    }

    async createProject(req, res) {

        const { title, description, imageUrl, id, projectUrl, projectCategory } = req.body;

        if (!title || !description || !imageUrl || !id || !projectUrl || !projectCategory) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const projectId = await this.createProjectUseCase.execute(id, title, description, imageUrl, projectUrl, projectCategory);
            res.status(201).json({ id: projectId });
        } catch (error) {
            res.status(500).json({ error: `Internal server error : ${error}` });
        }
    }

    async updateProject(req, res) {

        const { title, description, imageUrl, id, projectUrl, projectCategory } = req.body;

        if (!title || !description || !imageUrl || !id || !projectUrl || !projectCategory) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        try {
            const projectId = await this.updateProjectUseCase.execute(id, title, description, imageUrl, projectUrl, projectCategory);
            res.status(201).json({ id: projectId });
        } catch (error) {
            console.log(`${error}`)
            res.status(500).json({ error: 'Internal server error', error });
        }
    }

    async deleteProject(req, res) {

        const { id } = req.body;

        if (!id) {
            return res.status(400).json({ error: 'Id is required' });
        }

        try {
            const projectId = await this.deleteProjectUseCase.execute(id);
            res.status(201).json({ id: projectId });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }


}

module.exports = ProjectController;