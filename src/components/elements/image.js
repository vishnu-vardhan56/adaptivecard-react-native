/**
 * Image Element.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#schema-image
 */

import React from 'react';
import {
	StyleSheet,
	Image,
	View
} from 'react-native';

import * as Utils from '../../utils/util';
import * as Enums from '../../utils/enums';
import * as Constants from '../../utils/constants';
import ElementWrapper from '../elements/element-wrapper';
import { SelectAction } from '../actions';
import {
	InputContext,
	InputContextConsumer
} from '../../utils/context';
import { BaseImage } from './base-image';

export class Img extends React.Component {

	static contextType = InputContext;

	constructor(props) {
		super(props);
		this.payload = props.json;
		this.hostConfig = props.configManager.hostConfig;
		this.styleConfig = props.configManager.styleConfig;
		this.addResourceInformation = undefined;
		this.state = {
			imageWidth: 0,
			imageHeight: 0,
		}
	}

	componentDidMount() {
        if (this.addResourceInformation) {
		    this.addResourceInformation(this.payload.url, "");
        }
	}

	/**
	 * @description Parse hostconfig specific to this element
	 */
	parseHostConfig() {

		this.altText = this.payload.altText || Constants.EmptyString;
		this.horizontalAlignment = this.getImageAlignment();
		this.selectAction = this.payload.selectAction || null;
		if (Utils.isNullOrEmpty(this.payload.size)) {
			this.isSizeUndefined = true;
			this.payload.size = Constants.Auto;
		}

		this.type = this.payload.type || Constants.EmptyString;
		let imageUrl = this.payload.url || Constants.EmptyString

		this.url = Utils.getImageUrl(imageUrl)
		this.id = this.payload.id || Constants.EmptyString;
		const spacingValue = Utils.parseHostConfigEnum(
			Enums.Spacing,
			this.payload.spacing,
			Enums.Spacing.Small);
		this.spacing = this.hostConfig.getEffectiveSpacing(spacingValue);
		this.separator = this.payload.separator || false;
		this.backgroundColor = Utils.hexToRGB(this.payload.backgroundColor) || Constants.TransparentString;
	}

	/**
	 * @description This function determines the style of the image. Default value is "Default"
	 */
	isPersonStyle() {
		let styleValue = Utils.parseHostConfigEnum(
			Enums.ImageStyle,
			this.payload.style,
			Enums.ImageStyle.Default);
		return parseInt(styleValue, 10) === 0 ? false : true;
	}
	/**
	 * @description The function is used for determining the horizontal image Alignment
	 */
	getImageAlignment() {
		let imageAlignmentStyle = [];

		switch (this.payload?.horizontalAlignment?.toLowerCase()) {
			case Constants.CenterString:
				imageAlignmentStyle.push(styles.centerAlignment);
				break;
			case Constants.RightString:
				imageAlignmentStyle.push(styles.rightAlignment);
				break;
			default:
				imageAlignmentStyle.push(styles.leftAlignment);
				break;
		}
		return imageAlignmentStyle;
	}

	/**
	 * @description
	 * This function is to the create styling for the size of the image based  on the size property 
	 * from the payload. If the payload consists of explicit width and height property, 
	 * give highest priority.  
	 * 
	 */
	applySize() {
		let sizeStyle = [];
		let sizeValue = Utils.parseHostConfigEnum(Enums.Size, this.payload.size, Enums.Size.Auto)

		const { width, height } = this.payload;

		/**
		 * Scenario 1 : Either height or width has string value (Ex: '80px'),
		 *               use the integer portion.
		 * Scenario 2 : If the height or width has string value (Ex: 'stretch'),
		 *              ignore and use the size property to determine dimensions.
		 * Scenario 3 : If either width or height is missing, apply the given value to the 
		 *              other property.
		 */
		if (Utils.isaNumber(width) || Utils.isaNumber(height)) {

			this.width = Utils.getSize(width) || this.state.imageWidth;
			this.height = Utils.getSize(height) || this.getHeight(this.width);
			sizeStyle.push({ width: this.width, height: this.height });
		}
		else {
			switch (sizeValue) {
				case 1:
					{
						sizeStyle.push(styles.imageStretch);
						break;
					}
				case 2:
					{
						sizeStyle.push({
							width: this.hostConfig.imageSizes.small,
							height: this.hostConfig.imageSizes.small
						});
						this.width = this.hostConfig.imageSizes.small;
						break;
					}
				case 3:
					{
						sizeStyle.push({ width: this.hostConfig.imageSizes.medium, height: this.hostConfig.imageSizes.medium });
						const spacingValue = Utils.parseHostConfigEnum(
							Enums.Spacing,
							this.payload.spacing,
							Enums.Spacing.Medium);
						this.spacing = this.hostConfig.getEffectiveSpacing(spacingValue);
						this.width = this.hostConfig.imageSizes.medium;
						break;
					}
				case 4:
					{
						sizeStyle.push({ width: this.hostConfig.imageSizes.large, height: this.hostConfig.imageSizes.large });
						const spacingValue = Utils.parseHostConfigEnum(
							Enums.Spacing,
							this.payload.spacing,
							Enums.Spacing.Large);
						this.spacing = this.hostConfig.getEffectiveSpacing(spacingValue);
						this.width = this.hostConfig.imageSizes.large;
						break;
					}
				default:
					{
						/**
						 * When the images are rendered via imageset and if the size is undefined or Auto, 
						 * the size of the image is taken as medium as default as per native iOS renderer.
						 */
						sizeStyle.push(styles.imageAuto);

						/**
						 * If horizontal alignment exists for the image schema, we align the image accordingly 
						 * or we fallback to the default left alignment
						 */
						switch (this.payload?.horizontalAlignment?.toLowerCase()) {
							case Constants.CenterString:
								sizeStyle.push(styles.imageCenterAlignment);
								break;
							case Constants.RightString:
								sizeStyle.push(styles.imageRightAlignment);
								break;
							default:
								sizeStyle.push(styles.imageLeftAlignment);
								break;
						}

						if ((this.isSizeUndefined && this.payload.fromImageSet == true) ||
							(this.payload.fromImageSet == true)) {
							const spacingValue = Utils.parseHostConfigEnum(
								Enums.Spacing,
								this.payload.spacing,
								Enums.Spacing.Medium);
							this.spacing = this.hostConfig.getEffectiveSpacing(spacingValue);
							sizeStyle.push({
								width: this.hostConfig.imageSizes.medium,
								height: this.hostConfig.imageSizes.medium,
							});
							this.width = this.hostConfig.imageSizes.medium;
						}
						else {
							sizeStyle.push({ width: this.state.imageWidth, height: this.state.imageHeight });
							this.width = this.state.imageWidth;
						}
						break;
					}
			}
		}
		return sizeStyle;
	}

	getHeight(width) {
		let widthToHeightRatio = (this.state.imageHeight / this.state.imageWidth) || 1;
		if (this.isPersonStyle() || (this.props.columnWidth && this.props.columnWidth != Constants.Auto))
			return width;
		else return width * widthToHeightRatio;
	}
	
    getWidth(layoutWidth, imageWidth) {
        if (
            this.isPersonStyle() ||
            (this.props.columnWidth &&
                this.props.columnWidth !== Constants.Auto)
        ) {
            return layoutWidth;
        } else if (
            layoutWidth < imageWidth &&
            this.props.columnWidth !== Constants.Auto
        ) {
            return layoutWidth;
        } else {
            return imageWidth;
        }
    }

	onPageLayoutHandler = (event) => {
		const { width: layoutWidth } = event.nativeEvent.layout;
		//This function is implemented to determine the actual dimensions of the component.
		Image.getSize(this.url, (width, height) => {

			/**
			 * If the payload contains "fromImageset" i.e(if the image is rendered via ImageSet),
			 * the height and width of the image is set to maxImageHeight for sizes "auto" and "stretch"
			 */

			if (this.payload.fromImageSet == true &&
				(this.payload.size === Constants.Auto ||
					this.payload.size === Constants.AlignStretch)) {
				this.setState({
					imageWidth: this.hostConfig.imageSet.maxImageHeight,
					imageHeight: this.hostConfig.imageSet.maxImageHeight,
				});
				this.width = this.payload.width || this.hostConfig.imageSet.maxImageHeight;
				this.height = this.payload.height || this.hostConfig.imageSet.maxImageHeight;
			}
			else {
				const imageWidth = this.getWidth(layoutWidth, width);
				const widthToHeightRatio = height / width;
				const imageHeight = widthToHeightRatio * imageWidth;

				this.setState({ imageWidth, imageHeight });
				this.width = this.payload.width || imageWidth;
				this.height = this.payload.height || imageHeight;
			}

		}, (error) => {
			console.log(`Couldn't get the image size: ${error.message}`);
		});
	}

	getImageComponent(imageUrl, wrapperComputedStyle, imageComputedStyle) {
		console.log(this.payload.altText);
		return (
            <ElementWrapper
                configManager={this.props.configManager}
                json={this.payload}
                isFirst={this.props.isFirst}
                style={wrapperComputedStyle}
                onPageLayout={this.onPageLayoutHandler}>
				{
					this.payload.altText ? <View
						accessible={true}
						accessibilityLabel={this.payload.altText}>
						<BaseImage
							style={imageComputedStyle}
							source={{uri: imageUrl}}
						/>
					</View> : <BaseImage
						style={imageComputedStyle}
						source={{uri: imageUrl}}
					/>
				}
            </ElementWrapper>
        );
	}

	render() {
		this.payload = this.props.json;
		this.hostConfig = this.props.configManager.hostConfig;
		this.styleConfig = this.props.configManager.styleConfig;
		
		this.parseHostConfig();

		if (!this.type || !Utils.isValidImageURI(this.payload.url)) {
			return null;
		}

		let imageComputedStyle = this.applySize();
		imageComputedStyle.push({ backgroundColor: this.backgroundColor })
		let wrapperComputedStyle = this.horizontalAlignment;
		wrapperComputedStyle.push({ backgroundColor: 'transparent' });

		if (this.payload.fromImageSet == true) {
			wrapperComputedStyle.push({ margin: this.spacing });
		}

		/**
		 * If the payload size is "auto" or "stretch" and 
		 * if the payload does not contain explicit width and height, computing the border radius 
		 * from the state variable "imageWidth" which is determined using Image.getSize()
		 */
		if ((this.payload.size === Constants.Auto ||
			this.payload.size === Constants.AlignStretch) &&
			!(this.payload.width || this.payload.height)) {
			this.isPersonStyle() ?
				imageComputedStyle.push({ borderRadius: this.state.imageWidth / 2 }) : null;
		}
		else {
			this.isPersonStyle() ?
				imageComputedStyle.push({ borderRadius: this.width / 2 }) : null;
		}
		imageComputedStyle.push(this.props.style)

		let imageUrl = Utils.getImageUrl(this.url);

		let containerContent = (<InputContextConsumer>
			{({ addResourceInformation }) => {
				this.addResourceInformation = addResourceInformation;
				return this.getImageComponent(imageUrl, wrapperComputedStyle, imageComputedStyle);
			}}
		</InputContextConsumer>);

		if ((this.payload.selectAction === undefined)
			|| (!this.hostConfig.supportsInteractivity)) {
			return containerContent;
		} else {
			return <SelectAction configManager={this.props.configManager} selectActionData={this.payload.selectAction}>
				{containerContent}
			</SelectAction>;
		}
	}
}

const styles = StyleSheet.create({
	imageLeftAlignment: {
		alignSelf: Constants.FlexStart,
	},
	imageCenterAlignment: {
		alignSelf: Constants.CenterString,
	},
	imageRightAlignment: {
		alignSelf: Constants.FlexEnd,
	},
	leftAlignment: {
		alignItems: Constants.FlexStart,
	},
	centerAlignment: {
		alignItems: Constants.CenterString,
	},
	rightAlignment: {
		alignItems: Constants.FlexEnd,
	},
	image: {
		marginTop: 15,
	},
	imageStretch: {
		alignSelf: Constants.AlignStretch,
		aspectRatio: 1,
		height: Constants.Auto,
		resizeMode: Constants.AlignStretch,
		width: '100%',
	},
	imageAuto: {
		alignSelf: Constants.CenterString,
	},
});
