import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableFollowersModel1708298307160 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE followers_model (
                id INT AUTO_INCREMENT PRIMARY KEY,
                follower_user_id INT,
                followed_user_id INT,
                FOREIGN KEY (follower_user_id) REFERENCES users_model(id) ON DELETE CASCADE,
                FOREIGN KEY (followed_user_id) REFERENCES users_model(id) ON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            DROP TABLE followers_model;
        `)
    }

}
