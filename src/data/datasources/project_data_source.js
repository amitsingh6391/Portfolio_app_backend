

const pool = require('../../config/database');

class ProjectDataSource {

    async executeSelectQuery(query, params) {
        return await pool.query(query, params);
    }

    async executeModificationQuery(query, params) {
        return await pool.execute(query, params);
    }



}

module.exports = new ProjectDataSource();
