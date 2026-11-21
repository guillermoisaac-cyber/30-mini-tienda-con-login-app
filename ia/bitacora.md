# Bitácora IA

| Propósito | Evidencia | Validación | Decisión |
|---|---|---|---|
| Limitar exposición de credenciales | AGENTS.md, .gitignore, .githooks | Probar bloqueo de `.pem` preparado y referencias a secretos | App solo utiliza URL pública de API |

Registrar resultados reales, capturas y decisiones durante el desarrollo.

## Ejecuciones verificadas en entorno de desarrollo

- `npm run check`: aprobado (TypeScript).
- `npm test -- --runInBand`: 5 pruebas aprobadas (SecureStore, sensor puro y ruta protegida).
- `npx expo export --platform android`: empaquetado Metro Android completado; **no equivale a APK ni prueba funcional en teléfono**.
- Prueba negativa: archivo ficticio `prueba.pem` preparado con `git add -f` → `Contenido prohibido: ['prueba.pem']`.
- Tras retirarlo del índice: `PASS: sin credenciales ni firebaseConfig en la app`.
- Pruebas en equipo físico, permisos/sandbox de IA y APK EAS: **pendientes**.
