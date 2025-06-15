# collabManager

## 📘 Descripción General

**collabManager** es una aplicación colaborativa orientada a optimizar la organización, planificación y seguimiento de proyectos dentro de equipos de trabajo. Permite la creación, asignación y control de tareas en tiempo real, promoviendo una comunicación fluida y una colaboración eficiente. Su interfaz intuitiva y funcionalidades integradas facilitan la productividad, la centralización de la información del proyecto y una mejor toma de decisiones.

Está construida con una arquitectura moderna:

* **Frontend:** React.js (interfaz dinámica e interactiva)
* **Backend:** Spring Boot (gestión de lógica de negocio y datos)

El sistema puede desplegarse localmente o en entornos en la nube.

---

## 📁 Estructura del Proyecto

```bash
collabManager/
├── frontend/           # Código fuente de la aplicación React.js
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/            # Código fuente de la aplicación Spring Boot
│   ├── src/
│   ├── pom.xml
│   └── ...
├── README.md           # Documentación general del proyecto
└── .gitignore
```

---

## ⚙️ Requisitos Previos

### Frontend (React.js)

* **Node.js** (v14 o superior) – [nodejs.org](https://nodejs.org/)
* **npm** o **Yarn**

### Backend (Spring Boot)

* **Java JDK** (v11 o superior) – [Oracle](https://www.oracle.com/java/technologies/javase-downloads.html) o [Adoptium](https://adoptium.net/)
* **Maven** (v3.6 o superior) – [maven.apache.org](https://maven.apache.org/)

---

## 🚀 Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/collabManager.git
cd collabManager
```

### 2. Iniciar el Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

> Por defecto, el backend corre en `http://localhost:8080`

### 3. Iniciar el Frontend

En una terminal nueva:

```bash
cd frontend
npm install # o yarn install
npm start   # o yarn start
```

> Por defecto, el frontend se ejecuta en `http://localhost:3000`

---

## 🚰 Modo Desarrollo

* Cambios en el frontend se reflejan automáticamente gracias a Hot Reload.
* Para el backend, se puede usar **Spring DevTools** para recarga automática.

---

## 📦 Construcción para Producción

### Backend

```bash
cd backend
mvn clean install
java -jar target/nombre-del-archivo.jar
```

### Frontend

```bash
cd frontend
npm run build # o yarn build
```

Los archivos estáticos estarán en `frontend/build/`.

---

## ⚠️ Aspectos Importantes

* **Variables de entorno:**

  * Backend: `application.properties` o `application.yml`
  * Frontend: archivo `.env` (ej. `REACT_APP_API_URL=http://localhost:8080/api`)
* **Puertos:** 8080 (backend) y 3000 (frontend)
* **Base de datos:** Configurada en el backend
* **CORS:** Configurar en Spring Boot si el frontend y backend corren en dominios diferentes

---

## 👥 Créditos

* **lancer751** – Desarrollador/a frontend
* **LuiseGVdev290403** - Desarrollador/a frontend

---

## 📄 Licencia

Este proyecto está licenciado bajo los términos de la [Licencia MIT](LICENSE).
