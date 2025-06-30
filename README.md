# 💰 Control de Gastos

Aplicación web desarrollada con **React**, **TypeScript** y **TailwindCSS** que permite definir un presupuesto inicial y llevar el control de los gastos realizados, mostrando en tiempo real cuánto dinero se ha utilizado y cuánto queda disponible.

## 📸 Demo

*(Incluye aquí un link a tu demo si lo tienes, por ejemplo en Netlify, Vercel o GitHub Pages)*

## 🚀 Características

- Definición de presupuesto inicial.
- Registro de gastos con nombre, monto y categoría.
- Visualización del total gastado, disponible y porcentaje consumido.
- Clasificación visual de gastos según su categoría.
- Persistencia de datos con LocalStorage.
- Componente de barra de progreso circular.
- Diseño responsive y moderno con TailwindCSS.

## 🛠️ Tecnologías utilizadas

- **React**
- **TypeScript**
- **TailwindCSS**
- **useReducer**
- **Context API**
- **Custom Hooks**

## 📂 Estructura del proyecto

```bash
src/
│
├── components/        # Componentes reutilizables
├── context/           # Context API para manejo de estado global
├── hooks/             # Custom Hooks
├── pages/             # Vistas principales
├── types/             # Tipado con TypeScript
├── utils/             # Funciones auxiliares
└── App.tsx            # Componente raíz
