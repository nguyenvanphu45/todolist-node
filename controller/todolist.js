// import Model
const Todolist = require('../models/todolist');

// di toi man hinh tao todolist
exports.getTodolistCreate = (req, res, next) => {
    res.render('./todolist/add');
}
// tao moi todolist
exports.postTodolistCreate = (req, res, next) => {
    /* day la phan tao moi todolist */
    console.log("data gui tu form nhap len %j", req.body);
    var data = new Todolist();
    data.title = req.body.title;
    data.content = req.body.content;
    data.save(function (err){
        console.log(err);
        res.redirect('/');
    });
}

// xem chi tiet
exports.getTodolistDetail = (req, res, next) => {
    const ID = req.params.id;
    Todolist.findById(ID, function (err, adventure) {
        res.render('./todolist/detail', {data: adventure});
    });    
}

// get thông tin update
exports.getTodolistUpdate = (req, res, next) => {
    const ID = req.params.id;
    Todolist.findById(ID, function (err, adventure) {
        res.render('./todolist/edit', {data: adventure});
    });    
}
// cap nhat
exports.postTodolistUpdate = (req, res, next) => {
    const data = {
        title : req.body.title,
        content : req.body.content
    }
    Todolist.update({_id: req.params.id}, data, function(err, raw) {
        if (err) {
            res.send(err);
        }
        res.redirect('/');
    });
}

//xoa 
exports.getTodolistDelete = (req, res, next) => {
    const ID = req.params.id;
    Todolist.findById(ID, function (err, resData) {
        console.log(" du lieu query %j", resData);
        res.render('./todolist/delete', {data: resData});
    }); 
}
// xoa voi method post
exports.postTodolistDelete = (req, res, next) => {
    console.log("chay toi xoa %j", req.params.id);
    Todolist.deleteOne({ _id: req.params.id }, function (err) {
        if(err) console.log(err);
        res.redirect('/');
      });
}
//danh sach todolist
exports.listTodolist = (req, res, next) => {
    console.log("chay toi day");
    Todolist.get(function (err, data){
        if(err){
            console.log('co loi xay ra');
        }else{
            // console.log(" du lieu query %j", data);
            res.render('index', {data:data});
        }
    })
}