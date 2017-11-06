// 连接数据库
var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1', 27017, {});
var BSON = require('bson');
// 

var client = new mongodb.Db('mydatabase', server, {w: 1});

client.open(function(err) { // 访问mongodb集合
    if(err) throw err;
    client.collection('test_insert', function(err, collection) {
        if(err) throw err;
        console.log('We are now able to perform queries.')
        // insert(collection);
        find(collection, {"title": 'I like cake'}, update);
    }) 
});


function insert(collection) {
    collection.insert( // 将文档插入集合中
        {
            'title': 'I like cake',
            'body': 'it is quite good.'
        }, {safe: true}, // 安全模式表明数据库操作应该在回调函数执行之前完成
        function(err, document) {
            if(err) throw err;
            console.log('Document ID is:' + document.ops[0]._id)
        }
    );
}

function find(collection, message, callback) {
    collection.find({"title": 'I ate too much cake'}).toArray(function(err, results) {
        if(err) throw err;
        console.log(results); 
        callback && callback(collection, results);
    })
}

function update(collection, results) {
    var id = results[0]._id;
    console.log(id, BSON.ObjectID)
    var _id = new BSON.ObjectID(id);
    console.log(_id);
    collection.update({_id: _id},
        {$set: {"title": 'I ate too much cake'}},
        {safe: true},
        function(err) {
            if(err) throw err;
        }
    )
}

function remove(collection, results) {
    var id = results[0]._id;
    var _id = new BSON.ObjectID(id);
    collection.remove({_id: _id}, {safe: true}, function(err) {
        if(err) {
            throw err;
            return null;
        }
    })
}