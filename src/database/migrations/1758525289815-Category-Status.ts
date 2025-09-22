import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryStatus1758525289815 implements MigrationInterface {
    name = 'CategoryStatus1758525289815'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`is_active\` \`status\` tinyint NOT NULL DEFAULT '1'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`categories\` CHANGE \`status\` \`is_active\` tinyint NOT NULL DEFAULT '1'`);
    }

}
