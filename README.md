# Mini Tienda — Expo

Expo + React Native + TypeScript + Expo Router, SQLite offline, SecureStore, gestos, acelerómetro, biometría y ubicación opcional.

## Iniciar

1. Instalar Node 22 y dependencias: `npm install`.
2. Crear `.env` local (no subir): `EXPO_PUBLIC_API_URL=https://TU-API.vercel.app`. **Solo** URL pública, sin claves Firebase.
3. `npm run check`, `npm test`, `npx expo start` y abrir Expo Go compatible con SDK de este proyecto; para características nativas, usa development build/dispositivo físico.
4. Registro/login desde la API; el catálogo se descarga y persiste en SQLite. Sin conexión muestra productos ya guardados; carrito y favoritos se mantienen.
5. Swipe izquierdo en carrito elimina (también botón), doble toque en foto agrega favorito (también botón), pinch/pan permite zoom/mover (botón para restablecer). Activar sacudida permite vaciar con confirmación, o botón convencional. Checkout usa biometría o confirmación alternativa y dirección manual o ubicación.

## APK Android

Instala e inicia sesión en EAS CLI (`npx eas-cli login`), configura el proyecto (`npx eas-cli build:configure`) y solicita `npx eas-cli build --platform android --profile preview`. El enlace APK lo entrega EAS tras terminar. No hay APK precompilado en este ZIP.

## Arquitectura

- `app/` pantallas/rutas y guardas.
- `src/db/` SQLite.
- `src/repositories/` SQL parametrizado.
- `src/services/` sesión y sincronización.
- `src/api/` fetch con renovación una sola vez al 401.
- `src/sensors/` acelerómetro.
- `src/components/` UI accesible.

## Pruebas

`npm test` prueba SecureStore, lógica pura de movimiento y redirección. En físico comprobar biometría/permisos; un emulador puede no incluir sensores. Registrar capturas y bitácora en `ia/`.

## Notas

El pago es simulado. La API decide precios y stock. Para completar entrega se requieren cuentas propias de Firebase, Vercel y Expo, configuración de reglas, despliegue y compilación del APK. Los servicios no se configuran solos.
