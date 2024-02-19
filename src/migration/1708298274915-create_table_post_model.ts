import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTablePostModel1708298274915 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE post_model (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content TEXT,
                imgURL VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                user_id INT,
                FOREIGN KEY (user_id) REFERENCES users_model(id) ON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE post_model;
        `)
    }

}
