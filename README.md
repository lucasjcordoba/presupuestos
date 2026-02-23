# Presupuestos

Aplicación web para gestionar un presupuesto personal de forma simple.
Permite definir un presupuesto, cargar gastos y visualizar en tiempo real el saldo restante con indicadores visuales.

---

## Stack

- **Framework:** Next.js 15 (App Router)
- **UI:** React 19 + TypeScript 5
- **Estilos:** Tailwind CSS 4
- **Persistencia:** localStorage (migración a base de datos en roadmap)
- **Node.js:** 20.x (ver `.nvmrc`)

---

## Correr el proyecto localmente

```bash
nvm use         # usa la versión de Node especificada en .nvmrc
npm install
npm run dev     # inicia en http://localhost:3000
```

Otros comandos disponibles:

```bash
npm run build   # build de producción
npm run lint    # ESLint
npx tsc --noEmit  # verificación de tipos
```

---

## Control de versiones

### Ramas principales

| Rama | Propósito |
|------|-----------|
| `master` | Código estable listo para producción. Solo recibe merges desde `develop`. |
| `develop` | Rama de integración. Todas las features se mergean aquí primero. |

### Flujo de trabajo

```
1. Crear feature branch desde develop:
   git checkout develop
   git checkout -b feat/nombre-feature

2. Hacer cambios y commitear con Conventional Commits

3. Abrir Pull Request: feat/* → develop
   (CI corre automáticamente)

4. Al cerrar un ciclo: Pull Request develop → master
```

### Convención de commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agregar categorías de gastos
fix: corregir cálculo de presupuesto restante
refactor: extraer hook useGastos
chore: actualizar dependencias
docs: documentar API routes
```

---

## CI / CD

GitHub Actions corre automáticamente en cada PR a `master` o `develop`:

- `tsc --noEmit` — verificación de tipos TypeScript
- `npm run lint` — ESLint
- `npm run build` — verifica que la build no rompe

Ver configuración en [.github/workflows/ci.yml](.github/workflows/ci.yml).

---

## Roadmap

### Completado
- [x] Versión inicial funcional
- [x] Persistencia con localStorage
- [x] Migración a Next.js 15 + TypeScript + Tailwind CSS 4
- [x] Control de versiones con GitFlow simplificado + CI

### En progreso / Planificado
- [ ] Backend con API Routes + Supabase (PostgreSQL)
- [ ] Autenticación (NextAuth.js)
- [ ] Categorías y fechas en gastos
- [ ] Editar y eliminar gastos
- [ ] Múltiples presupuestos / períodos
- [ ] Dashboard con gráficas (Recharts)
- [ ] Export PDF / Excel
- [ ] Notificaciones push al límite del presupuesto
- [ ] Integración con IA para análisis de gastos

---

## Licencia

Proyecto personal con fines educativos y de portfolio.
