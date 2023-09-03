const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

//Depedencies

const ProjectRepositoryImpl = require('./data/repositories/project_repository');
const GetAllProjectsUseCase = require('./domain/usecases/getall_projects_usecase');
const CreateProjectUseCase = require('./domain/usecases/create_project_usecase');
const UpdateProjectUseCase = require('./domain/usecases/update_project_usecase');
const DeleteProjectByIdUseCase = require('./domain/usecases/delete_project_by_id_usecase');

const ProjectController = require('./controllers/project_controller');
const projectRoutes = require('./routes/project_routes');


//Intialize project Routes

const projectRepository = new ProjectRepositoryImpl();
const getAllProjectsUseCase = new GetAllProjectsUseCase(projectRepository);
const createProjectUseCase = new CreateProjectUseCase(projectRepository);
const updateProjectUseCase = new UpdateProjectUseCase(projectRepository);
const deleteProjectByIdUseCase = new DeleteProjectByIdUseCase(projectRepository);




const projectController = new ProjectController(getAllProjectsUseCase, createProjectUseCase, updateProjectUseCase, deleteProjectByIdUseCase);

const PORT = process.env.PORT || 4000;


app.use('/projects', projectRoutes({ projectController }));


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
