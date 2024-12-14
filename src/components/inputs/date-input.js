/**
 * Date component based on the given payload.
 * 
 * For range is present in given payload,
 * If no default value is given: it selects max value from payload else, current date in date picker.
 * If given default value is not within the range: it selects minimum or maximum value from payload depending on the given default value in date picker.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#inputdate
 */

import React from 'react';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Constants from '../../utils/constants';
import { PickerInput } from '../inputs';

export class DateInput extends React.Component {

	constructor(props) {
		super(props);

		this.payload = props.json;
		this.minDate = this.payload.min ? this.parseDateString(this.payload.min) : undefined;
		this.maxDate = this.payload.max ? this.parseDateString(this.payload.max) : undefined;
		this.parseHostConfig();
	}

	/**
	 * @description Parse hostconfig specific to this element
	 */
	parseHostConfig() {
		this.state = {
			chosenDate: this.getChosenDate(),
			modalVisible: false,
			modalVisibleAndroid: false,
			value: this.payload.value ? this.payload.value : Constants.EmptyString
		}

		this.state.setDate = this.setDate.bind(this);
	}

	/**
	 * @description Return chosen date value based on value and range present in payload.
	 */
	getChosenDate() {
		dateValue = this.payload.value && this.parseDateString(this.payload.value);
		if (dateValue) {
			if (this.minDate && dateValue < this.minDate) return this.minDate;
			if (this.maxDate && dateValue > this.maxDate) return this.maxDate;
			return dateValue;
		}
		return this.maxDate || new Date();
	}

	/**
	 * @description Updates the selected date
	 * @param {Date} newDate 
	 */
	setDate(newDate) {
		if (newDate !== undefined) {
			this.setState({
				chosenDate: newDate,
				value: newDate.getFullYear() + "-" +
					`${newDate.getMonth() + 1}`.padStart(2, '0') + "-" +
					`${newDate.getDate()}`.padStart(2, '0'),
				modalVisibleAndroid: false,
			});
		} else
			this.setState({ modalVisibleAndroid: false })
	}

	/**
	 * @description Toggles the DatePicker model visibility.
	 * @param {Boolean} visible 
	 */
	setModalVisible(visible) {
		this.setState({ modalVisible: visible });
	}

	/**
	 * @description Hides the DatePicker on close event
	 */
	handleModalClose = () => {
		this.setDate(this.state.chosenDate);
		this.setState({ modalVisible: false })
	}

	/**
	 * @description Updates the selected date from date picker model.
	 */
	handleDateChange = date => this.setDate(date)

	/**
	 * @description Displays Date Picker based on the platform.
	 */
	showDatePicker = () => {
		if (Platform.OS === Constants.PlatformIOS) {
			this.setState({ modalVisible: true });
		} else {
			this.setState({ modalVisibleAndroid: true });
		}
	}

	/**
	 * @description Return Date object from string.
	 * @param {String} dateString 
	 */
	parseDateString(dateString) {
		elements = dateString.split('-');
		//month ranges from 0 to 11, so subtract 1
		return new Date(elements[0], elements[1] - 1, elements[2])
	}

	render() {

		if (!this.props.configManager.hostConfig.supportsInteractivity) {
			return null;
		}

		return (
			<>
				<PickerInput
					json={this.payload}
					style={this.props.configManager.styleConfig.inputDate}
					value={this.state.value}
					placeholderTextColor={this.props.configManager.styleConfig?.inputDate?.placeholderTextColor}
					showPicker={this.showDatePicker}
					modalVisible={this.state.modalVisible}
					handleModalClose={this.handleModalClose}
					chosenDate={this.state.chosenDate || new Date()}
					minDate={this.minDate}
					maxDate={this.maxDate}
					handleDateChange={this.handleDateChange}
					mode='date'
					configManager={this.props.configManager}
				/>
				{
					this.state.modalVisibleAndroid &&
					<DateTimePicker
						mode="date"
						value={this.state.chosenDate}
						minimumDate={this.minDate}
						maximumDate={this.maxDate}
						onChange={(event, date) => this.setDate(date)}
					/>
				}
			</>
		);
	}
}

