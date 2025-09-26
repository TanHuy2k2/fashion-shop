import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderGuest1758809246961 implements MigrationInterface {
    name = 'OrderGuest1758809246961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`guest_phone\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`guest_phone\` varchar(20) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`guest_phone\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`guest_phone\` varchar(255) NULL`);
    }

}
