
var memdb = require('./untils');
var assert = require('assert');

describe('memdb',function() {
    describe('.save(doc)', function() {
        it('should save the document', function() {
            var pet = {name: 'Tobi'};
            memdb.save(pet);
            var ret = memdb.first({name: 'Tobi'});
            assert(ret == pet);
        })
    })
})