<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <ViewRenderer
      :config="[
        {
          elementType: 'custom-component',
          attrs: {
            id: 'component-1',
            name: 'some-name',
            prop1: 'some value',
            prop2: 123,
          },
        }
      ]"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ViewRenderer from '@/components/ViewRenderer.vue';

export default {
  name: 'Home',
  components: {
    ViewRenderer,
  },
};
</script>
