# ¿Cómo crear un selector reutilizable en un diálogo de un componente para AEM?

La ventaja de hacerlo de esta manera es que, se puede personalizar el "name" y poder reutilizarlo múltiples veces en el mismo diálogo.

## Objetivo:

```xml
<ctaIcon
        jcr:primaryType="nt:unstructured"
        sling:resourceType="acs-commons/granite/ui/components/include"
        path="/apps/myenterprise/components/shared/iconselector">
        <parameters
                jcr:primaryType="nt:unstructured"
                iconFieldLabel="CTA Icon"
                iconFieldDescription="Icon identifier for displaying an icon in the link"
                iconName="contentCtaIcon"
                defaultValueText="NONE"
                defaultValue="NONE"
                iconRequired="{Boolean}false"/>
</ctaIcon>
```

## El selector shared, debe de ser así:

En este caso, se uestán usando los íconos nativos de AEM. Pero, en value, se puede poner el nombre del ícono. La desventaja es que, en el selector, al ser un custom icon, no va a aperecer el ícono, así que, sería de considerar de remover la param "icon".

```xml
<?xml version="1.0" encoding="UTF-8"?>
<jcr:root xmlns:sling="http://sling.apache.org/jcr/sling/1.0" xmlns:cq="http://www.day.com/jcr/cq/1.0"
          xmlns:jcr="http://www.jcp.org/jcr/1.0" xmlns:nt="http://www.jcp.org/jcr/nt/1.0"
          jcr:primaryType="nt:unstructured"
          sling:resourceType="granite/ui/components/coral/foundation/form/select"
          fieldDescription="${{dropdownIconsDescription}}"
          fieldLabel="${{dropdownIconsLabel}}"
          name="./${{dropdownIconsName}}"
          required="${{dropdownIconsRequired}}">
          <items jcr:primaryType="nt:unstructured">
              <default
                  jcr:primaryType="nt:unstructured"
                  text="${{defaultValueText}}"
                  value="${{defaultValue}}"
                  icon="${{defaultValue}}" />
              <style1
                  jcr:primaryType="nt:unstructured"
                  text="Print"
                  value="icon-print"
                  icon="icon-print" />
              <style2
                  jcr:primaryType="nt:unstructured"
                  text="Percentage"
                  value="icon-percentage"
                  icon="icon-percentage"/>
              <style3
                  jcr:primaryType="nt:unstructured"
                  text="Network"
                  value="icon-network"
                  icon="icon-network" />
          </items>
</jcr:root>
```