import { MigrationInterface, QueryRunner } from "typeorm";

export class Brand1758181403801 implements MigrationInterface {
    name = 'Brand1758181403801'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brands\` ADD \`is_deleted\` tinyint NOT NULL DEFAULT 0`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`brands\` DROP COLUMN \`is_deleted\``);
    }

}
