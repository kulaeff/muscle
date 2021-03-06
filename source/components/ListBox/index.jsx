import React from 'react'
import PropTypes from 'prop-types'
import ScrollBox from '../ScrollBox'
import ListBoxItem from './ListBoxItem'
import cn from 'cn-decorator';
import './style.less'

/**
 * ListBox component
 * @class
 */
@cn('list-box')
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
        disabled: PropTypes.bool,
        items: PropTypes.array,
        selected: PropTypes.number,
        onChange: PropTypes.func.isRequired
    };

    /**
     * Default properties
     * @static
     * @property {bool} required Default is required
     * @property {string} theme Default theme
     */
    static defaultProps = {
        disabled: false,
        items: [],
        selected: null,
        value: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            height: '100%'
        }
    }

    componentDidMount() {
        this.setState({
            height: this.self.offsetHeight
        })
    }

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
    render(cn) {
        const { children, disabled, items, selected } = this.props;

        return (
            <div
                className={cn({state: disabled ? 'disabled' : null})}
                ref={element => this.self = element}
                tabIndex={0}
            >
                <ScrollBox height={this.state.height}>
                    {
                        items.length ? (
                            items.map((item, index) =>
                                <ListBoxItem
                                    index={index}
                                    key={index}
                                    selected={index === selected}
                                    onClick={this.handleOptionClick}
                                >{item}</ListBoxItem>
                            )
                        ) : React.Children.count(children) ? (
                            React.Children.map(children, (listBoxItem, index) => React.cloneElement(listBoxItem, {
                                index,
                                selected: index === selected,
                                onClick: this.handleOptionClick
                            }))
                        ) : null
                    }
                </ScrollBox>
            </div>
        )
    }
}

export { ListBoxItem }
export default ListBox