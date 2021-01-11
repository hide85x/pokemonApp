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
            },
        })
    });
    it('will render Home component', ()=> {
        expect(wrapper.exists()).toBe(true)
    })
    it('btn should be initialy disabled', ()=> {
       const btn= wrapper.find('#submitBtn')
       expect(btn.attributes().disabled).toBe('true')
    })
    it('btn should be disabled when user type INcorrect data in input field',async ()=> {
        const btn= await wrapper.find('#submitBtn')
        const input= wrapper.find('.form__input')
        input.value=await  "@!@#asd"

        await flush()
        expect(btn.attributes().disabled).toBe('true')
    })
    it('btn should be active when user type correct data in input field',async ()=> {
        const btn= await wrapper.find('#submitBtn')
        const input= wrapper.find('.form__input')
        input.value=await  "testuser"

        wrapper.vm.nickname="testuser"
        await flush()
        expect(btn.attributes().disabled).toBe(undefined)
    })

})

