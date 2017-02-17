import React from 'react';
import classNames from 'classnames';
import { scrollTop, on } from 'dom-lib';
import { Router, Route, Link } from 'react-router';
import { Header, Navbar, Nav } from 'rsuite';


const NAV_LINKS = [
    {
        link: '/',
        title: '首页'
    }, {
        link: '/getting-started',
        title: '介绍'
    }, {
        link: '/components',
        title: '组件'
    }, {
        link: '/examples',
        title: '示例'
    }];

const DocHeader = React.createClass({
    propTypes: {
        activePage: React.PropTypes.string
    },
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            overflow: false
        };
    },
    componentDidMount() {
        this._onWindowScrollListener = on(window, 'scroll', this.handleWindowScroll);
    },
    componentWillUnmount() {
        if (this._onWindowScrollListener) {
            this._onWindowScrollListener.off();
        }
    },
    handleWindowScroll() {

        if (scrollTop(window) > 30) {
            this.setState({
                overflow: true
            });
            return;
        }

        this.setState({
            overflow: false
        });
    },
    render() {

        let links = NAV_LINKS.map((nav, index) => {

            let isActive = this.context.router.isActive(nav.link) && (nav.link !== '/');

            return (
                <li className={isActive ? 'active' : null} key={index} >
                    <Link to={nav.link}>{nav.title}</Link>
                </li>
            );
        });

        let classes = classNames({
            'doc-header': true,
            'overflow': this.state.overflow
        });

        return (
            <Header className={classes} inverse>
                <div className="container">
                    <Navbar.Header>
                        <Navbar.Brand>
                            <a href="#"><span className="prefix">R</span>Suite</a>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav>
                            {links}
                        </Nav>
                        <Nav pullRight>
                            <Nav.Item href="https://github.com/rsuite/rsuite"><i className="fa fa-github"></i> GitHub</Nav.Item>
                        </Nav>
                    </Navbar.Collapse>
                </div>
            </Header>
        );
    }
});

export default DocHeader;
