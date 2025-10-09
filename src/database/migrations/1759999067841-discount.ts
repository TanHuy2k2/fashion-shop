import { MigrationInterface, QueryRunner } from "typeorm";

export class Discount1759999067841 implements MigrationInterface {
    name = 'Discount1759999067841'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_discount\` DROP FOREIGN KEY \`FK_4bb3cb556ed243cb7141fd6529b\``);
        await queryRunner.query(`ALTER TABLE \`product_discount\` CHANGE \`product_detail_id\` \`product_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`discounts\` CHANGE \`scope\` \`scope\` enum ('all', 'product', 'category') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_discount\` ADD CONSTRAINT \`FK_87ba7804f51af91e9fb0d84c5dd\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_discount\` DROP FOREIGN KEY \`FK_87ba7804f51af91e9fb0d84c5dd\``);
        await queryRunner.query(`ALTER TABLE \`discounts\` CHANGE \`scope\` \`scope\` enum ('all', 'product') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`product_discount\` CHANGE \`product_id\` \`product_detail_id\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`product_discount\` ADD CONSTRAINT \`FK_4bb3cb556ed243cb7141fd6529b\` FOREIGN KEY (\`product_detail_id\`) REFERENCES \`product_detail\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
