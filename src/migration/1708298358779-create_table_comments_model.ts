import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableCommentsModel1708298358779 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE comments_model (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content TEXT,
                user_id INT,
                post_id INT,
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users_model(id) ON DELETE CASCADE,
                FOREIGN KEY (post_id) REFERENCES post_model(id) ON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE comments_model;
        `)
    }

}
