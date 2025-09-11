import { MigrationInterface, QueryRunner } from 'typeorm';

export class User1757576919610 implements MigrationInterface {
  name = 'User1757576919610';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`first_name\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`full_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`image\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`image\``);
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`full_name\``);
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`last_name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`first_name\` varchar(255) NOT NULL`,
    );
  }
}
