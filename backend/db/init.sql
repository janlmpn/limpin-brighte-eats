DROP DATABASE IF EXISTS `brighte-eats`;

CREATE DATABASE `brighte-eats`;

USE `brighte-eats`;

CREATE TABLE `lead` (
  `id` varchar(50) NOT NULL,
  `name` varchar(300) DEFAULT NULL,
  `email` varchar(300) UNIQUE NOT NULL,
  `mobile` varchar(100) DEFAULT NULL,
  `postcode` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `service` (
  `id` varchar(50) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `lead_service` (
  `lead_id` VARCHAR(50) NOT NULL,
  `service_id` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`lead_id`, `service_id`),
  INDEX `service_id_idx` (`service_id` ASC),
  CONSTRAINT `lead_id`
    FOREIGN KEY (`lead_id`)
    REFERENCES `lead` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `service_id`
    FOREIGN KEY (`service_id`)
    REFERENCES `service` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


INSERT INTO `lead` (`id`, `name`, `email`, `mobile`, `postcode`) VALUES ('ff348451-6cc4-446f-94e4-84fb05338891', 'john limpin', 'john.limpin@gmail.com', '+639778111203', '2000');
INSERT INTO `lead` (`id`, `name`, `email`, `mobile`, `postcode`) VALUES ('bb768f1b-f1be-48f6-b2fa-5c6e4b18ed54', 'cora limpin', 'corazon.limpin@gmail.com', '+639228467188', '2023');

INSERT INTO `service`(`id`,`name`)
VALUES
('bc50a56f-f3ba-4f65-864d-e5b813740802','delivery'),
('e4de9a6e-45d6-4cef-b619-995d54d1ecbb','pick-up'),
('8929eb38-6424-495d-a5c3-d2175c34ad48','payment');

INSERT INTO `lead_service` (`lead_id`, `service_id`) VALUES ('ff348451-6cc4-446f-94e4-84fb05338891', 'bc50a56f-f3ba-4f65-864d-e5b813740802');
INSERT INTO `lead_service` (`lead_id`, `service_id`) VALUES ('ff348451-6cc4-446f-94e4-84fb05338891', '8929eb38-6424-495d-a5c3-d2175c34ad48');
INSERT INTO `lead_service` (`lead_id`, `service_id`) VALUES ('bb768f1b-f1be-48f6-b2fa-5c6e4b18ed54', 'bc50a56f-f3ba-4f65-864d-e5b813740802');
INSERT INTO `lead_service` (`lead_id`, `service_id`) VALUES ('bb768f1b-f1be-48f6-b2fa-5c6e4b18ed54', 'e4de9a6e-45d6-4cef-b619-995d54d1ecbb');
INSERT INTO `lead_service` (`lead_id`, `service_id`) VALUES ('bb768f1b-f1be-48f6-b2fa-5c6e4b18ed54', '8929eb38-6424-495d-a5c3-d2175c34ad48');

