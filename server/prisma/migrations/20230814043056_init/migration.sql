-- CreateTable
CREATE TABLE `Outcome` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `outcomeName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `projectID` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `activityName` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `outcomeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DetailBudget` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `particular` VARCHAR(191) NOT NULL,
    `costPerUnit` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `perUnitDescription` VARCHAR(191) NOT NULL,
    `unit` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `activityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `alternatePhoneNumber` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `nid` VARCHAR(191) NOT NULL,
    `birthday` VARCHAR(191) NOT NULL,
    `maritalStatus` VARCHAR(191) NOT NULL,
    `spouseName` VARCHAR(191) NULL,
    `spouseEmployer` VARCHAR(191) NOT NULL,
    `designation` VARCHAR(191) NOT NULL,
    `employeeId` VARCHAR(191) NOT NULL,
    `supervisor` VARCHAR(191) NOT NULL,
    `department` VARCHAR(191) NOT NULL,
    `workLocation` VARCHAR(191) NOT NULL,
    `workEmail` VARCHAR(191) NOT NULL,
    `workPhone` VARCHAR(191) NOT NULL,
    `cellPhone` VARCHAR(191) NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `salary` VARCHAR(191) NULL,
    `emergencyContactPersonsFullName` VARCHAR(191) NOT NULL,
    `emergencyContactPersonsAddress` VARCHAR(191) NOT NULL,
    `emergencyContactPersonsPrimaryPhone` VARCHAR(191) NOT NULL,
    `emergencyContactPersonsAlternatePhoene` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Employee_phoneNumber_key`(`phoneNumber`),
    UNIQUE INDEX `Employee_alternatePhoneNumber_key`(`alternatePhoneNumber`),
    UNIQUE INDEX `Employee_email_key`(`email`),
    UNIQUE INDEX `Employee_nid_key`(`nid`),
    UNIQUE INDEX `Employee_employeeId_key`(`employeeId`),
    UNIQUE INDEX `Employee_workEmail_key`(`workEmail`),
    UNIQUE INDEX `Employee_workPhone_key`(`workPhone`),
    UNIQUE INDEX `Employee_cellPhone_key`(`cellPhone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Outcome` ADD CONSTRAINT `Outcome_projectID_fkey` FOREIGN KEY (`projectID`) REFERENCES `Projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `Activity_outcomeId_fkey` FOREIGN KEY (`outcomeId`) REFERENCES `Outcome`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DetailBudget` ADD CONSTRAINT `DetailBudget_activityId_fkey` FOREIGN KEY (`activityId`) REFERENCES `Activity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
