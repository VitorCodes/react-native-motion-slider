/**
 * @author Vitor Silva <https://github.com/VitorCodes>
 */
import * as React from 'react';

type BackgroundColor = {
    [index: number]: string;
}

export interface SliderProperties {
	/**
	 * @param {number} width Slider width.
	 */
	width: number,

	/**
	 * @param {number} height Slider height.
	 */
	height: number,

	/**
	 * @param {number} borderRadius Slider border radius.
	 */
	borderRadius: number,

	/**
	 * @param {BackgroundColor} backgroundColor String array containing the slider colors. By default it has only one element.
	 */
	backgroundColor: BackgroundColor,

	/**
	 * @param {number} decimalPlaces Decimal places to display on min, max and value elements. 
	 */
	decimalPlaces: number,

	/**
	 * @param {string} title Slider title.
	 */
	title: string,

	/**
	 * @param {string} titleColor Slider title color.
	 */
	titleColor: string,

	/**
	 * @param {object} titleStyle Slider title custom style.
	 */
	titleStyle: object,

	/**
	 * @param {number} min Minimum value of the slider.
	 */
	min: number,

	/**
	 * @param {number} max Maximum value of the slider.
	 */
	max: number,

	/**
	 * @param {number} value Current slider value.
	 */
	value: number,

	/**
	 * @param {string} units Value units (e.g. 'km').
	 */
	units: string,

	/**
	 * @param {string} minColor Color of min text element.
	 */
	minColor: string,

	/**
	 * @param {string} maxColor Color of max text element.
	 */
	maxColor: string,

	/**
	 * @param {string} valueColor Color of value text element.
	 */
	valueColor: string,

	/**
	 * @param {string} valueBackgroundColor Color of value container's background color. By default this color inherits the slider's background color.
	 */
	valueBackgroundColor: string,

	/**
	 * @param {number} fontSize Font size for min, max and value text elements.
	 */
	fontSize: number,

	/**
	 * @param {string} fontWeight Font weight for min, max and value text elements.
	 */
	fontWeight: string,

	/**
	 * @param {string} fontFamily Font family for min, max and value text elements.
	 */
	fontFamily: string,

	/**
	 * @param {Function} onValueChanged Function to execute everytime the slider value changes.
	 */
	onValueChanged: Function,

	/**
	 * @param {Function} onPressIn Function to execute everytime the user presses in the slider.
	 */
	onPressIn: Function,

	/**
	 * @param {Function} onPressOut Function to execute everytime the presses out the slider.
	 */
	onPressOut: Function,

	/**
	 * @param {Function} onDrag Function to execute everytime the user drags the finger inside the slider.
	 */
	onDrag: Function,
}

export default class Slider extends React.Component<SliderProperties> {}