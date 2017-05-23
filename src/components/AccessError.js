import React, {Component} from 'react';
import '../resources/css/error.css'

class Error extends Component {
    state = {
        isShow: true,
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.errors.length > 0) {
            this.setState({isShow: true})
        }
    }

    closeButton = (event) => {
        this.setState({isShow: false});

    }

    render() {
        return (<div className={this.state.isShow ? "error-modal-page" : "error-modal-page-not-show"}>
            <div className="error-modal-page-content">
                <button className="error-close" onClick={this.closeButton}></button>
                <h2 className="error-title">Ошибка доступа</h2>
                <p>У вас недостаточно прав для использования этого модуля.</p>

            </div>
        </div>)

    }
}
export default Error
