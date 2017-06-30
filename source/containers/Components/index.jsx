import React from 'react'
import ActionButton from '../../components/ActionButton'
import Button from '../../components/Button'
import ButtonGroup from '../../components/ButtonGroup'
import Checkbox from '../../components/Checkbox'
import Grid, { GridItem, GridSeparator } from '../../components/Grid'
import ListBox, { ListBoxItem } from '../../components/ListBox'
import Radio from '../../components/Radio'
import RadioGroup from '../../components/RadioGroup'
import Select from '../../components/Select'
import Spinner from '../../components/Spinner'
import SplitContainer, { SplitContainerPanel } from '../../components/SplitContainer'
import ScrollBox from '../../components/ScrollBox'
import Textbox from '../../components/Textbox'
import Title from '../../components/Title'
import Toggle from '../../components/Toggle'
import block from 'bem-cn'
import './style.less';

/**
 * Components container
 * @class
 */
class Components extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkboxChecked: true,
            listBoxDefaultItems: [...new Array(10).keys()].map(item => `Item ${item}`),
            listBoxCustomItems: [...new Array(10).keys()].map(item => {
                return {
                    label: `Item ${item}`,
                    price: item * 10
                }
            }),
            listBoxDefaultSelectedIndex: null,
            listBoxCustomSelectedIndex: null,
            radioValue: 0,
            selectArrayOfObjectsOptions: [...new Array(14).keys()].map(item => {
                return {
                    id: item,
                    label: `Option ${item}`
                }
            }),
            selectArrayOfStringsOptions: [...new Array(14).keys()].map(item => `Option_${item}`),
            selectArrayOfObjectsValue: null,
            selectArrayOfStringsValue: null,
            textBoxValue: '',
            toggleChecked: true,
        };
    }

    handleActionButtonClick = () => {
        console.info('ActionButton clicked');
    };

    handleButtonClick = () => {
        console.info('Button clicked');
    };

    handleRadioChange = (value) => {
        console.info('Radio clicked: ', value);

        this.setState({
            radioValue: value
        });
    };

    handleCheckboxChange = () => {
        console.info('Checkbox clicked');

        this.setState({
            checkboxChecked: !this.state.checkboxChecked
        });
    };

    handleListBoxDefaultChange = (index) => {
        console.info('List box item changed: ', this.state.listBoxDefaultItems[index]);

        this.setState({
            listBoxDefaultSelectedIndex: index
        });
    };

    handleListBoxCustomChange = (index) => {
        console.info('List box item changed: ', this.state.listBoxCustomItems[index]);

        this.setState({
            listBoxCustomSelectedIndex: index
        });
    };

    textBoxChange = (e) => {
        console.info('TextBox changed');

        this.setState({
            textBoxValue: e.target.value
        });
    };

    toggleChange = () => {
        console.info('Toggle changed');

        this.setState({
            toggleChecked: !this.state.toggleChecked
        });
    };

    selectArrayOfObjectsChange = (value, index) => {
        console.info(`Select changed | Value: ${value}, Index: ${index}`);

        this.setState({
            selectArrayOfObjectsValue: value
        });
    };

    selectArrayOfStringsChange = (value, index) => {
        console.info(`Select changed | Value: ${value}, Index: ${index}`);

        this.setState({
            selectArrayOfStringsValue: value
        });
    };

    /**
     * Renders Settings container
     * @method
     */
    render() {
        const
            b = block('components');

        return (
            <div className={b()}>
                <ScrollBox scrollBarPosition="outer">
                    <div className={b('title')}>
                        <Title primaryTitle="Components" />
                    </div>
                    <div className={b('container')}>
                        {/* ActionButton */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>ActionButton</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Default" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ActionButton
                                                    icon="add-24"
                                                    onClick={this.handleActionButtonClick}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ActionButton
                                                    disabled={true}
                                                    icon="add-24"
                                                    onClick={this.handleActionButtonClick}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Button */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Button</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Default" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Button
                                                    label="Button"
                                                    onClick={this.handleButtonClick}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Button
                                                    disabled={true}
                                                    label="Button"
                                                    onClick={this.handleButtonClick}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Auto-sized" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Button
                                                    label="Button"
                                                    size="stretch"
                                                    onClick={this.handleButtonClick}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* ButtonGroup */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>ButtonGroup</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Row Left" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ButtonGroup align="left">
                                                    <Button
                                                        label="Button 1"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                    <Button
                                                        label="Button 2"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                </ButtonGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Row Center" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ButtonGroup>
                                                    <Button
                                                        label="Button 1"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                    <Button
                                                        label="Button 2"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                </ButtonGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Row Right" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ButtonGroup align="left">
                                                    <Button
                                                        label="Button 1"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                    <Button
                                                        label="Button 2"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                </ButtonGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Row Opposite" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ButtonGroup align="opposite">
                                                    <Button
                                                        label="Button 1"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                    <Button
                                                        label="Button 2"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                </ButtonGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Column Left" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ButtonGroup align="left" flow="column">
                                                    <Button
                                                        label="Button 1"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                    <Button
                                                        label="Button 2"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                </ButtonGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Column Center" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ButtonGroup flow="column">
                                                    <Button
                                                        label="Button 1"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                    <Button
                                                        label="Button 2"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                </ButtonGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Column Right" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <ButtonGroup align="right" flow="column">
                                                    <Button
                                                        label="Button 1"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                    <Button
                                                        label="Button 2"
                                                        onClick={this.handleButtonClick}
                                                    />
                                                </ButtonGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Checkbox */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Checkbox</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Default" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Checkbox
                                                    checked={this.state.checkboxChecked}
                                                    label="Option"
                                                    onChange={this.handleCheckboxChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Checkbox
                                                    checked={this.state.checkboxChecked}
                                                    disabled={true}
                                                    label="Option"
                                                    onChange={this.handleCheckboxChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Radio */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Radio</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Default" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <RadioGroup flow="column">
                                                    <Radio
                                                        checked={this.state.radioValue === 0}
                                                        label="Option 1"
                                                        value={0}
                                                        onChange={this.handleRadioChange}
                                                    />
                                                    <Radio
                                                        checked={this.state.radioValue === 1}
                                                        label="Option 2"
                                                        value={1}
                                                        onChange={this.handleRadioChange}
                                                    />
                                                </RadioGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <RadioGroup flow="column">
                                                    <Radio
                                                        checked={this.state.radioValue === 0}
                                                        disabled={true}
                                                        label="Option 1"
                                                        value={0}
                                                        onChange={this.handleRadioChange}
                                                    />
                                                    <Radio
                                                        checked={this.state.radioValue === 1}
                                                        disabled={true}
                                                        label="Option 2"
                                                        value={1}
                                                        onChange={this.handleRadioChange}
                                                    />
                                                </RadioGroup>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* ListBox */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>ListBox</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Default" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <div style={{height: '16rem'}}>
                                                    <ListBox
                                                        items={this.state.listBoxDefaultItems}
                                                        selected={this.state.listBoxDefaultSelectedIndex}
                                                        onChange={this.handleListBoxDefaultChange}
                                                    />
                                                </div>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Custom" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <div style={{height: '16rem'}}>
                                                    <ListBox
                                                        selected={this.state.listBoxCustomSelectedIndex}
                                                        onChange={this.handleListBoxCustomChange}
                                                    >
                                                        {
                                                            this.state.listBoxCustomItems.map((item, index) =>
                                                                <ListBoxItem key={index}>
                                                                    {item.label} – ${item.price}
                                                                </ListBoxItem>
                                                            )
                                                        }
                                                    </ListBox>
                                                </div>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <div style={{height: '16rem'}}>
                                                    <ListBox
                                                        disabled={true}
                                                        selected={this.state.listBoxCustomSelectedIndex}
                                                        onChange={this.handleListBoxCustomChange}
                                                    >
                                                        {
                                                            this.state.listBoxCustomItems.map((item, index) =>
                                                                <ListBoxItem key={index}>
                                                                    {item.label} – ${item.price}
                                                                </ListBoxItem>
                                                            )
                                                        }
                                                    </ListBox>
                                                </div>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Select */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Select</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Array of strings" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Select
                                                    id="selectArrayOfStrings"
                                                    name="selectArrayOfStrings"
                                                    options={this.state.selectArrayOfStringsOptions}
                                                    placeholder="Select an option"
                                                    value={this.state.selectArrayOfStringsValue}
                                                    onChange={this.selectArrayOfStringsChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Array of objects" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Select
                                                    id="selectArrayOfObjects"
                                                    name="selectArrayOfObjects"
                                                    options={this.state.selectArrayOfObjectsOptions}
                                                    placeholder="Select an option"
                                                    value={this.state.selectArrayOfObjectsValue}
                                                    onChange={this.selectArrayOfObjectsChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Select
                                                    disabled
                                                    id="selectArrayOfObjects"
                                                    name="selectArrayOfObjects"
                                                    options={this.state.selectArrayOfObjectsOptions}
                                                    placeholder="Select an option"
                                                    value={this.state.selectArrayOfObjectsValue}
                                                    onChange={this.selectArrayOfObjectsChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Loading" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Select
                                                    id="selectArrayOfObjects"
                                                    loading
                                                    name="selectArrayOfObjects"
                                                    options={this.state.selectArrayOfObjectsOptions}
                                                    placeholder="Select an option"
                                                    value={this.state.selectArrayOfObjectsValue}
                                                    onChange={this.selectArrayOfObjectsChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Spinner */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Spinner</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Big" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <div style={{
                                                    height: '7rem',
                                                    position: 'relative'
                                                }}>
                                                    <Spinner active={true} size="big" />
                                                </div>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Medium" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <div style={{
                                                    height: '7rem',
                                                    position: 'relative'
                                                }}>
                                                    <Spinner active={true} />
                                                </div>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Small" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <div style={{
                                                    height: '7rem',
                                                    position: 'relative'
                                                }}>
                                                    <Spinner active={true} size="small"/>
                                                </div>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Textbox */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Textbox</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Default" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Textbox
                                                    id="textBox"
                                                    placeholder="Enter anything"
                                                    value={this.state.textBoxValue}
                                                    onChange={this.textBoxChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Textbox
                                                    disabled={true}
                                                    id="textBox"
                                                    placeholder="Enter anything"
                                                    value={this.state.textBoxValue}
                                                    onChange={this.textBoxChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Title */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Title</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Big" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Title primaryTitle="Header" size="large" />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Medium" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Title primaryTitle="Header" />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Small" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Title primaryTitle="Header" size="small"/>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Tiny" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Title primaryTitle="Header" size="tiny"/>
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                        {/* Toggle */}
                        <section className={b('section')}>
                            <span className={b('section-title')}>Toggle</span>
                            <div className={b('section-content')}>
                                <Grid>
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Default" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Toggle
                                                    checked={this.state.toggleChecked}
                                                    label="Toggle"
                                                    onChange={this.toggleChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                    <GridSeparator />
                                    <GridItem>
                                        <SplitContainer>
                                            <SplitContainerPanel size="auto">
                                                <Title primaryTitle="Disabled" size="tiny" />
                                            </SplitContainerPanel>
                                            <SplitContainerPanel>
                                                <Toggle
                                                    checked={this.state.toggleChecked}
                                                    disabled={true}
                                                    label="Toggle"
                                                    onChange={this.toggleChange}
                                                />
                                            </SplitContainerPanel>
                                        </SplitContainer>
                                    </GridItem>
                                </Grid>
                            </div>
                        </section>
                    </div>
                </ScrollBox>
            </div>
        )
    }
}

export default Components
