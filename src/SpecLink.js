import React from 'react';

const SpecLink = props => {
    let name = props.apiLinkData
    // let apiLink = props.apiLinkData.properties[0].url

    function handleClick() {
        props.updateDefinitionLink(name)
    }

    return (
        <div className="api-link" onClick={() => handleClick()}>
            {name}
        </div>
    )
}

export default SpecLink;