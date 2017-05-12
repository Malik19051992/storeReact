import React, {Component} from 'react';
import '../resources/css/loading.css'

export default function Loading() {
    return <div className="loading">

            <img className="loading-content" src={require('../resources/img/loading.gif')}/>

    </div>
}