<template>
  <div>
    <template v-if="Array.isArray($props.config)">
      <template v-for="element in $props.config">
        <view-renderer
          :key="element.id"
          :config="element"
        />
      </template>
    </template>
    <template v-else-if="typeof $props.config === 'object'">
      <component
        :is="$props.config.elementType"
        v-bind="{
          ...$props.config.attrs,
        }"
      />
    </template>
  </div>
</template>

<script>
import CustomComponent from './CustomComponent.vue';

export default {
  name: 'ViewRenderer',
  components: {
    CustomComponent,
  },
  props: {
    config: [Array, Object],
  },
};
</script>
