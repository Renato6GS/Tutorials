# Crear un sling listener

Existen distintos tipos de sling listeners. Estos se ejecutan no solo tras la edición de un elemento desde AEM, sino que, también se ejecuta para cualquier cambio, incluso desde crx/de o AUE:


```java
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Component(
    service = ResourceChangeListener.class,
    immediate = true,
    property = {
        ResourceChangeListener.PATHS + "=/content", // Este path determina el alcance de ejecución. En este caso, /content es básicamente toda AEM.
        ResourceChangeListener.CHANGES + "=CHANGED"
    }
)
public class MyListener
        implements ResourceChangeListener, ExternalResourceChangeListener {

    private static final String SUBSERVICE_CONTENT_READ_WRITE = "contentreadwriteservice"; // Esta configuración tiene que existir. Depende de lo que se busque


    private static final Logger LOG = LoggerFactory.getLogger(ArcImageCoreListener.class);
    private static final String SUBSERVICE_CONTENT_READ_WRITE = "contentreadwriteservice";

    @Reference
    private ResourceResolverFactory resolverFactory;

    private static final ThreadLocal<Boolean> PROCESSING = ThreadLocal.withInitial(() -> Boolean.FALSE);

    @Override
    public void onChange(List<ResourceChange> changes) {
        if (PROCESSING.get()) return;

        PROCESSING.set(Boolean.TRUE);
        try (ResourceResolver resolver = resolverFactory.getServiceResourceResolver(
                Collections.singletonMap(ResourceResolverFactory.SUBSERVICE, SUBSERVICE_CONTENT_READ_WRITE))) {

            for (ResourceChange change : changes) {
                LOG.debug("[Listener] Event {} in {} (external: {})",
                    change.getType(), change.getPath(), change.isExternal());
                handleChange(resolver, change);
            }

        } catch (LoginException e) {
            LOG.error("[Listener] Error to get service", e);
        } finally {
            PROCESSING.set(Boolean.FALSE);
        }
    }
```