# Prueba técnica Telecu

## Descripción general

Para el proyecto usé Vite + React + Material UI + React Router + Axios.

Decidí utilizar Material UI para tener componentes listos para utilizar, esto para reducir el tiempo de desarrollo.
Uso React Router para dar acceso a la aplicación solo cuando se tiene un token válido.
Axios lo uso para realizar las peticiones al backend, la URL del backend la defino en un archivo `.env`.
Para el manejo de formularios y validaciones de los campos utilicé las librerías `formik` y `yup`.

Cuando ocurre un error en la aplicación o no se encuentra una ruta, muestro una página de error.

El JWT lo manejo utilizando react context y la expongo usando un hook llamado `useAuth`.

## Como probarlo en local
1. Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```shell
VITE_API_URL=http://localhost:3000/api/
```
2. Abrir una terminal en la raíz del proyecto y ejecutar los siguientes comandos:
```shell
npm install
npm run dev
```


