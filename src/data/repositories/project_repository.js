const ProjectRepository = require("../../domain/repositories/project_repository");
const pool = require('../../config/database');
const mysqlDataSource = require('../datasources/project_data_source');

class ProjectRepositoryImpl extends ProjectRepository {

    async getAllProjects() {

        const query = 'SELECT * FROM projects';
        const [rows] = await mysqlDataSource.executeSelectQuery(query);

        return rows;
    }

    async getProjectById(id) {
        const query = 'SELECT * FROM projects WHERE id = ?';
        const params = [id];
        const [rows] = await mysqlDataSource.executeSelectQuery(query, params);

        return rows[0];

    }

    async createProject(project) {
        const { title, description, imageUrl, id, projectUrl } = project;
        console.log(`this is creating ....${project} ${JSON.stringify(project)}`)
        const query = 'INSERT INTO projects (title, description, imageUrl, id, projectUrl) VALUES (?, ?, ?, ?,?)';
        const params = [title, description, imageUrl, id, projectUrl];
        const [result] = await mysqlDataSource.executeModificationQuery(query, params);

        return result;
    }

    async updateProject(project) {
        const { id, title, description, imageUrl, projectUrl } = project;
        const query = 'UPDATE projects SET title = ?, description = ?, imageUrl = ?,  projectUrl = ? WHERE id = ?';
        const params = [title, description, imageUrl, projectUrl, id];
        const [result] = await mysqlDataSource.executeModificationQuery(query, params);

        return result;
    }
    async deleteProject(id) {
        const query = 'DELETE FROM projects WHERE id = ?';
        const params = [id];
        const [result] = await mysqlDataSource.executeModificationQuery(query, params);

        return result;
    }
}

module.exports = ProjectRepositoryImpl;