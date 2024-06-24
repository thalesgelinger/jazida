import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const load = sqliteTable("loads", {
    id: text("id").primaryKey(),
    client: text("client").notNull(),
    plate: text("plate").notNull(),
    material: text("material").notNull(),
    quantity: text("quantity").notNull(),
    paymentMethod: text("payment_method").notNull(),
    signaturePath: text("signature_path").notNull()
})
