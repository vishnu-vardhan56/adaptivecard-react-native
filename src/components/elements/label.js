/**
 * @component Label
 * @description Generic Label component that can be used wherever `text` needs to be rendered.
 *              Props passed to this component determine the text behaviour.
 */

import React from 'react';

import MarkDownFormatter from '../../utils/markdown-formatter';
import { TextFormatter } from '../../utils/text-formatters';
import { InputContext } from '../../utils/context';
import * as Utils from '../../utils/util';
import * as Enums from '../../utils/enums';

export class Label extends React.Component {

	static contextType = InputContext;

	render() {
		this.hostConfig = this.props.configManager.hostConfig;
		let { text, altText, wrap, maxLines, onDidLayout, isRequired, align } = this.props;

		// parse & format DATE/TIME values
		let lang = this.context.lang;
		let formattedText = TextFormatter(lang, text);

		// received style
		let receivedStyle = this.props.style;

		// compute style from props
		const [computedStyle, extraStyles] = this.getComputedStyle();

		// number of lines
		let numberOfLines = wrap ? (maxLines != undefined ? maxLines : 0) : 1;
		let clickProps;
		if (this.props.onClick) {
			clickProps = { onClick: this.props.onClick }
		}
		return (
			<MarkDownFormatter
				defaultStyles={[computedStyle, receivedStyle]}
				extraStyles={extraStyles}
				numberOfLines={numberOfLines}
				text={formattedText}
				isRequired={!!isRequired}
				altText={altText}
				onDidLayout={onDidLayout}
				textAlign={align?.toLowerCase()}
				{...clickProps} />
		)
	}

	/**
	 * @description Parse the host config specific props 
	 */
	getComputedStyle = () => {
		const { size, weight, color, isSubtle, fontStyle, align } = this.props;
		let { containerStyle } = this.props;

		// font-style
		const fontStyleValue = this.hostConfig.getTextFontStyle(Utils.parseHostConfigEnum(
			Enums.FontStyle,
			fontStyle,
			Enums.FontStyle.Default
		));

		// font-size
		const fontSize = this.hostConfig.getTextFontSize(Utils.parseHostConfigEnum(
			Enums.TextSize,
			size,
			Enums.TextSize.Default
		), fontStyleValue);

		// font-weight
		const fontWeight = this.hostConfig.getTextFontWeight(Utils.parseHostConfigEnum(
			Enums.TextWeight,
			weight,
			Enums.TextWeight.Default
		), fontStyleValue);

		const fontFamilyValue = fontStyleValue.fontFamily;

		// text-color
		if (Utils.isNullOrEmpty(containerStyle)) {
			containerStyle = "default";
		}
		let colorEnum = Utils.parseHostConfigEnum(
			Enums.TextColor,
			color,
			Enums.TextColor.Default
		);
		let colorDefinition = this.hostConfig.getTextColorForStyle(colorEnum, containerStyle);
		let colorValue = isSubtle ? colorDefinition.subtle : colorDefinition.default;

		// horizontal text alignment
		const textAlign = this.hostConfig.getTextAlignment(Utils.parseHostConfigEnum(
			Enums.HorizontalAlignment,
			align,
			Enums.HorizontalAlignment.Left
		));

		// line-height
		const lineHeight = this.hostConfig.getTextLineHeight(Utils.parseHostConfigEnum(
			Enums.TextSize,
			size,
			Enums.TextSize.Default
		));

		// required asterisk style
		const requiredTextStyle = this.hostConfig.getTextColorForStyle(Enums.TextColor.Attention, Enums.ContainerStyle.Default);

		return [{
			fontSize,
			fontWeight: fontWeight.toString(),
			fontFamily: fontFamilyValue,
			color: colorValue,
			textAlign,
			lineHeight
		}, {
			requiredTextStyle
		}];
	}
}