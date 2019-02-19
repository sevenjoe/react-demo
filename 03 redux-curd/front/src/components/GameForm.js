import React, {Component} from 'react';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {saveGame, fetchGame, updateGame} from "../actions";
import {Redirect} from "react-router-dom";

class GameForm extends Component {
    state = {
        _id: this.props.game ? this.props.game._id : null,
        title: this.props.game ? this.props.game.title : '',
        cover: this.props.game ? this.props.game : '',
        errors: {},
        loading: false,
        done: false
    };

    componentDidMount() {
        //index.js中的Route会把match对象传进来,通过解构赋值从this.props中获取
        //这里是判断点击Edit还是点击AddNewGame后挂载的gameform组件,如果是Edit就要发送请求,
        //去获取对应ID的title,cover值,然后填充到表单中.
        const {match} = this.props;
        if (match.params._id) {
            this.props.fetchGame(match.params._id)
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            _id: nextProps.game._id,
            title: nextProps.game.title,
            cover: nextProps.game.cover
        })
    }

    handleChange = (e) => {

        /*[e.target.name],加上[]代表把'title'作为键名也就是当做title,然后去给title重新赋值.
        ['title']相当于对象当中的title,属性名.*/

        if (!!this.state.errors[e.target.name]) {
            /*当文本框变化的时候如果state里面有errors,就清空errors*/
            let errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({[e.target.name]: e.target.value, errors: errors})
        } else {
            this.setState({[e.target.name]: e.target.value})
        }

    };

    handleSubmit = (e) => {
        e.preventDefault();

        //前端验证,当提交表单的时候判断是否有值,没有值就添加一个错误属性.
        let errors = {};
        if (this.state.title === '') {
            errors.title = "title can't be empty"
        }

        if (this.state.cover === '') {
            errors.cover = "cover can't be empty"
        }

        this.setState({errors});

        const isValid = Object.keys(errors).length === 0;
        //Object.keys是拿到所有对象的属性名,然后返回一个数组.如果 ===0 就是true 是合法的可以提交.

        if (isValid) {
            const {_id, title, cover} = this.state;
            this.setState({loading: true});

            //这里是判断修改数据后提交,还是创建数据后提交,因为用的都是一个GameForm表单.
            if (_id) {
                this.props.updateGame({_id,title, cover}).then(
                    () => {
                        this.setState({done: true})
                    }, (err) => err.response.json().then(({errors}) => {
                        this.setState({errors: errors, loading: false});
                    })
                )
            } else {
                //发送fetch请求,把请求参数带给/action/index.js里的saveGame
                this.props.saveGame({title, cover}).then(
                    //成功后的回调
                    () => {
                        this.setState({done: true})
                    },

                    //请求出错后的回调
                    (err) => err.response.json().then(({errors}) => {
                        this.setState({errors: errors, loading: false});
                        // console.log({errors})
                    })
                    /*可以把函数体内的errors看做一个变量,如果函数体内没定义会先在形参里面找,
                      相当于在函数体内声明let errors = _ref.errors,
                     找不到再沿着作用域链找.

                     err.response.json()是fetch请求失败后返回对象{errors:{global:"still..."}},
                     then方法在此是给回调函数传值是解构赋值.
                     后面then方法的回调函数形参最好是{errors}对象的格式,
                     如果是errors,不加大括号,setState()里面的键errors取到的值就是{errors:{global:"still..."}},
                     这时通过this.state.errors.global就会获取不到global,除非这样this.state.errors.errors.global,
                     但是这样就提示语法错误了*/
                )
            }
        }
    };

    render() {

        const form = (
            (
                <form className={classnames("ui form", {loading: this.state.loading})} onSubmit={this.handleSubmit}>
                    <h1>Add new game</h1>

                    {/*如果请求的路由没有定义会返回global,存在global就是true,即添加一个div显示global错误信息*/}
                    {!!this.state.errors.global &&
                    <div className='ui negative message'>{this.state.errors.global}</div>}

                    <div className={classnames('field', {error: !!this.state.errors.title})}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            name='title'
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                        <span>{this.state.errors.title}</span>
                    </div>

                    <div className={classnames('field', {error: !!this.state.errors.cover})}>
                        <label htmlFor="title">Cover Url</label>
                        <input
                            type="text"
                            name='cover'
                            value={this.state.cover}
                            onChange={this.handleChange}
                        />
                        <span>{this.state.errors.cover}</span>
                    </div>

                    <div className='field'>
                        {this.state.cover !== "" &&
                        <img src={this.state.cover} alt="cover" className='ui small bordered image'/>}
                    </div>

                    <div className='field'>
                        <button className='ui primary button'>Save</button>
                    </div>
                </form>
            )
        );
        return (
            <div>
                {this.state.done ? <Redirect to='/games'/> : form}
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    const {match} = props;
    if (match.params._id) {
        return {
            game: state.games.find(item => item._id === match.params._id)
        };
    }
    return {game: null}
};


export default connect(mapStateToProps, {saveGame, fetchGame, updateGame})(GameForm)