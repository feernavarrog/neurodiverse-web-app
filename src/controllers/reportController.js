const database = require('../services/database');

exports.getReportConditions = async (req, res) => {
    try {
        const sql = `
            SELECT 
                c.condition_name AS "Condición",
                COALESCE(
                    (SELECT COUNT(DISTINCT uc.user_id)
                     FROM user_condition uc
                     JOIN app_user u ON uc.user_id = u.user_id
                     WHERE uc.condition_id = c.condition_id
                     AND u.active = 1) 
                    / NULLIF((SELECT COUNT(*) FROM app_user WHERE user_role = 'customer' AND active = 1), 0), 0
                ) AS "Porcentaje"
            FROM condition c
        `;

        const result = await database.executeQuery(sql);
        res.json({ rows: result.rows });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
