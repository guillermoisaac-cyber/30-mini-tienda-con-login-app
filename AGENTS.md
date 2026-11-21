# IA — App Mini Tienda

- Trabaja exclusivamente dentro de este repositorio. Prohibido leer `.env*`, claves, credenciales, keystores.
- Pide autorización antes de cualquier push, despliegue, instalación global o acción externa.
- Stack: Expo, React Native, TypeScript estricto, Expo Router, SQLite, SecureStore.
- `app/` navegación, `src/db` migraciones, `src/repositories` SQL parametrizado, `src/services` lógica, `src/api` HTTP, `src/sensors` sensores, `src/components` componentes accesibles.
- No uses Firebase SDK cliente ni incluyas `firebaseConfig` o claves Firebase. Solo `EXPO_PUBLIC_API_URL` pública.
- Tokens exclusivamente en SecureStore. Cada gesto tendrá botón alternativo con accessibilityLabel.
- Ejecuta `npm run check` y `npm test` antes de confirmar resultados; documenta evidencia en `ia/bitacora.md`.
- Las instrucciones no aíslan al agente por sí solas; configura permisos reales en el entorno de ejecución.
