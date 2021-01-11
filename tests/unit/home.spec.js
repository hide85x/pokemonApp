import { shallowMount, createLocalVue } from '@vue/test-utils';
import Home from '../../src/views/Home.vue';

import flushPromises from 'flush-promises';

import Vuetify from 'vuetify'


async function flush() {
    await flushPromises();
    return new Promise(resolve => {
        setTimeout(resolve, 1500);
    });
}

const $router= {
    push: jest.fn()
}
const localVue= createLocalVue()
localVue.use(Vuetify)
describe('Home ' , () => {
    let wrapper;
    beforeEach(()=> {
        wrapper= shallowMount(Home, {
            localVue,
            mocks: {
                $router
            }
        })
    });
    it('will render Home component', ()=> {
        expect(wrapper.exists()).toBe(true)
    })
    it('btn should be initialy disabled', ()=> {
       const btn= wrapper.find('#submitBtn')
       expect(btn.attributes().disabled).toBe('true')
    })
    it('btn should be active when user type something in input field',async ()=> {
        const btn= await wrapper.find('#submitBtn')
        wrapper.vm.name="testuser"
        await flush()
        console.log(wrapper.vm.name)
        expect(btn.attributes().disabled).toBe(undefined)
    })

})

