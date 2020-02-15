import React from "react";
import ReactDOM from "react-dom";
import { Layout, Input, Row, Col, message } from "antd";
import Inspector from 'react-json-inspector';
import { AiOutlineGithub } from "react-icons/ai";
import "react-json-inspector/json-inspector.css";
import "./index.css"

const { Header, Content } = Layout;
const { TextArea } = Input;

class App extends React.Component {
    render() {
        return (
            <div>
                <Layout>
                    <Header>
                        <Title />
                        <GithubLink />
                    </Header>
                    <Content>
                        <JsonContent />
                    </Content>
                </Layout>
            </div>
        )
    }
}

class Title extends React.Component {
    render() {
        return (
            <div className="title">
                <span>
                    Find Element Path in Json
                </span>
            </div>
        )
    }
}

class GithubLink extends React.Component {
    render() {
        return (
            <div className="github">
                <a href="https://github.com/igzhang/json_path">
                    <AiOutlineGithub />
                </a>
            </div>
        )
    }
}

class JsonContent extends React.Component {

    constructor(props) {
        super(props);
        const json_example = {"key1": 123, "key2": "it is a example"};
        this.state = {
            json_object: json_example,
        };
    }

    onInputChange = (data) => {
        this.setState({json_object: data})
    }

    render() {
        return (
            <div>
                <Row gutter={16}>
                    <Col span={12}>
                        <JsonInput onInputChange={this.onInputChange} />
                    </Col>
                    <Col span={12}>
                        <JsonOutput json_object={this.state.json_object} />
                    </Col>
                </Row>
            </div>
        )
    }
}

class JsonInput extends React.Component {

    onChange = (e) => {
        let json_object;
        try {
            json_object = JSON.parse(e.target.value);
        } catch(err) {
            json_object = err.message;
        }
        this.props.onInputChange(json_object);
    }

    render() {
        return (
            <div>
                <TextArea 
                    allowClear 
                    autoSize={{ minRows: 30 }} 
                    placeholder="input json data" 
                    onChange={this.onChange}
                />
            </div>
        )
    }
}

class JsonOutput extends React.Component {

    validateQuery = (query) => {
        return true
    }

    onClick = (copyData) => {
        const container = document.createElement('textarea');
        container.innerHTML = copyData.path;
        document.body.appendChild(container);
        container.select();
        document.execCommand('copy');

        message.success('copy path success!');
        document.body.removeChild(container);
    }

    render() {
        return (
            <div>
                <Inspector 
                    data={this.props.json_object} 
                    onClick={this.onClick}
                    validateQuery={this.validateQuery}
                />
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById("root"));
