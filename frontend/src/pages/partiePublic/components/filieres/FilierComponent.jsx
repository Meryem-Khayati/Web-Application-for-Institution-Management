import React from 'react'
import './Style.css'

export default function FilierComponent(props) {
    return (
        <div>
            <div className="filier-info">
                <h1>{props.nom}</h1>
                <p>{props.nom}</p>
            </div>
        </div>
    )
}
