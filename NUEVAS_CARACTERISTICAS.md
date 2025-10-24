# 🎉 Nuevas Características Implementadas

## 1. 👤 Perfil de Usuario Personalizado

### ✨ Funcionalidades
- **Información Personal**:
  - Nombre personalizado
  - Peso (kg) - usado para cálculos precisos de calorías
  - Altura (cm)
  - Edad
  - Género (Masculino, Femenino, Otro)

- **Preferencias**:
  - Nivel de experiencia: 🐣 Principiante, 🏃 Intermedio, 🏆 Avanzado
  - Sistema de unidades: 📏 Métrico (km, m) o 📐 Imperial (mi, ft)

- **Metas Personalizables**:
  - Pasos diarios objetivo
  - Distancia diaria objetivo (metros)
  - Número de carreras semanales

### 🔧 Cómo Usar
1. Toca el icono "👤 Perfil" en la barra de navegación inferior
2. Completa tu información personal
3. Selecciona tu nivel de experiencia
4. Configura tus metas
5. Toca "💾 Guardar Perfil"

### 💡 Beneficios
- **Cálculos precisos**: Las calorías se calculan basándose en tu peso real
- **Experiencia personalizada**: Los multiplicadores de calorías se ajustan según tu nivel
- **Unidades preferidas**: Ve las distancias en tu sistema de medida favorito

---

## 2. 🌙 Modo Oscuro

### ✨ Funcionalidades
- **Toggle visual**: Interruptor elegante ☀️/🌙 en la esquina superior derecha
- **Persistencia**: Tu preferencia se guarda automáticamente
- **Detección automática**: Si no has elegido, usa la preferencia del sistema
- **Transiciones suaves**: Cambio animado entre temas
- **Mapa adaptado**: Los tiles del mapa se ajustan automáticamente al modo oscuro

### 🎨 Colores
- **Modo Claro**: Fondo naranja vibrante, tarjeta blanca
- **Modo Oscuro**: Fondo gris oscuro elegante, tarjeta gris

### 🔧 Cómo Usar
1. Busca el toggle ☀️/🌙 en la parte superior derecha
2. Toca para cambiar entre modo claro y oscuro
3. La preferencia se guarda automáticamente

### 💡 Beneficios
- **Ahorro de batería**: Especialmente en pantallas OLED/AMOLED
- **Menos fatiga visual**: Ideal para entrenar de noche o en ambientes oscuros
- **Estilo profesional**: Apariencia moderna y elegante

---

## 3. 📱 PWA (Progressive Web App)

### ✨ Funcionalidades
- **Instalable**: Agrega la app a tu pantalla de inicio como una app nativa
- **Funciona offline**: Accede a funciones básicas sin conexión
- **Service Worker**: Caché inteligente para carga rápida
- **Iconos personalizados**: Logo runner naranja en 192x192 y 512x512
- **Manifest completo**: Metadatos para tiendas de apps

### 🔧 Cómo Instalar

#### En Android (Chrome/Edge)
1. Abre la app en el navegador
2. Verás un banner "📱 Instalar RunTracker"
3. Toca "Instalar"
4. La app aparecerá en tu pantalla de inicio
5. Ábrela como cualquier otra app

#### En iOS (Safari)
1. Abre la app en Safari
2. Toca el botón "Compartir" (cuadro con flecha hacia arriba)
3. Desliza hacia abajo y toca "Agregar a pantalla de inicio"
4. Toca "Agregar"

#### En Desktop (Chrome/Edge)
1. Busca el icono "+" en la barra de direcciones
2. Clic en "Instalar RunTracker"
3. La app se abrirá en su propia ventana

### 💡 Beneficios
- **Experiencia nativa**: Se siente como una app descargada de la tienda
- **Acceso rápido**: Icono en tu pantalla de inicio
- **Sin tiendas**: No necesitas Google Play o App Store
- **Actualizaciones automáticas**: Siempre tienes la última versión
- **Menos almacenamiento**: Más liviana que una app nativa

---

## 📊 Mejoras en Cálculos

### Calorías Precisas
Ahora las calorías se calculan usando:
- ✅ **Tu peso real** (no un promedio genérico)
- ✅ **Tu nivel de experiencia**:
  - Principiante: 0.8 × peso × distancia(km)
  - Intermedio: 0.85 × peso × distancia(km)
  - Avanzado: 0.9 × peso × distancia(km)

### Ejemplo
**Usuario**: Juan, 75kg, Intermedio
**Carrera**: 5km

**Calorías quemadas**: 75 × 5 × 0.85 = **319 calorías**

Antes usaba un peso genérico de 70kg = 297 calorías (menos preciso)

---

## 🎯 Persistencia de Datos

Todos los datos se guardan en tu dispositivo:
- ✅ Perfil de usuario
- ✅ Preferencia de tema (claro/oscuro)
- ✅ Historial de sesiones
- ✅ Progreso diario
- ✅ Metas personalizadas

**Privacidad total**: Nada se envía a servidores externos.

---

## 🚀 Próximas Mejoras Sugeridas

### En desarrollo
- [ ] Exportar sesiones como GPX (compatible con Strava)
- [ ] Exportar datos como CSV
- [ ] Sistema de logros y medallas
- [ ] Notificaciones de voz durante la carrera
- [ ] Gráficos de velocidad a lo largo de la ruta
- [ ] Multi-idioma (Español/Inglés)
- [ ] Integración con dispositivos Bluetooth
- [ ] Planes de entrenamiento predefinidos

---

## 📝 Notas Técnicas

### Stack Tecnológico
- **Next.js 16** - Framework React con SSR
- **TypeScript** - Type safety completo
- **Tailwind CSS 4** - Estilos con modo oscuro nativo
- **Service Workers** - PWA y caché offline
- **LocalStorage** - Persistencia de datos
- **Geolocation API** - Tracking GPS en tiempo real

### Compatibilidad
- ✅ Chrome/Edge (Desktop y Mobile)
- ✅ Safari (iOS y macOS)
- ✅ Firefox (Desktop y Mobile)
- ✅ Samsung Internet
- ⚠️ Requiere HTTPS para PWA (funciona en localhost)

---

**¡Disfruta de tu nueva app profesional de atletismo!** 🏃‍♂️💨

