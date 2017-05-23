import React, {Component} from 'react';
import '../resources/css/footer.css'

class Footer extends Component {


    render() {
        return <footer>
            <div className="site-about">
                О сайте
            </div>
            <div className="contacts">
                Мои контакты

            </div>

            <div>
                Полезные ссылки

            </div>
        </footer>;
    }
}

export default Footer
