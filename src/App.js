import React, {Component} from 'react';
import './App.css'
import SwaggerUI from 'swagger-ui';
import StandalonePreset from 'swagger-ui/dist/swagger-ui-standalone-preset'
import Sidebar from './Sidebar.js'
import '../node_modules/swagger-ui/dist/swagger-ui.css'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            organizationConfig: null,
            definitionList: null,
            //TODO get rid of the dafault
            definitionLinks: [{
                url: "https://petstore.swagger.io/v2/swagger.json",
                name: "Pet Store"
            }]
        }

        //hard coded api-spec-service
        this.host = "http://localhost:9093/"
        this.getServices = this.getServices.bind(this)
        this.getOrganizationData = this.getOrganizationData.bind(this)
        this.updateDefinitionLink = this.updateDefinitionLink.bind(this)
        this.request = this.request.bind(this)
    }

    componentWillMount() {
        const services = this.getServices();
        if(services.length) {
            this.updateDefinitionLink(services[0])
        }
    }

    componentDidUpdate() {
        SwaggerUI({
            domNode: document.getElementById("api-data"),
            presets: [
                SwaggerUI.presets.apis,
                StandalonePreset
            ],
            layout: "StandaloneLayout",
            urls: this.state.definitionLinks,
        })
    }

    getServices() {
        let url = this.host + "api/v1/services-specs"
        return this.request('GET', url);
    }

    getServiceSpec(service) {
        let url = this.host + "api/v1/services-specs/" + service
        return this.request('GET', url);
    }

    request(method, url) {
        return fetch(url, {
            method: method
        }).then(response => {
            if (response.ok) {
                return response.json()
            }
            throw new Error('There was an issue requesting the API')
        }).then(json => {
            return json
        })
    }

    getOrganizationData() {

        this.getServices().then(response => {
            response.push("api-schedule");
            response.push("api-approval-requests");
            response.push("api-chat");
            response.push("Legacy");
            this.setState({
                definitionList: response
            })
        })
    }

    updateDefinitionLink(newLink) {

        this.getServiceSpec(newLink).then(response => {
            this.setState({
                definitionLinks: response.specifications.map(specification => ({
                    name: specification.version? newLink+ " [ " + specification.version + " ]": null,
                    url: specification.url
                }))
            })
        })
    }

    render() {
        return (
            <div className="App">
                <Sidebar
                    organizationConfig={this.state.organizationConfig}
                    definitionList={this.state.definitionList}
                    updateDefinitionLink={this.updateDefinitionLink}
                    getOrganizationData={this.getOrganizationData}
                />
                <div id="api-data"/>
            </div>
        );
    }
}

export default App;