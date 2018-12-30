// 创建数据库
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

client.connect((err) => {
    assert.equal(null, err);
    console.log('Connected successfully to server');

    const db = client.db(dbName);

    // insertDocuments(db, function() { TODO async await改写成异步写法
    //     updateDocument(db, function() {
    //       removeDocument(db, function() {
    //         client.close();
    //       });
    //     });
    //   });
    
    indexCollection(db, () => {
        client.close();
    })
});
// 创建集合，插入文档
const inserDocument = (db, callback) => {
    // get the documents collection
    const collection = db.collection('documents');
    // insert some documents
    collection.insertMany([
        {a:1}, {a:2}, {a:3}
    ], (err, result) => {
        assert.equal(err, null);
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log('Inserted 3 documents into the collection');
        callback(result);
    })
}
// 查找文档
const findAllDocuments = (db, callback) => {
    // get the documents collection
    const collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
    })
}
// 通过条件查找文档 find documents with a query filter

const findQueryDocuments = (db, callback) => {
    const collection = db.collection('documents');

    collection.find({'a':3}).toArray((err, docs) => {
        assert.equal(err, null);
        console.log('found the following records');
        console.log(docs);
        callback(docs);
    })
};

// update a document

const updateDocument = (db, callback) => {
    const collection = db.collection('documents');
    
    collection.updateOne({a: 2}, {$set: {b : 1}}, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('Update the document with the filed a equal to 2');
        callback(result);
    })
}

// remove a document
const removeDocument = (db, callback) => {
    const collection = db.collection('documents');

    collection.deleteOne({a:3}, (err, result) => {
        assert.equal(err, null);
        assert.equal(1, result.result.n);
        console.log('removed the document with the field a equal to 3');
        callback(result);
    })
};

// index a Collection 创建索引能够提高数据库的搜索性能

const indexCollection = (db, callback) => {
    db.collection('documents').createIndex(
        {'a':1},
        null,
        (err, results) => {
            console.log(results);
            callback();
        }
    )
}

