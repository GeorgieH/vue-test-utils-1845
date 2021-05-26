import { mount } from '@vue/test-utils';
import ViewRenderer from '@/components/ViewRenderer.vue';

describe('ViewRenderer.vue', () => {
  it('renders custom component', () => {
    const wrapper = mount(ViewRenderer, {
      propsData: {
        config: [
          {
            elementType: 'custom-component',
            attrs: {
              id: 'component-1',
              // when testing against @vue/test-utils@1.1.4
              // remove this line to find the component
              name: 'some-name',
              prop1: 'some value',
              prop2: 123,
            },
          },
        ],
      },
      stubs: {
        CustomComponent: {
          name: 'CustomComponent',
          template: '<div />',
          props: [
            'name',
            'prop1',
            'prop2',
          ],
        },
      },
    });
    const cc = wrapper.findComponent({ name: 'CustomComponent' });
    expect(cc.exists()).toEqual(true);
    expect(cc.props()).toEqual({
      name: 'some-name',
      prop1: 'some value',
      prop2: 123,
    });
  });
});
