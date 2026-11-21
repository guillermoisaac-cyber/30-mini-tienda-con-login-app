import * as SQLite from 'expo-sqlite';
let handle:Promise<SQLite.SQLiteDatabase>|undefined;
export function database(){if(!handle)handle=(async()=>{const db=await SQLite.openDatabaseAsync('mini_tienda.db');await db.execAsync(`PRAGMA journal_mode=WAL;
CREATE TABLE IF NOT EXISTS producto_cache(id TEXT PRIMARY KEY,nombre TEXT NOT NULL,precio_centavos INTEGER NOT NULL,imagen_url TEXT,categoria TEXT NOT NULL,stock INTEGER NOT NULL,remote_id TEXT,updated_at TEXT,deleted INTEGER DEFAULT 0,pending INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS favorito(producto_id TEXT PRIMARY KEY,remote_id TEXT,updated_at TEXT,deleted INTEGER DEFAULT 0,pending INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS carrito_item(producto_id TEXT PRIMARY KEY,cantidad INTEGER NOT NULL CHECK(cantidad BETWEEN 1 AND 10),remote_id TEXT,updated_at TEXT,deleted INTEGER DEFAULT 0,pending INTEGER DEFAULT 0);
CREATE TABLE IF NOT EXISTS meta(clave TEXT PRIMARY KEY,valor TEXT);`);return db})();return handle}
