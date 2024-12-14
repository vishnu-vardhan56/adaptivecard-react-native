/**
 * Media Element.
 * 
 * Refer https://docs.microsoft.com/en-us/adaptive-cards/authoring-cards/card-schema#media
 */

import React from "react";
import {
    View,
    StyleSheet,
} from "react-native";

import * as Constants from "../../utils/constants";
import * as Enums from '../../utils/enums';
import Video from "react-native-video";
import ElementWrapper from './element-wrapper'
import {
    InputContextConsumer,
    InputContext
} from '../../utils/context';
import * as Utils from '../../utils/util';
import { BaseImage } from "./base-image";


export class Media extends React.Component {

    static contextType = InputContext;

    constructor(props) {
        super(props);
        this.payload = props.json;
        this.sources = this.getMediaSources(this.payload.sources);
        this.addResourceInformation = undefined;
        this.onParseError = undefined;
        this.state = {
            currentSourceIndex: 0,
            onLoad: false,
        }
    }

    componentDidMount() {
        if (this.payload.sources && this.payload.sources.length > 0) {
            this.payload.sources.forEach(source => {
                this.addResourceInformation(source.url, source.mimeType);
            })
        }
        if (!Utils.isNullOrEmpty(this.payload.poster)) {
            this.addResourceInformation(this.payload.poster, "");
        }
    }

    /**
     * @description Return the MediaSources from the payload 
     * @returns {Array} Updated sources from the payload
     */
    getMediaSources = () => {
        let sources = this.payload.sources;
        if (sources && sources.length > 0) {
            sources.forEach(source => {
                this.addUriAttribute(source);
                //removing the source if its uri is empty
                if (Utils.isNullOrEmpty(source.uri)) {
                    sources.splice(source, 1);
                }
            })
            return sources;
        } else {
            return null;
        }
    }

    /**
     * @description Add the uri attribute to the source
     * @param {object} source - source from the sources array
     * @returns {object} source with trimmed uri attribute
     */
    addUriAttribute = (source) => {
        if (source.url) {
            source.uri = source.url
        }
        source.uri = source.uri ? source.uri.trim() : ""
        return source;
    }

    /**
     * @description Error handler for the video component
     */
    videoError = () => {
        if (this.state.currentSourceIndex < (this.sources.length - 1)) {
            this.setState({
                currentSourceIndex: this.state.currentSourceIndex + 1
            })
        } else {
            let error = { "error": Enums.ValidationError.InvalidPropertyValue, "message": `Not able to play the source` };
            this.onParseError(error);
        }
    }

    /**
     * @description Handler for the video component onLoad
     */
    videoLoadSuccess = () => {
        this.setState({
            onLoad: true
        })
    }

    render() {
        return (
            <InputContextConsumer>
                {({ onParseError, addResourceInformation }) => {
                    this.addResourceInformation = addResourceInformation;
                    this.onParseError = onParseError;

                    return <ElementWrapper configManager={this.props.configManager} json={this.payload} isFirst={this.props.isFirst}>
                        <View
                            accessible={true}
                            accessibilityLabel={this.payload.altText || Constants.EmptyString}
                            style={styles.container}>
                            {
                                (this.sources && this.sources.length > 0) &&
                                <Video
                                    source={this.sources[this.state.currentSourceIndex]}
                                    fullscreen={true}
                                    controls={true}
                                    id={this.payload.id ? this.payload.id : "video"}
                                    paused={true}
                                    onError={this.videoError}
                                    onLoad={this.videoLoadSuccess}
                                    style={styles.nativeVideoControls}
                                />
                            }
                            {(!this.state.onLoad && this.payload.poster) && <BaseImage source={{ uri: this.payload.poster }} resizeMode="contain" style={styles.nativeVideoControls} />}
                        </View>
                    </ElementWrapper>
                }}
            </InputContextConsumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: Constants.CenterString,
        alignItems: Constants.CenterString,
        backgroundColor: Constants.BlackColor,
        height: 300,
        width: Constants.FullWidth,
    },
    nativeVideoControls: {
        position: Constants.Absolute,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});
