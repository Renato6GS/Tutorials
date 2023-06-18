# Aprendiendo _Markdown_

Esto es un párrafo.

Para dar un salto de línea, hay que dejar 1 línea en blanco.

Aplicando _cursiva_ o _cursiva_

Aplicando **negrita** o **negrita**

Aplicando ambos, cursiva y negrita: **_cursiva y negrita_**, también podemos **_hola qué tal_** o también **_cursinegrita_**

# Encabezado h1

Aquí podremos dejar un espacio en blanco

## Encabezado h2

### Encabezado h3

#### Encabezado h4

##### Encabezado h5

###### Encabezado h6

Todos estos encabezados tienen un ancla interna.

Para crear un enlace, vamos a:

[Texto a mostrar](otherFile.html "Título del enlace")

[Midudev](midu.dev)

[Enlace 1][1], [Enlace 2][2], [Enlace 3][3]

[1]: http://joedicastro.com/consejos
[2]: http://joedicastro.com/consejos "Consejos"
[3]: http://joedicastro.com/

<http://joedicastro.com>

Para formar un enlace al mismo texto, se hace de forma inversa (solo funciona con encabezados):
[Aprendiendo _Markdown_](#aprendiendo-markdown)

[Otro enlace al mismo texto](#encabezado-h1)

<!-- Imágenes: -->
<!-- ![Texto alternativo de la imagen](./musashi.jpg) -->

<!-- ![This is JavaScript](https://jonmircha.com/img/blog/this-is-javascript.jpg) -->

## <!-- Divisiones -->

## Hola buenas tardes

y este otro texto

<!-- Listas ordenadas -->

1. Primavera.
2. Verano.
3. Otoño.
4. Invierno.
   1. Un subnúmero
      1. Otro sub número
   2. Ejemplo

<!-- Lista desordenada -->

- Lunes
- Martes
- Miércoles
  - Medio día
  - Primer día
    - Ejemplo
- Jueves

* También se puede con guión
* Ejemplo guión
  - lol

<!-- Texto enmarcado: -->

`Deno.readTextFile`

Las palabras reservadas de JavaScript (como `let` y `const`) son muy necesarias...

<!-- Código -->

```js
function sumar(a, b) {
  return a + b;
}
```

```typescript
const decoder = new TextDecoder("utf-8");
const data = await Deno.readFile("ruta/al/archivo.txt");
console.log(decoder.decode(data));
```

<!-- Citar un texto -->

> Siempre tienes opción de no tener opinión. _Marco Aurelio_

> Todo lo que escuchamos es una opinión, no un hecho.
>
> Todo lo que vemos es una perspectiva, no la verdad.
>
> _Marco Aurelio_

> Esto es parte de un bloque de cita.
> Esto es parte del mismo bloque de cita.
>
> > Esto es otro bloque de cita anidado.
> > Esto es parte del bloque anidado.
>
> Esto es parte del bloque de cita de primer nivel.

<!-- Tablas -->

| Nombre | Edad | Correo         |
| ------ | ---- | -------------- |
| John   | 38   | jon@gmail.com  |
| Renato | 22   | rena@gmail.com |
| kEnai  | 10   | keni@gmail.com |
| Luis   | 32   | lu@gmail.com   |
| María  | 28   | mari@gmail.com |

Alineación de tablas:

| Elemento | Cantidad | Precio |
| :------- | :------: | -----: |
| Item 1   |    15    |   150€ |
| Item 2   |   3250   | 23,65€ |

<!-- Crear código HTML -->

<form>
  <label for="name">Nombre:</label>
  <input type="text" id="name" placeholder="Escriba su nombre" />
  <button type="submit">Enviar</button>
</form>

<!-- Escapar caracteres especiales de Markdown -->

\*\*negrita\*\* y \_cursiva\_

<!-- Abreviaturas -->

La especificación HTML es mantenida por el W3C.

_[HTML]: Hyper Text Markup Language
_[W3C]: World Wide Web Consortium

<!-- Definiciones -->

Primer termino
: Primera definición

Segundo termino
: Segunda definición
