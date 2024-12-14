// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { HostContainer } from "./host-container";
import * as Adaptive from "adaptivecards";
import * as windowsTimelineConfiguration from "../../../../../samples/HostConfig/windows-timeline.json";

export class TimelineContainer extends HostContainer {
    // static backgroundColor: string = "#0078D7";

    private _width: number;
    private _height: number;

    constructor(width: number, height: number, styleSheet: string) {
        super(styleSheet);

        this._width = width;
        this._height = height;
        this.supportsActionBar = false;
    }

    protected renderContainer(adaptiveCard: Adaptive.AdaptiveCard, target: HTMLElement): HTMLElement {
        Adaptive.GlobalSettings.useAdvancedCardBottomTruncation = true;

        var wrapper = document.createElement("div");
        wrapper.className = "timeline-frame";
        target.appendChild(wrapper);

        var cardContainer = document.createElement("div");
        cardContainer.className = "timeline-card";
        wrapper.appendChild(cardContainer);

        // Style must be set in code for fixed-height clipping to work
        var clippingDiv = document.createElement("div");
        clippingDiv.style.height = this._height + "px";
        clippingDiv.style.width = this._width + "px";
        clippingDiv.style.overflow = "hidden";
        cardContainer.appendChild(clippingDiv);

        var renderedCard = adaptiveCard.render();
        renderedCard.style.height = "100%";
        clippingDiv.appendChild(renderedCard);
        adaptiveCard.updateLayout();

        return wrapper;
    }

    public getHostConfig(): Adaptive.HostConfig {
        return new Adaptive.HostConfig(windowsTimelineConfiguration);
    }
}
