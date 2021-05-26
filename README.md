# vue-test-utils-1845

Minimal example reproducing issue #1845 in `@vue/test-utils`: https://github.com/vuejs/vue-test-utils/issues/1845

## Project setup

Created using the `@vue/cli` project creation tool with the following options:

```
Vue CLI v4.5.13
? Please pick a preset: Manually select features
? Check the features needed for your project: Choose Vue version, Babel, Router, Vuex, CSS Pre-processors, Linter, Unit
? Choose a version of Vue.js that you want to start the project with 2.x
? Use history mode for router? (Requires proper server setup for index fallback in production) Yes
? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with dart-sass)
? Pick a linter / formatter config: Airbnb
? Pick additional lint features: 
? Pick a unit testing solution: Jest
? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files
? Save this as a preset for future projects? (y/N) N
```

## How the example app works

You can see the app in action by running the following commands:

```
npm install
npm run serve
```

Then navigating to the outputted URL in a browser.

The app makes use of [dynamic components](https://vuejs.org/v2/guide/components.html#Dynamic-Components) to generate a user interface at runtime from configuration data. See the code in `src/views/Home.vue` as an example.

As part of the rendering process, attributes are dynamically bound at runtime:

```html
<!-- src/components/ViewRenderer.vue  -->
<component
  :is="$props.config.elementType"
  v-bind="{
    ...$props.config.attrs,
  }"
/>
```

When testing the application, we want to make sure that configuration data is rendered as expected. See `tests/unit/components/ViewRenderer.spec.js` as an example.

## Reproducing the issue

1. Clone this repository
2. Run the following commands:

```
npm install
npm run test:unit
```

3. You should see the test *pass*.
4. Change the version of `@vue/test-utils` to `1.1.4` in `package.json`
5. Run the following commands:

```
npm install
npm run test:unit
```

6. You should see the test *fail*.

## Cause of the issue

A change was made in `@vue/test-utils@1.1.4` such that the algorithm responsible for finding components by name produces a different result in scenarios where `vm.name` is not the intended subject of the search. Specifically, it was this change that causes the test to break:

```
// packages/test-utils/dist/vue-test-utils.js
2697 - var componentName = (vm.$options && vm.$options.name) || '';
2697 + var componentName = vm.name || (vm.$options && vm.$options.name) || '';
```

In the particular scenario of this application, when binding attributes to a dynamic component it seems that `vm.name` is being assigned the value of the `name` attribute:

```html
<component
  :is="custom-component"
  v-bind="{
    name: 'some-name',
  }"
/>
```

So the find algorithm will compare a find selector with a value of `{ name: 'CustomComponent' }` to `'some-name'` rather than `'CustomComponent'` as it was in `@vue/test-utils@1.1.3`.

Is this intended behavior?
