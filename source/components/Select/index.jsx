import React from 'react'
import PropTypes from 'prop-types'
import ScrollBox from '../../components/ScrollBox'
import Spinner from '../../components/Spinner'
import block from 'bem-cn'
import './style.less'

/**
 * Select component
 * @class
 */
class Select extends React.Component {
    /**
     * Textbox's properties
     * @static
     * @property {string} id The Textbox's id
     * @property {string} name The Textbox's name
     * @property {string} placeholder The Textbox's placeholder
     * @property {bool} required Is required (value matches the pattern)
     * @property {string} tooltip Title or pattern description
     * @property {string} value The Textbox's value
     * @property {function} onChange The Textbox's change handler
     */
    static propTypes = {
        disabled: PropTypes.bool,
        id: PropTypes.string.isRequired,
        labelKey: PropTypes.string,
        loading: PropTypes.bool,
        multiple: PropTypes.bool,
        name: PropTypes.string,
        options: PropTypes.array.isRequired,
        placeholder: PropTypes.string,
        tooltip: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        valueKey: PropTypes.string,
        onChange: PropTypes.func
    };

    /**
     * Textbox's default properties
     * @static
     * @property {bool} required Default is required
     * @property {string} theme Default theme
     */
    static defaultProps = {
        disabled: false,
        labelKey: 'label',
        loading: false,
        multiple: false,
        placeholder: '',
        required: false,
        valueKey: 'id'
    };

    constructor(props) {
        super(props);

        this.state = {
            active: false,
            option: null
        }
    }

    componentWillMount() {
        this.valueToOption(this.props.value);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.value !== this.props.value) {
            this.valueToOption(nextProps.value);
        }
    }

    componentWillUnmount() {
        this.toggleOutsideEvents(false);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.active !== this.state.active) {
            this.toggleOutsideEvents(nextState.active);
        }
    }

    handleClickOutsideEvent = (e) => {
        if (!this.self.contains(e.target)) {
            this.setState({
                active: false,
            });
        }
    };

    handleScrollOutsideEvent = (e) => {
        if (!this.self.contains(e.target)) {
            this.setState({
                active: false,
            });
        }
    };

    toggleOutsideEvents = (enabled) => {
        if (enabled) {
            document.addEventListener('mousedown', this.handleClickOutsideEvent);
            document.addEventListener('wheel', this.handleScrollOutsideEvent);
        } else {
            document.removeEventListener('mousedown', this.handleClickOutsideEvent);
            document.removeEventListener('wheel', this.handleScrollOutsideEvent);
        }
    };

    handleControlClick = (e) => {
        const { disabled } = this.props;

        if (!disabled && e.button === 0) {
            this.setState({
                active: true
            });

            e.stopPropagation();
        }
    };

    handleOptionClick = (value, index) => {
        const { onChange } = this.props;

        this.setState({
            active: false,
        });

        if (onChange) {
            onChange(value, index);
        }
    };

    handleOptionMouseDown = (e) => {
        e.stopPropagation();
    };

    valueToOption = (value) => {
        const { labelKey, options, valueKey } = this.props;

        if (value && (value >= 0 || value.length > 0)) {
            if (options.every(option => typeof option === 'object')) {
                this.setState({
                    option: options.find(option => option[valueKey] === value)[labelKey]
                });
            } else {
                this.setState({
                    option: value
                });
            }
        }
    };

    /**
     *
     * Renders the component
     * @method
     */
    render() {
        const
            b = block('select'),
            {
                disabled,
                id,
                labelKey,
                loading,
                name,
                placeholder,
                options,
                tooltip,
                value,
                valueKey
            } = this.props;

        return (
            <div
                className={b({
                    mode: disabled || loading ? 'disabled' : null,
                    state: this.state.active ? 'active' : null
                })}
                title={tooltip}
                id={id}
                ref={element => this.self = element}
            >
                <input
                    id={id}
                    name={name}
                    type="hidden"
                    value={value ? value : 0}
                />
                <div className={b('control')} onMouseDown={(e) => this.handleControlClick(e)}>
                    {
                        loading ? (
                            <span className={b('spinner')}>
                                <Spinner active={loading} size="small"/>
                            </span>
                        ) : (
                            value && (value >= 0 || value.length > 0) ? (
                                <span className={b('value')}>{this.state.option}</span>
                            ) : (
                                !disabled && <span className={b('placeholder')}>{placeholder}</span>
                            )
                        )
                    }
                    <span className={b('arrow')} />
                </div>
                {
                    this.state.active && (
                        <div className={b('dropdown')}>
                            <ScrollBox>
                                <ul className={b('options')}>
                                    {
                                        options.length > 0 && options.map((option, index) =>
                                            typeof option === 'string' ? (
                                                <li
                                                    className={b('option', {state: option === value ? 'selected' : null})}
                                                    key={index}
                                                    onClick={() => this.handleOptionClick(option, index)}
                                                    onMouseDown={(e) => this.handleOptionMouseDown(e)}
                                                >{option}</li>
                                            ) : (
                                                <li
                                                    className={b('option', {state: option[valueKey] === value ? 'selected' : null})}
                                                    key={index}
                                                    onClick={() => this.handleOptionClick(option[valueKey], index)}
                                                    onMouseDown={(e) => this.handleOptionMouseDown(e)}
                                                >{option[labelKey]}</li>
                                            )
                                        )
                                    }
                                </ul>
                            </ScrollBox>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Select