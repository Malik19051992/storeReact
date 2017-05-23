import React from 'react';
import {connect} from 'react-redux';
import AccessError from '../components/AccessError'


export function requireAuthentication(Component, roleIndexArray, props) {

    class AuthenticatedComponent extends React.Component {

        componentWillMount() {
            this.checkAuth(this.props.isAuthenticated);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.isAuthenticated);
        }

        checkAuth(isAuthenticated) {
            if (!isAuthenticated) {
                this.props.history.push(`/login`)
            }
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

    return connect(mapStateToProps)(AuthenticatedComponent);

}