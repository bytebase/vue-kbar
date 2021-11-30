<script setup>
import LocalHello from './LocalHello.vue';
import SrcHello from '../src/SrcHello.vue';
import ComponentsHello from '../src/components/ComponentsHello.vue';
import { ComponentsHello as ComponentsHelloFromIndex } from '../src';
</script>

# hello

:::warning
This is WIP!
:::

<LocalHello />
<SrcHello />
<ComponentsHello from="raw" />
<ComponentsHelloFromIndex from="index" />
卧槽又可以了??
