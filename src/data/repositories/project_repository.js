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

    async getProjectsByFilter(filter) {
        console.log(`this is here in repo ....${filter} ${JSON.stringify(filter)}`)
        const query = 'SELECT * FROM projects WHERE projectCategory = ?';
        const params = [filter];
        const [rows] = await mysqlDataSource.executeSelectQuery(query, params);

        return rows;

    }

    async createProject(project) {
        const { title, description, imageUrl, id, projectUrl, projectCategory } = project;
        console.log(`this is creating ....${project} ${JSON.stringify(project)}`)
        const query = 'INSERT INTO projects (title, description, imageUrl, id, projectUrl,projectCategory) VALUES (?, ?, ?, ?,?,?)';
        const params = [title, description, imageUrl, id, projectUrl, projectCategory];
        const [result] = await mysqlDataSource.executeModificationQuery(query, params);

        return result;
    }

    async updateProject(project) {
        const { id, title, description, imageUrl, projectUrl, projectCategory } = project;
        const query = 'UPDATE projects SET title = ?, description = ?, imageUrl = ?,  projectUrl = ? , projectCategory = ? WHERE id = ?';
        const params = [title, description, imageUrl, projectUrl, projectCategory, id];
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