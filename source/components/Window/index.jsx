import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '../Tabs'
import Title from '../Title'
import block from 'bem-cn'
import './style.less'

class Window extends React.Component {
    /**
     * Properties
     * @static
     * @prop {string} primaryTitle Primary title
     */
    static propTypes = {
        title: PropTypes.oneOfType(PropTypes.instanceOf(Title, Tabs)).isRequired,
    };

    /**
     * Default properties
     * @static
     */
    static defaultProps = {};

    /**
     * Render the component
     * @returns {XML}
     */
    render() {
        const
            b = block('window'),
            {
                children,
                title,
            } = this.props;

        return (
            <section className={b()}>
                {children}
            </section>
        )
    }
}

export default Window