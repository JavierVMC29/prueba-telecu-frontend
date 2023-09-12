# Prueba tecnica Telecu

## Descripcion general

Para el proyecto usé Vite + React + Material UI + React Router + Axios.

Decidi usar Material UI para tener componentes listos para usar, esto para reducir el tiempo de desarrollo.
Utilizo React Router para dar acceso a la aplicacion solo cuando se tiene un token valido.
Axios lo uso para realizar las peticiones al backend, la URL del backend la defino en un archivo `.env`.
Para el manejo de formularios y validaciones de los campos use las librerias `formik` y `yup`.

Cuando ocurre un error en la o no se encuentra una ruta muestro una pagina de error.

El la sesion la manejo usando react context y lo expongo usando un hook llamado `useAuth`.

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


