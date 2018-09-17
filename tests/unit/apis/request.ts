const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');
import request from '../../../src/apis/request';

describe('request', () => {
    it('get width null url ', () => {
        const options = {
            url: '',
        };
        const result = request(options);
        assert.isFalse(result);
    });
});
