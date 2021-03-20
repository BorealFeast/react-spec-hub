import React from 'react';
import SpecLink from './SpecLink.js'

const Sidebar = props => {
    let specLinks = []

    if (props.definitionList === null) {
        props.getOrganizationData()
    } else {
        for (let i = 0; i < props.definitionList.length; i++) {
                specLinks.push(
                    <SpecLink
                        key={i}
                        apiLinkData={props.definitionList[i]}
                        updateDefinitionLink={props.updateDefinitionLink}
                    />
                )
        }
    }

    return (
        <div className="side-bar">
            <div className="side-bar-header">
                <h1>Borealfeast API Hub</h1>
            </div>
            <div className="side-bar-body">
                <h3>Specs</h3>
                {specLinks}
            </div>
        </div>
    )
}

export default Sidebar;