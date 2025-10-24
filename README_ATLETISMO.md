# 🏃‍♂️ App de Atletismo - Running & Jogging Tracker

Una aplicación completa de seguimiento en tiempo real para corredores y atletas, centrada en la Universidad Cooperativa de Colombia (Pandiaco, Pasto).

## 🚀 Funcionalidades Principales

### 1. **Tracking GPS en Tiempo Real**
- 📍 Seguimiento automático de tu ubicación mientras corres
- 🗺️ El mapa te sigue en tiempo real
- 📏 Distancia acumulada en vivo
- ⏱️ Cronómetro preciso

### 2. **Rutas Sugeridas para Correr**
- **Circuito Universidad - Pandiaco**: 2.5 km (Fácil) - 15 min
- **Ruta al Centro Histórico**: 5.0 km (Moderado) - 30 min
- **Circuito Parque de la Salud**: 3.5 km (Fácil) - 20 min
- **Ruta Larga - Terminal**: 7.5 km (Difícil) - 45 min

### 3. **Sesión de Entrenamiento**
- ▶️ Iniciar/Pausar/Reanudar/Terminar
- ⏱️ Tiempo transcurrido en tiempo real
- 📊 Velocidad actual y promedio
- 📈 Distancia recorrida en vivo

### 4. **Seguimiento de Progreso**
- 🎯 Objetivos diarios personalizables
- 📊 Estadísticas acumuladas del día
- 🔥 Calorías quemadas
- 💾 Persistencia en localStorage

## 🎯 Cómo Usar

### Modo 1: Sesión Libre
1. **Abre la app** en `/mapa`
2. **Haz clic en "COMENZAR"** para iniciar tracking
3. **Comienza a correr** - La app te seguirá automáticamente
4. **Mira tus estadísticas** en tiempo real
5. **Pausa** si necesitas descansar
6. **Termina** cuando acabes tu entrenamiento

### Modo 2: Rutas Sugeridas
1. **Selecciona una ruta** de las sugeridas
2. **Haz clic en "COMENZAR"** 
3. **Sigue la ruta** en el mapa
4. **Termina** al completar

## 📱 Características Técnicas

### Tracking GPS
- **Alta precisión**: `enableHighAccuracy: true`
- **Actualización continua**: `watchPosition`
- **Filtrado inteligente**: Solo suma distancia si el movimiento es > 2 metros
- **Cálculo de velocidad**: En tiempo real usando distancia/tiempo

### Persistencia
- **localStorage**: Guarda progreso diario
- **Sesión activa**: Se mantiene entre recargas
- **Historial**: Acumula todas las sesiones del día

### Visualización
- **Línea verde**: Muestra tu recorrido en tiempo real
- **Pastilla naranja**: Distancia actual visible
- **Cronómetro grande**: Tiempo transcurrido
- **Estadísticas en vivo**: Velocidad, distancia, calorías

## 🎨 Interfaz

### Colores
- **Verde**: Tracking activo, botón iniciar
- **Azul**: Sesión activa, rutas
- **Naranja**: Distancia, alertas
- **Amarillo**: Pausado
- **Rojo**: Terminar sesión

### Componentes
```
RunningSessionControl: Control de sesión
RunningRoutes: Rutas sugeridas
ProgressCard: Progreso diario
StatsCard: Estadísticas del día
MapView: Mapa con tracking
```

## 📊 Datos Capturados

Por cada sesión:
- ✅ Distancia total (metros/km)
- ✅ Tiempo transcurrido (segundos/minutos)
- ✅ Velocidad actual (km/h)
- ✅ Velocidad promedio (km/h)
- ✅ Posiciones GPS (array de coordenadas)
- ✅ Calorías estimadas

## 🏆 Progreso Diario

### Objetivo
- Configurable (por defecto: 3000 metros)
- Barra de progreso visual
- Muestra distancia restante

### Acumulación
- Suma todas las sesiones del día
- Persiste en localStorage
- Reseteable manualmente

## 🛠️ Tecnologías

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Estilos
- **Leaflet** - Mapas interactivos
- **Geolocation API** - GPS tracking
- **localStorage** - Persistencia

## 📍 Ubicación Base

Universidad Cooperativa de Colombia
- **Dirección**: Pandiaco, Pasto, Nariño
- **Coordenadas**: `[1.2098, -77.2765]`
- **Cerca de**: Universidad de Nariño

## 🚦 Cómo Ejecutar

```bash
cd map
npm run dev
```

Abre `http://localhost:3000/mapa`

## 🎯 Casos de Uso

### Atleta Principiante
1. Selecciona "Circuito Universidad - Pandiaco" (Fácil)
2. Inicia sesión
3. Sigue la ruta
4. Completa el objetivo diario

### Corredor Experimentado
1. Selecciona "Ruta Larga - Terminal" (Difícil)
2. Inicia sesión
3. Monitorea velocidad y distancia
4. Supera objetivos personalizados

### Entrenamiento Libre
1. Inicia sesión sin ruta
2. Corre donde quieras
3. La app registra todo automáticamente
4. Revisa estadísticas al finalizar

## 🔒 Privacidad

- ✅ Datos almacenados solo en tu dispositivo
- ✅ No se envía información a servidores
- ✅ Control total sobre tus datos
- ✅ Puedes resetear en cualquier momento

## 🎉 Características Únicas

- 🌍 **Seguimiento en tiempo real** sin importar dónde estés
- 📊 **Estadísticas instantáneas** mientras corres
- 🎯 **Rutas locales** diseñadas para Pasto
- 💪 **Enfocado en atletismo** y running
- 🚀 **Sin distracciones** - Solo lo esencial para correr

---

**¡Hecho para corredores, por corredores!** 🏃‍♂️💨
