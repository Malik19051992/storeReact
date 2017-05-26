import React, {Component} from 'react';
import '../resources/css/footer.css'
import {Link} from 'react-router-dom';

class Footer extends Component {


    render() {
        return (<footer>
            <div className="site-about">
                <h3>О сайте:</h3>
                Грузинский Валентин Иосифович  &#169; 2017 {new Date().getYear() > 2007 ? ' - ' + new Date().getYear() : ''} г.<br/>
                По всем вопросам пишите в skyre, на почту или звоните на мобильный телефон<br/>
                Используя данный сайт, Вы обязуетесь выполнять условия <Link to="/termsOfUse"> этого Соглашения</Link>

            </div>
            <div className="contacts">
                <h3>Мои контакты: </h3>
                E-mail: malik_19_05_1992@mail.ru<br/>
                Моб. тел: +375 29 820 84 74<br/>
                Skypе: malik_19_05_1992
            </div>

        </footer>);
    }
}

export default Footer
