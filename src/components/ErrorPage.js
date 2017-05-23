import React, {Component} from 'react';
import '../resources/css/error.css'

class Error extends Component {

    state = {
        isShow: true,
        errors: []
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors !== this.props.errors) {
            this.setState({errors: nextProps.errors});
        }
        if (this.state.errors.length > 0) {
            this.setState({isShow: true})
        }
    }

    closeButton = (event) => {
        if (this.state.errors.length === 0)
            this.setState({isShow: false});
        this.props.removeError(0);
    }

    render() {
        if (this.state.errors.length > 0)
            return (<div className={this.state.isShow ? "error-modal-page" : "error-modal-page-not-show"}>
                <div className="error-modal-page-content">
                    <button className="error-close" onClick={this.closeButton}></button>
                    <h2 className="error-title">Error</h2>
                    <p>Если данная ошибка появляется многократно, пожалуйста сообщите разработчикам</p>
                    <p>{this.props.errors[0].message}</p>
                    <p>{//this.props.errors[0].stack
                        }</p>
                </div>
            </div>)
        else
            return <div></div>;
    }
}

export default Error
