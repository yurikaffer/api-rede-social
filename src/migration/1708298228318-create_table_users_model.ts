import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableUsersModel1708298228318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE users_model (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(120) NOT NULL,
                email VARCHAR(120) NOT NULL,
                password VARCHAR(120) NOT NULL,
                userName VARCHAR(120) NOT NULL,
                biography VARCHAR(85),
                filePath VARCHAR(255),
                createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE users_model;
        `)
    }

}
