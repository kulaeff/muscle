import React from 'react'
import PropTypes from 'prop-types'
import block from 'bem-cn'

/**
 * ListBoxItem Component
 * @class
 */
class ListBoxItem extends React.Component {
    /**
     * Properties
     * @static
     * @property {number} id The id of the item
     * @property {bool} selected Is the item selected
     * @property {func} onClick Click event handler
     */
    static propTypes = {
        index: PropTypes.number,
        selected: PropTypes.bool,
        tooltip: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        index: null,
        selected: false,
        tooltip: ''
    };

    constructor(props) {
        super(props)
    }

    handleClick = (index) => {
        const { onClick } = this.props;

        if (onClick) {
            onClick(index);
        }
    };

    /**
     * Renders ListViewItem component
     */
    render() {
        const
            b = block('list-box'),
            { children, index, selected, tooltip } = this.props;

        return (
            <div
                className={b('option', {state: selected ? 'selected' : null})}
                title={tooltip}
                onClick={() => this.handleClick(index)}>
                {children}
            </div>
        )
    }
}

export default ListBoxItem