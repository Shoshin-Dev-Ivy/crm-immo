<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: cleaned for PostGIS safety
 */
final class Version20260426154124 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Remove status, latitude, longitude and adjust name length';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE lead DROP status');
        $this->addSql('ALTER TABLE lead DROP latitude');
        $this->addSql('ALTER TABLE lead DROP longitude');
        $this->addSql('ALTER TABLE lead ALTER name TYPE VARCHAR(150)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE lead ADD status VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE lead ADD latitude DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE lead ADD longitude DOUBLE PRECISION DEFAULT NULL');
        $this->addSql('ALTER TABLE lead ALTER name TYPE VARCHAR(255)');
    }
}
