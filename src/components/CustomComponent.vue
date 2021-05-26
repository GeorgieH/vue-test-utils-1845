<template>
  <div>
    <p>A custom component</p>
    <ul>
      <li>name: {{ $props.name }}</li>
      <li>prop1: {{ $props.prop1 }}</li>
      <li>prop2: {{ $props.prop2 }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CustomComponent',
  props: {
    name: String,
    prop1: String,
    prop2: Number,
  },
};
</script>
