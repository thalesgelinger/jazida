import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, } from "drizzle-orm/sqlite-core";

export const load = sqliteTable("loads", {
    id: text("id").primaryKey(),
    clientId: integer("client_id").notNull(),
    plateId: integer("plate_id").notNull(),
    materialId: integer("material_id").notNull(),
    quantity: text("quantity").notNull(),
    paymentMethod: text("payment_method").notNull(),
    signaturePath: text("signature_path").notNull(),
    createdAt: text('created_at')
        .notNull()
        .default(sql`(current_timestamp)`)
})
