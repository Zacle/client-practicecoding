import React, { Component } from 'react';
import {connect} from 'react-redux';
import {deauthenticate} from '../redux/actions/authActions';
import init from '../utils/initialize';
import {fetchTodos, removeTodo} from '../redux/actions/trainActions';
import Loading from '../components/loading';
import Layout from '../components/main/layout';
import TodoList from '../components/train/todos';


class Todos extends Component {

    constructor(props) {
        super(props);

        this.remove = this.remove.bind(this);
    }

    static getInitialProps(ctx) {
        init(ctx, true);
    }

    async componentDidMount() {
        await this.props.fetchTodos(this.props.auth.token);
    }

    async remove(id) {
        await this.props.removeTodo(id, this.props.auth.token);
    }

    render() {
        if (this.props.todos.error) {
            const title = "Practice Coding OJ";
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title}>
                    <div className="info container">
                        <div className="row justify-content-center">
                            <p className="error">{this.props.todos.error}</p>
                        </div>
                    </div>
                </Layout>
            );
        }
        else if (this.props.todos.todos) {
            const title = this.props.auth.user.username + " Todos List" + " | Practice Coding OJ";
            const description = `Todos list of ${this.props.auth.user.username} on Practice Coding OJ`;
            return (
                <Layout auth={this.props.auth} deauthenticate={this.props.deauthenticate} title={title} description={description}>
                    <div className="todos container">
                        <div className="row justify-content-center">
                            <TodoList todos={this.props.todos.todos} remove={this.remove} />
                        </div>
                    </div>
                </Layout>
            );
        }
        else {
            return (
                <Loading auth={this.props.auth} deauthenticate={this.props.deauthenticate} />
            );
        }
    }
}

const mapStateToProps = state => ({
        auth: state.authentication,
        todos: state.todos
    }
);

export default connect(
    mapStateToProps,
    {deauthenticate, fetchTodos, removeTodo}
)(Todos);