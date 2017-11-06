// 辅助函数： 发送html，创建表单， 接收表单数据

var qs = require('querystring');

exports.sendHtml = function(res, html) { 
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

exports.parseReceivedData = function(req, cb) { // 解析http post 数据
    var body = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) {body += chunk});
    req.on('end', function() {
        var data = qs.parse(body);
        cb(data);
    })
}

exports.actionForm = function(id, path, label) { // 渲染表单
    var html = `<form method="POST" action=${path}>
    <input type="hidden" name="id" value=${id} />
    <input type="submit" value=${label}  />
    </form>
    `
    return html;
}

exports.add = function(db, req, res) { // 添加工作记录
    exports.parseReceivedData(req, function(work) {
        db.query(
            'INSERT INTO work (hours, data, description)'+
            'VALUES (?, ?, ?)',
            [work.hours, work.data, work.description],
            function(err) {
                if(err) throw err;
                exports.show(db, res);
            }
        )
    })
}

exports.delete = function(db, req, res) { // 删除工作记录
    exports.parseReceivedData(req, function(work) { // 解析post数据
        db.query(
            'DELETE FROM work WHERE id=?', // 删除工作记录
            [work.id],  // 工作记录ID
            function(err) {
                if(err) throw err;
                exports.show(db, res);  // 给用户显示工作记录清单
            }
        )
    })
}

// 获取工作记录

exports.show = function(db, res, showArchived) {
    var query = 'SELECT * FROM work '+ 'WHERE archived=? '+'ORDER BY date DESC'; // 获取工作记录的sql
    var archiveValue = (showArchived) ? 1 : 0;
    db.query(query, [archiveValue], function(err, rows) { // 想要工作记录的归档状态
        if(err) throw err;
        var html = showArchived ? '':
        '<a href="/archived"> Archived </a> <br />';

        html += exports.workHitlistHtml(rows);
        html += exports.workFormHtml();
        exports.sendHtml(res, html);
    })
}

exports.showArchived = function(db, res) { // 只显示归档的工作记录
    exports.show(db, res, true); 
}

// 渲染 html

exports.workHitlistHtml = function(rows) {
    var html = '<table>';
    for(var i in rows) {
        html += '<tr>';
        html += `<td>${row[i].date}</td>`;
        html += `<td>${row[i].hours}</td>`;
        html += `<td>${row[i].description}</td>`;

        if(!rows[i].archived) {
            html += `<td>${exports.workArchiveForm(rows[i].id)}</td>`
        }
        html += `<td>${exports.workDeleteForm(rows[i].id)}</td>`
        html += '</tr>'
    }
    html += '</table>';
    return html;
}

exports.workFormHtml = function() {
    var html = ` <form action="/" method="POST">
    <p>Date (YYYY-MM-DD): <br /><input type="text" name="date" /></p>
    <p>Hours worked: <br /> <input type="text" name="hours" /></p>
    <p>Description: <br /></p>
    <textarea name="description" cols="30" rows="10"></textarea>
    <input type="submit" value="Add" />
</form>`;
return html;
}

exports.workArchiveForm = function(id) {
    return exports.actionForm(id, '/archive', 'Archive');
};

exports.workDeleteForm = function(id) {
    return exports.actionForm(id, '/delete', 'Delete');
}