/**
 * FactSet Component.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#schema-factset
 */

import React from 'react';
import {
	View,
	StyleSheet,
} from 'react-native';

import ElementWrapper from '../elements/element-wrapper';
import * as Constants from '../../utils/constants';
import * as Utils from '../../utils/util';
import * as Enums from '../../utils/enums';
import { Label } from '../elements';

export class FactSet extends React.Component {

	constructor(props) {
		super(props);

		this.hostConfig = props.configManager.hostConfig;

		this.payload = props.json;
		// state
		this.state = {
			isMaximumWidthValueFound: false,
			keyWidth: '50%',
			valueWidth: '50%',
			maxWidth: 0,
		}
		this.viewSize = 0;
		this.maxWidth = 0;
		this.widthArray = [];
		this.currentWidth = 0;
	}

    /**
     * @description Measures the view size for Factset
     */
	measureView(event) {
		let titleWidth = event.nativeEvent.layout.width
		if(titleWidth > this.state.maxWidth) {
			this.setState({
				maxWidth: titleWidth
			})
		}
	}

	/**
     * @description Finds the width for Fact key and column value 
     */
	getFactSetWidthFromHostConfig() {
		let titleConfig = this.hostConfig.factSet.title;
		let valueConfig = this.hostConfig.factSet.value;
		if (!Utils.isNullOrEmpty(titleConfig.maxWidth) && (titleConfig.maxWidth !== 0) && Utils.isaNumber(titleConfig.maxWidth)) {
			if (titleConfig.maxWidth < (0.8 * this.viewSize)) {
				let currentValueWidth = this.viewSize - titleConfig.maxWidth;
				this.setFactSetWidthSize(titleConfig.maxWidth, currentValueWidth);
			} else {
				let currentTitleWidth = 0.8 * this.viewSize;
				let currentValueWidth = this.viewSize - currentTitleWidth;
				this.setFactSetWidthSize(currentTitleWidth, currentValueWidth);
			}
		} else if (!Utils.isNullOrEmpty(valueConfig.maxWidth) && (valueConfig.maxWidth !== 0) && Utils.isaNumber(valueConfig.maxWidth)) {
			if (valueConfig.maxWidth < (0.8 * this.viewSize)) {
				let currentTitleWidth = this.viewSize - valueConfig.maxWidth;
				this.setFactSetWidthSize(currentTitleWidth, valueConfig.maxWidth);
			} else {
				let currentValueWidth = 0.8 * this.viewSize;
				let currentTitleWidth = this.viewSize - currentTitleWidth;
				this.setFactSetWidthSize(currentTitleWidth, currentValueWidth);
			}
		} else {
			this.setFactSetWidthSize('50%', '50%');
		}
	}

	setFactSetWidthSize(titleWidth, valueWidth) {
		this.setState({
			keyWidth: titleWidth,
			valueWidth: valueWidth
		})
	}

    /**
     * @description Renders the Fact key and column value after width values are calculated.
     */
	parsePayload = (factSetJson) => {
		renderedElement = [];
		if (!this.payload)
			return renderedElement;

		// host config
		let titleConfig = this.hostConfig.factSet.title;
		let valueConfig = this.hostConfig.factSet.value;

		let spacing = this.hostConfig.getEffectiveSpacing(Enums.Spacing.Default)

		factSetJson.facts.map((element, index) => {
			renderedElement.push(
				<View style={[styles.textContainer]} key={`FACT-${element.title}-${index}`} accessible={true}>
					<View style={{
						marginRight: spacing,
						width: this.state.maxWidth == 0 ? null : this.state.maxWidth,
						maxWidth: '50%'
					}}>
						<Label
							text={element.title}
							size={titleConfig.size}
							weight={titleConfig.weight}
							color={titleConfig.color}
							isSubtle={titleConfig.isSubtle}
							wrap={titleConfig.wrap}
							configManager={this.props.configManager}
							onDidLayout={(event)=>this.measureView(event)}
							/>
					</View>
					<Label
						text={element.value}
						size={valueConfig.size}
						weight={valueConfig.weight}
						color={valueConfig.color}
						isSubtle={valueConfig.isSubtle}
						wrap={valueConfig.wrap}
						configManager={this.props.configManager}
						style={[styles.valueTextStyle, { width: this.state.valueWidth }]} />
				</View>
			);
		});

		return renderedElement;
	}

    /**
     * @description conditional render to check if width value is found
     */
	internalRenderer(containerJson) {
		let factSetObject = null;
		factSetObject = this.parsePayload(containerJson)
		return (
			<ElementWrapper configManager={this.props.configManager} json={containerJson} isFirst={this.props.isFirst}>
				<View style={[styles.container]}>
					{factSetObject}
				</View>
			</ElementWrapper>
		);
	}

	render() {
		this.payload = this.props.json;
		let factSetContainer = this.internalRenderer(this.props.json);
		return factSetContainer;
	}
};

const styles = StyleSheet.create({
	container: {
		flexDirection: Constants.FlexColumn,
		backgroundColor: 'transparent',
	},
	textContainer: {
		flexDirection: Constants.FlexRow,
		backgroundColor: 'transparent',
		marginVertical: 2 // TODO :: This property will be supported via HostConfig in future and removed from here
	},
	valueTextStyle: {
		paddingLeft: 5,
	}
});
