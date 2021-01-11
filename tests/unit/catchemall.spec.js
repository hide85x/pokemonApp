import { shallowMount, createLocalVue } from '@vue/test-utils';
import CatchEmAll from '../../src/views/CatchEmAll.vue';
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import myStore from '../../src/store/index'

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import flushPromises from 'flush-promises';


async function flush() {
    await flushPromises();
    return new Promise(resolve => {
        setTimeout(resolve, 1500);
    });
}

const $router = {
    push: jest.fn()
}

const server = setupServer(
    rest.post('https://pokeapi.co/api/v2', (req, res, ctx) => {
        console.log('msw called')
        $router.push()
        
    })
)
const localVue = createLocalVue()
const store= myStore
localVue.use(Vuex)

localVue.use(Vuetify)
describe('CatchEmAll ', () => {
    beforeAll(() => server.listen())
    afterAll(() => server.close())

    let wrapper;
    beforeEach(() => {
        wrapper = shallowMount(CatchEmAll, {
            localVue,
            store,
            mocks: {
                $router
            }
        })
    });
    it('should render CatchEmAll component',async ()=> {
        expect(wrapper.exists()).toBe(true)
    })
    it('p tag in the welcome section should match given input by user', async()=> {
        store.state.username=await "testUser"
        await flush()
        const userTag= wrapper.find('#username')
        await flush()
        console.log(userTag.text())
        expect(userTag.text()).toMatch('testUser !')
    })
    it('before finishing catching pokemons, TryAgain btn should not exists', async()=> {
        wrapper.vm.endGame= false
        await flush()
        const tryAgainBtn= wrapper.find('.tryAgain')
        expect(tryAgainBtn.exists()).toBe(false)
    })
   it('after finishing catching pokemons, TryAgain btn should appear', async()=> {
        wrapper.vm.endGame= true
        await flush()
        const tryAgainBtn= wrapper.find('.tryAgain')
        expect(tryAgainBtn.exists()).toBe(true)
        await tryAgainBtn.trigger('click')
        expect($router.push).toHaveBeenCalled()
    })
   it('after finishing game, clicking tryAgain should fire $router.push() ', async()=> {
        wrapper.vm.endGame= true
        await flush()
        const tryAgainBtn= wrapper.find('.tryAgain')
        await tryAgainBtn.trigger('click')
        expect($router.push).toHaveBeenCalled()
    })
})
    