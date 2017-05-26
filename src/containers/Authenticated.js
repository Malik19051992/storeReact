import React from 'react';
import {connect} from 'react-redux';
import AccessError from '../components/AccessError'
import {setBreadcrumbs} from '../redux/modules/breadcrumbs'


export function requireAuthentication(Component, roleIndexArray, props) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth(this.props.isAuthenticated);
            this.props.setBreadcrumbs(this.props.location.pathname)
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth(isAuthenticated) {
            if (!isAuthenticated) {
                this.props.history.push(`/login`)
            }
        }

        componentDidUpdate(prevProps) {
            this.props.setBreadcrumbs(this.props.location.pathname)
        }

        render() {
            return (
                <div>
                    {this.props.isAuthenticated === true && ~roleIndexArray.indexOf(this.props.role)
                        ? <Component {...this.props} />
                        : <AccessError/>
                    }
                </div>
            )
        }
    }

    const mapStateToProps = (state) => ({
        token: state.usersData.token,
        userName: state.usersData.name,
        isAuthenticated: state.usersData.isAuthenticated,
        role: state.usersData.role,
        otherProps: props
    });
    const mapDispatchToProps = dispatch => ({
        setBreadcrumbs: (path) => dispatch(setBreadcrumbs(path))
    })

    return connect(mapStateToProps, mapDispatchToProps)(AuthenticatedComponent);

}