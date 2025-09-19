import { MigrationInterface, QueryRunner } from "typeorm";

export class DeletedColumn1758253775246 implements MigrationInterface {
    name = 'DeletedColumn1758253775246'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shipping\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`brands\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`categories\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`sub-category\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`reviews\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`sizes\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`colors\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`discounts\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_discount\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_item\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`order_detial\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`deleted_at\` datetime(6) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`order_detial\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`product_item\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`product_discount\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`discounts\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`colors\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`sizes\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`products\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`reviews\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`sub-category\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`categories\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`brands\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP COLUMN \`deleted_at\``);
        await queryRunner.query(`ALTER TABLE \`shipping\` DROP COLUMN \`deleted_at\``);
    }

}
