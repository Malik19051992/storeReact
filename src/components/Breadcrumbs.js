import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Breadcrumbs extends Component {


    render() {
        if (this.props.links) {
            const breadcrumbsItems = this.props.links.map((item, index) =>
                <span key={index}><Link to={item.link} >{item.text}</Link>
                    {index !== this.props.links.length - 1 ? '  >' : ''}
                </span>
            )
            return (
                <div className="breadcrumbs">
                    {breadcrumbsItems}
                </div>)
        }
    }
}

export default Breadcrumbs