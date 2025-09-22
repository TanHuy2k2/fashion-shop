import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1758275268299 implements MigrationInterface {
    name = 'Product1758275268299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`description\``);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`description\` varchar(255) NOT NULL`);
    }

}
