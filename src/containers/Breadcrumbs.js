import React, {Component} from 'react'
import {connect} from 'react-redux'
import Breadcrumbs from '../components/Breadcrumbs'


class BreadcrumbsContainer extends Component {

    render() {
        return <Breadcrumbs {...this.props}/>
    }
}

const mapStateToProps = state => ({
    links: state.breadcrumbsData.links
})


export default connect(mapStateToProps)(BreadcrumbsContainer)


