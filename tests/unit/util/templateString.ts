import parseTemplate from "../../../src/util/templateString";

const { describe, it } = intern.getInterface('bdd');
const { assert } = intern.getPlugin('chai');

describe('templateString', () => {
    it('parseTemplate with normal character string ', () => {
        let content = '';
        let result = parseTemplate(content);
        assert.deepEqual(content, result);

        content = 'hello, Steve';
        result = parseTemplate(content);
        assert.deepEqual(content, result);

        content = '$123';
        result = parseTemplate(content);
        assert.deepEqual(content, result);
    });

    it('parseTemplate with sample expression ', () => {
        let content = '${user}, ${idCard}';
        let obj = {
            user: 'Steve',
            idCard: 123456
        };
        let result = parseTemplate(content, obj);
        assert.deepEqual('Steve, 123456', result);
    });

    it('parseTemplate with complex expression ', () => {
        let content = '{hello}, ${user}, ${idCard}, $456';
        let obj = {
            user: 'Steve',
            idCard: 123456
        };
        let result = parseTemplate(content, obj);
        assert.deepEqual('{hello}, Steve, 123456, $456', result);
    });
});
