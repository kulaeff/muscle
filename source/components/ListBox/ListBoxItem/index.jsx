import React from 'react'
import PropTypes from 'prop-types'
import cn from 'cn-decorator';

/**
 * ListBoxItem Component
 * @class
 */
@cn('list-box')
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
    render(cn) {
        const { children, index, selected, tooltip } = this.props;

        return (
            <div
                className={cn('item', {state: selected ? 'selected' : null})}
                title={tooltip}
                onClick={() => this.handleClick(index)}>
                {children}
            </div>
        )
    }
}

export default ListBoxItem