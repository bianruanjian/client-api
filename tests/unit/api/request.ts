const { describe, it, beforeEach } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import global from '@dojo/framework/shim/global';
import { stub } from 'sinon';
import request from '../../../src/api/request';

const fetchStub = stub();
global.fetch = fetchStub;

describe('request', () => {

    beforeEach(() => {
        fetchStub.reset();
    });

    it('invalid request with null url', () => {
        const options = {
            url: '',
        };
        const result = request(options);
        assert.isFalse(result);
    });

    it('get request ', () => {
        const data = {
            user: 'user',
            password: 'pwd'
        };
        const mockResponse = {
            json: stub().returns({
                success: 'true',
                status: 1,
                data
            })
        };
        // withArgs 的参数必须一致
        fetchStub
            .withArgs('http://localhost/user/login?user=user&password=pwd',
                { method: 'GET', headers: { 'X-Requested-With': 'XMLHttpRequest' } })
            .returns(mockResponse);
        const options = {
            url: 'http://localhost/user/login',
            data,
            done: (responseData: any, status: number, responseInfo: Response) => {
                assert.deepEqual(responseData, {
                    user: 'user',
                    password: 'pwd'
                });
            }
        };
        request(options);
    });

    it('post request ', () => {
        const data = {
            user: 'user',
            password: 'pwd'
        };
        const mockResponse = {
            json: stub().returns({
                success: 'true',
                status: 1,
                data
            })
        };
        // withArgs 的参数必须一致
        fetchStub
            .withArgs('http://localhost/user/login',
                { method: 'POST', credentials: 'same-origin', headers: { 'Content-type': 'application/json;charset=UTF-8', 'X-Requested-With': 'XMLHttpRequest' }, body: '{"user":"user","password":"pwd"}' })
            .returns(mockResponse);
        const options = {
            url: 'http://localhost/user/login',
            method: 'POST',
            data,
            done: (responseData: any, status: number, responseInfo: Response) => {
                assert.deepEqual(responseData, {
                    user: 'user',
                    password: 'pwd'
                });
            }
        };
        request(options);
    });
});
