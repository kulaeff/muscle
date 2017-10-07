import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';
import './style.less'

@cn('placeholder')
class Placeholder extends React.Component {
    /**
     * Properties
     * @static
     * @prop {string} text Text
     */
    static propTypes = {
        text: PropTypes.string.isRequired
    };

    /**
     * Render component
     * @returns {XML} Component
     */
    render(cn) {
        const { text } = this.props;

        return (
            <span className={cn()}>{text}</span>
        )
    }
}

export default Placeholder