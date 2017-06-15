import React from 'react'
import PropTypes from 'prop-types'
import ScrollBox from '../ScrollBox'
import ListBoxItem from './ListBoxItem'
import block from 'bem-cn'
import './style.less'

/**
 * ListBox component
 * @class
 */
class ListBox extends React.Component {
    /**
     * Properties
     * @static
     * @property {string} id The Textbox's id
     * @property {string} name The Textbox's name
     * @property {string} pattern Validation pattern
     * @property {string} placeholder The Textbox's placeholder
     * @property {bool} required Is required (value matches the pattern)
     * @property {string} tooltip Title or pattern description
     * @property {string} type Type of the input (text or password)
     * @property {string} value The Textbox's value
     * @property {function} onChange The Textbox's change handler
     */
    static propTypes = {
        items: PropTypes.array,
        selectedIndex: PropTypes.number,
        onChange: PropTypes.func
    };

    /**
     * Default properties
     * @static
     * @property {bool} required Default is required
     * @property {string} theme Default theme
     */
    static defaultProps = {
        items: [],
        required: false,
        selectedIndex: null,
        value: ''
    };

    handleOptionClick = (index) => {
        const { onChange } = this.props;

        // Avoid callback invocation if an item with specified index is already selected
        //if (onChange && index !== selectedIndex) {
        if (onChange) {
            onChange(index);
        }
    };

    /**
     * Renders the component
     * @returns {XML}
     */
    render() {
        const
            b = block('list-box'),
            {
                children,
                items,
                selectedIndex
            } = this.props;

        return (
            <div className={b()}>
                <ScrollBox>
                    {
                        items.length ? (
                            items.map((item, index) =>
                                <ListBoxItem
                                    index={index}
                                    key={index}
                                    selected={index === selectedIndex}
                                    onClick={this.handleOptionClick}
                                >{item}</ListBoxItem>
                            )
                        ) : (
                            children.map(child => child)
                        )
                    }
                </ScrollBox>
            </div>
        )
    }
}

export { ListBoxItem }
export default ListBox