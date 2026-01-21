# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Presupuestos

Aplicación web para gestionar un presupuesto personal de forma simple e incremental.  
Permite definir un presupuesto inicial, cargar gastos y visualizar en tiempo real el saldo restante con indicadores visuales.

Este proyecto nace como una app simple y evoluciona progresivamente hacia una solución más completa, priorizando buenas prácticas de versionado, refactor incremental y mejoras de arquitectura.

---

## ✨ Funcionalidades actuales

- Definición de presupuesto inicial
- Carga de gastos con nombre y monto
- Listado de gastos
- Cálculo automático del saldo restante
- Indicadores visuales según nivel de gasto

---

## 🛠️ Stack actual

- React (Create React App)
- JavaScript
- CSS
- Node.js

> El proyecto se encuentra en proceso de refactor y modernización progresiva.

---

## 🚀 Cómo correr el proyecto localmente

### Requisitos
- **Node.js 20.x**  
  (se recomienda usar `nvm`, ver archivo `.nvmrc`)

### Pasos

```bash
nvm use
npm install
npm start
```

La aplicación se abrirá en:  
👉 http://localhost:3000

---

## ⚠️ Nota sobre OpenSSL

Este proyecto utiliza Create React App con tooling legacy.  
Para compatibilidad con Node moderno, el script de `start` incluye:

```
NODE_OPTIONS=--openssl-legacy-provider
```

Esto es intencional y está documentado como solución temporal hasta la migración de tooling.

---

## 📸 Progreso visual

Las capturas de pantalla del avance del proyecto se encuentran en:

```
/docs/screenshots
```

Se documenta la evolución de la aplicación desde su versión inicial hasta las mejoras sucesivas.

---

## 🧭 Roadmap (alto nivel)

- [x] Versión inicial funcional
- [ ] Persistencia local (localStorage)
- [ ] Refactor de estado y lógica
- [ ] Migración a Vite + TypeScript
- [ ] Soporte para adjuntar tickets / facturas
- [ ] Backend + autenticación
- [ ] Integraciones externas (IA, WhatsApp)

---

## 📦 Versionado y flujo de trabajo

- Rama principal: `main` (siempre estable)
- Desarrollo por ramas de feature
- Squash merge para mantener historial limpio
- Commits siguiendo **Conventional Commits**

---

## 📄 Licencia

Proyecto personal con fines educativos y de portfolio.