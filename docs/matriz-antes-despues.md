# Matriz de comprobaciones – TP 05 / TP 06

La columna **TP 05** se basa en los resultados descriptos en el README original recibido. No fue posible ejecutar el servidor por falta de acceso a NPM desde el entorno de preparación. Completar **TP 06 observado** al ejecutar ambos proyectos con `npm install` y `npm start` en una computadora que pueda descargar las dependencias. Anotar código HTTP, texto o captura y cantidad de reservas.

| Prueba | TP 05 documentado | TP 06 esperado | TP 06 observado (completar) |
| --- | --- | --- | --- |
| `GET /` | 200, página principal | 200, mismo EJS | Pendiente |
| `GET /estado` | 200; 4 reservas y ID `BIB-` | 200; 4 e ID `BIB-` | Pendiente |
| `GET /reservas` | 200, listado de 4 | 200, 4 registros originales | Pendiente |
| `GET /reservas/nueva` | 200, formulario | 200, mismo formulario | Pendiente |
| `GET /reservas/1` | 200, detalle | 200, Lucía Gómez | Pendiente |
| `GET /reservas/9999` | 404, HTML | 404, mismo mensaje y vista | Pendiente |
| `POST /reservas` vacío | 400, conserva valores | 400, sin alta | Pendiente |
| Email sin `@` | 400 | 400, sin alta | Pendiente |
| Sala no permitida | 400 | 400, sin alta | Pendiente |
| Turno no permitido | 400 | 400, sin alta | Pendiente |
| Personas 0 / 7 | 400 | 400, sin alta | Pendiente |
| Personas fraccionarias | Regla de enteros documentada | 400, sin alta | Pendiente |
| `POST /reservas` válido | 302, redirección y alta | 302, luego GET 200 y 5 reservas | Pendiente |
| `GET /css/estilos.css` | CSS público documentado | 200, mismo CSS | Pendiente |
| `GET /url-inexistente` | 404, HTML | 404, mismo HTML | Pendiente |
| Reinicio del servidor | Regresa a 4 | Regresa a 4 | Pendiente |
| Puerto `3100` | No disponible en TP 05 | 200 en `localhost:3100` | Pendiente |
| Puerto `99999` | No disponible en TP 05 | No inicia; error claro | Pendiente |
| POST sin cuerpo o `text/plain` | Corrección nueva de semana 6 | 400, sin 500 | Pendiente |

## Datos válidos de ejemplo para POST

| Campo | Valor |
| --- | --- |
| estudiante | Ana López |
| email | ana@example.com |
| sala | Sala Norte |
| fecha | 2026-10-15 |
| turno | Tarde |
| personas | 2 |

## Evidencias mínimas para anotar

- Morgan y `medirDuracion` deben mostrar los estados 200, 302, 400 y 404 junto con el ID `BIB-` en el registro propio.
- El CSS, el inicio, el listado y las vistas deben conservar el mismo aspecto antes/después.
- El POST válido debe aumentar de 4 a 5 la cantidad de reservas en `GET /estado` y aparecer en `/reservas`.
- El POST inválido no debe aumentar la cantidad y debe mostrar el formulario con los valores anteriores.
- Luego de reiniciar deben volver las 4 reservas originales.

**Resultados pendientes:** no sustituir por “OK” hasta observar el servidor con NPM instalado.
