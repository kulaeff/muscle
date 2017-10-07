import React from 'react'
import PropTypes from 'prop-types'
import Tabs from '../Tabs'
import Title from '../Title'
import cn from 'cn-decorator';
import './style.less'

@cn('window')
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
    render(cn) {
        const { children, title } = this.props;

        return (
            <section className={cn()}>
                {children}
            </section>
        )
    }
}

export default Window