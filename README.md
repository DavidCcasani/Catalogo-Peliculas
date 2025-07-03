# 🎬 Catálogo de Películas

Aplicación web desarrollada con Angular para registrar, visualizar, editar y eliminar información de películas. Implementa autenticación de usuarios, roles, subida de imágenes a Cloudinary y base de datos en tiempo real con Firebase Firestore.

---

## 📌 Nombre y Descripción del Proyecto

**Nombre:** Catálogo de Películas  
**Descripción:** Sistema web que permite a los usuarios gestionar un catálogo de películas. Incluye funcionalidades de búsqueda, filtrado por género, ordenamiento, autenticación con diferentes roles (admin/usuario), y subida de imágenes.

---

## 🛠️ Tecnologías y Herramientas Utilizadas

- Angular 17+
- TypeScript
- Firebase (Authentication + Firestore)
- Cloudinary (para almacenamiento de imágenes)
- GitHub Pages (despliegue alternativo)
- HTML & CSS
- Angular Animations
- Angular CLI

---

## ⚙️ Requisitos para Instalar y Ejecutar

1. Tener **Node.js** instalado (v18 o superior recomendado).
2. Instalar Angular CLI:
   
   npm install -g @angular/cli


3. Clonar este repositorio:

   git clone https://github.com/DavidCcasani/Catalogo-Peliculas.git
   cd Catalogo-Peliculas

4. Instalar dependencias:

   npm install

5. Ejecutar en desarrollo:

   ng serve
   
6. Abrir el navegador en:
   [http://localhost:4200](http://localhost:4200)

---

## 🧱 Breve Descripción de la Arquitectura

La aplicación está estructurada en componentes y servicios, siguiendo buenas prácticas modulares:

### 📦 Componentes Principales

- **InicioComponent**: Página principal de bienvenida.
- **PeliculasComponent**: Muestra la lista de películas con filtros y ordenamiento.
- **AgregarPeliculaComponent**: Formulario para registrar nuevas películas (rol admin).
- **EditarPeliculaComponent**: Permite modificar películas existentes (rol admin).
- **Login/RegisterComponent**: Módulos de autenticación.

### 🔧 Servicios

* **AuthService**: Gestión de autenticación y roles (Firestore + Firebase Auth).
* **PeliculasService**: CRUD sobre la colección `peliculas` en Firestore.
* **Guards**: Protección de rutas (solo acceso a admins o usuarios autenticados).

---

## 🌐 URLs de Entregables

* ✅ **GitHub Pages**:
  🔗 [https://DavidCcasani.github.io/Catalogo-Peliculas](https://DavidCcasani.github.io/Catalogo-Peliculas)

* ✅ **Video Explicativo (5–8 minutos)**:
  🎥

---

## 📋 Funcionalidades Presentadas en el Video

* Registro e inicio de sesión con Firebase Authentication.
* Visualización y filtrado de películas.
* Registro, edición y eliminación (solo admin).
* Subida de imágenes a Cloudinary.
* Lectura y escritura en Firebase Firestore.
* Explicación del código fuente (componentes, servicios y guards).

---

## ✅ Entregables Completados

* [x] Código fuente con estructura clara y funcional.
* [x] README.md completo con descripción técnica.
* [x] Por lo menos 2 commits por semana.
* [x] Docente `ivansoriasolis` invitado como colaborador.
* [x] Hosting GitHub Pages.
* [x] Video explicativo entre 5 y 8 minutos.

---

> 🧑‍💻 Proyecto realizado por **David Johan Ccasani Oscco**
> Curso: **Programación Web con Angular**
> Año: **2025**


