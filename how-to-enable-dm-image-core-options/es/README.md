# ¿Cómo habilitar las opciones extras de una imagen que soporta DM Image Core?

Antes de iniciar, esta funcionalidad debe de ser soportada por la instancia.
En este caso, hablamos de una instancia DEV, no de local.

¿Cuál es el problema?
Básicamente las imágenes no han sido procesadas por scene7 (es el servicio de Adobe para la entrega y manipulación de media (imágenes y videos)).
Esto se puede verificar en que, si se revisa la metadata de la imagen desde crx/de, no aparecen unas props especiales de scene7

¿Cómo activar el DM Preset options a una imagen?
Esta es la forma en la que encontré por el momento.

Ubicar la imagen que se quiere activar.
Ir a Workflows > Models > DAM Update Asset. Darle click al check y click a "Star Workflow"
En payload, poner el enlace de la imagen, importante, ponerle al final /jcr:content/metadata.
Aceptar

¿Cómo saber que funcionó?

1. La más fácil, es ver si ya aparecen las opciones adicionales en el diálogo de la imagen.
2. También sirve verificar si se ejecuto el workflow revisando el historial. Es ir a Workflow > archive, y ahí debería de estar el historial.
3. Y finalmente, se podría verificar si la imagen en el crx/de tiene la prop Dam:s7damType String Image. Esto se ve en el jcr:content. Pero, revisando la metadata, deberían de haber más props referente al dam:scene7F-

Ahora bien. Esto es imagen por imagen. Esto de workflows, la verdad, nunca lo había ocupado antes, y no si hay una forma de decirle que lo haga para una carpeta completa