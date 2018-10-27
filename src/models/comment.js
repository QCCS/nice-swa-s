//评论模型
import db from '../utils/sequelizeQuery';

const {sequelize, Sequelize} = db;
let comment = sequelize.define('comment',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                // This is a reference to another model
                model: 'user',
                // This is the column name of the referenced model
                key: 'id',
            }
        },
        comment: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
    },
    {
        freezeTableName: true // Model 对应的表名将与model名相同
    }
);
export default comment;
