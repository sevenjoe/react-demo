import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';


const app = express();
app.use(bodyParser.json());
const dbUrl = 'mongodb://localhost';

//后台验证
const validate = data => {

    let errors = {};

    //验证提交数据是否合法,判断表单是否有值,没有值则添加错误属性
    if (data.title === '') {
        errors.title = "title can't be empty"
    }
    if (data.cover === '') {
        errors.cover = "cover can't be empty"
    }

    // Object.keys是拿到所有对象的属性名,然后返回一个数组.如果数组长度 ===0 就是true,没有错误,是合法的可以提交.
    const isValid = Object.keys(errors).length === 0;

    return {errors, isValid}
};


//mongodb连接数据库
mongodb.MongoClient.connect(dbUrl, (err, client) => {
    if (err) throw err;
    const db = client.db('crud');

    //当GamePage挂载后的请求
    app.get('/api/games', (req, res) => {
        db.collection('games').find({}).toArray((err, games) => {
            res.json({games});
        })
    });

    //这里是处理点击edit后发送的请求,目的是找到传过来的ID对应的数据,然后返回,填充到GameForm表单里面.
    app.get('/api/games/:_id', (req, res) => {
        db.collection('games').findOne({_id: new mongodb.ObjectID(req.params._id)}, (err, game) => {
            res.json({game})
        })
    });

    //删除一条记录
    app.delete('/api/games/:_id', (req, res) => {
        db.collection('games').deleteOne({_id: new mongodb.ObjectID(req.params._id)}, (err, game) => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }
            res.json({});
        })
    });

    //对应GameForm修改数据后提交的动作,根据ID找到并更新数据库
    app.put('/api/games/:_id', (req, res) => {
        const {errors, isValid} = validate(req.body);
        if (isValid) {
            const {title, cover} = req.body;
            db.collection('games').findOneAndUpdate(
                {_id: new mongodb.ObjectID(req.params._id)},
                {$set: {title, cover}},
                {returnOriginal: false},
                (err, result) => {
                    if (err) {
                        res.status(500).json({errors: {global: err}});
                        return;
                    }
                    res.json({game: result.value})

                }
            )
        } else {
            res.status(400).json({errors})
        }
    });

    //对应GameForm创建一条数据后的动作
    app.post('/api/games', (req, res) => {
        const {errors, isValid} = validate(req.body);
        // console.log({errors});

        if (isValid) {
            const {title, cover} = req.body;
            db.collection('games').insert({title, cover}, (err, result) => {
                if (err) {
                    res.status(500).json({errors: {global: "Something went wrong"}})
                } else {
                    res.json({game: result.ops[0]});
                }
            })
        } else {
            res.status(400).json({errors: errors})
        }
    });

    //访问没有定义的路由走这里
    app.use((req, res) => {
        res.status(301).redirect('/games')/*.json({
            errors: {
                global: "Still working on it.Please try again later than when we implement it"
            }
        })*/
    });

    app.listen(8080, () => console.log('Server is running on localhost:8080'))

});
