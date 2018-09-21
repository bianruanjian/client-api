import { describe, it, beforeEach } from "intern/lib/interfaces/bdd";
const { assert } = intern.getPlugin('chai');
import { Store } from '@dojo/framework/stores/Store';
import global from '@dojo/shim/global';
import setData from '../../../src/api/setData';
import { StateData } from '../../../src/interface';

describe('setData', () => {
    let store: Store<any>;
    let stateData: StateData;
    beforeEach(() => {
        store = global.store = new Store();
    })

    it('without global store should throw an error', () => {
        global.store = null;
        stateData = {
            foo: 'test'
        };
        assert.throws(() => { setData(stateData) }, Error, '未找到 store，请设置 global.store');
    })

    it('add one object', () => {
        stateData = {
            foo: 'test'
        };
        setData(stateData);
        assert.strictEqual(store.get(store.path('foo')), 'test');
    })


    it('add two objects', () => {
        stateData = {
            'foo': 'test1',
            'bar': 'test2'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), 'test1');
        assert.strictEqual(store.get(store.path('bar')), 'test2');
    })

    it('add a object expression 1', () => {
        stateData = {
            'foo.bar': 'test'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), { bar: 'test' });
        assert.strictEqual(store.get(store.path('foo/bar')), 'test');
    })

    it('add a object expression 2', () => {
        stateData = {
            'foo.bar.a': 'test'
        };
        setData(stateData);
        assert.strictEqual(store.get(store.path('foo/bar/a')), 'test');
    })

    it('add a array expression 1', () => {
        stateData = {
            'foo[2].bar': 'test'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), [, , { bar: 'test' }]);
        assert.strictEqual(store.get(store.path('foo/2/bar')), 'test');
    })

    it('add a array expression 2', () => {
        stateData = {
            'foo[0]["bar"]': 'test'
        };
        setData(stateData);
        assert.deepEqual(store.get(store.path('foo')), [{ bar: 'test' }]);
        assert.strictEqual(store.get(store.path('foo/0/bar')), 'test');
    })

})