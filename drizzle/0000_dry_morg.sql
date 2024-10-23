CREATE TABLE `loads` (
	`id` text PRIMARY KEY NOT NULL,
	`client_id` integer NOT NULL,
	`plate_id` integer NOT NULL,
	`material_id` integer NOT NULL,
	`quantity` text NOT NULL,
	`payment_method` text NOT NULL,
	`signature_path` text NOT NULL
);
