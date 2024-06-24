CREATE TABLE `loads` (
	`id` text PRIMARY KEY NOT NULL,
	`client` text NOT NULL,
	`plate` text NOT NULL,
	`material` text NOT NULL,
	`quantity` text NOT NULL,
	`payment_method` text NOT NULL,
	`signature_path` text NOT NULL
);
