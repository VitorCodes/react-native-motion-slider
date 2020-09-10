/**
 * @author Vitor Silva - https://github.com/VitorCodes
 */
import React, { Component } from 'react';
import { View, Text, Dimensions, Animated, Easing, PanResponder } from 'react-native';
import Style from './styles';

const { 
	width: Width = width, 
	height: Height = height 
} = Dimensions.get('window');

class Slider extends Component {
	static defaultProps = {
		width: Math.floor(Width * 0.85),
		height: Math.floor(Height * 0.07),
		borderRadius: 10,
		backgroundColor: ['#2196F3'],
		decimalPlaces: 0,
		title: '',
		titleColor: null,
		titleStyle: {},
		min: 0,
		max: 50,
		value: 100,
		units: '',
		minColor: '#fff',
		maxColor: '#fff',
		valueColor: null,
		valueBackgroundColor: '#fff',
		fontSize: 10,
		fontWeight: 'normal',
		fontFamily: null,
		onValueChanged: () => null,
		onPressIn: () => null,
		onPressOut: () => null,
		onDrag: () => null,
	};

	constructor(props) {
		super(props);

		let {
			// Bar 
			width, height, borderRadius, backgroundColor,
			// Min
			minColor,
			// Max
			maxColor,
			// Value
			value,
			valueBackgroundColor,
			decimalPlaces,
			// Min, Max and Value
			fontSize, fontFamily, fontWeight,
		} = props;
		
		this.titleStyle = {
			marginHorizontal: Math.floor(width * 0.05),
			marginVertical: Math.floor(height * 0.3),
		};

		this.barStyle = {
			width,
			height,
			borderRadius,
			backgroundColor
		};

		this.minStyle = {
			color: minColor,
			fontSize,
			fontFamily,
			fontWeight,
			width: height,
			marginHorizontal: borderRadius,
		};

		this.maxStyle = {
			color: maxColor,
			fontSize,
			fontFamily,
			fontWeight,
			width: height,
			marginHorizontal: borderRadius
		};

		this.valueStyle = {
			fontSize,
			fontFamily,
			fontWeight
		};

		this.valueOuterContainerStyle = {
			backgroundColor,
			width: height,
			height,
			borderRadius: Math.floor(height / 2),
		};

		this.valueInnerContainerStyle = {
			backgroundColor: valueBackgroundColor,
			width: height - Math.floor(height * 0.2),
			height: height - Math.floor(height * 0.2),
			borderRadius: Math.floor((height - Math.floor(height * 0.2)) / 2),
		};

		this.minX = borderRadius + Math.floor(height / 2);
		this.maxX = width - borderRadius - Math.floor(height / 2);
		this.panResponder = this.setPanResponder();
		this.gradient = this.setGradient();

		this.state = {
			value: value.toFixed(decimalPlaces),
			animTranslateY: new Animated.Value(0),
			animScale: new Animated.Value(1),
			posX: this.xOfValue(value),
			pressed: false
		};
	}

	xOfValue(y) {
		let { max, min } = this.props;
		let m = Number(((min - max) / (this.minX - this.maxX)).toFixed(20));
		let x = (y - min) / m;

		return Math.floor(x + this.minX);
	}

	calculateValue(posX) {
		let { max, min, decimalPlaces, onDrag, onValueChanged } = this.props;

		if(posX < this.minX) posX = this.minX;
		if(posX > this.maxX) posX = this.maxX;
		
		let m = Number(((min - max) / (this.minX - this.maxX)).toFixed(20));
		let x = posX;
		let value = ((m * x) - (this.minX * m) + min).toFixed(decimalPlaces);

		this.setState({ value });
		onDrag();
		onValueChanged(value);
	}

	setGradient() {
		let { backgroundColor, min, max } = this.props;

		// Has only one color -> outputRange will use the same values
		if(backgroundColor.length == 1) {
			return {
				inputRange: [min, max],
				outputRange: [backgroundColor[0], backgroundColor[0]]
			};
		};

		// Has two or more colors -> defines the output range with backgroundColor values and calculates middleRange values for inputRange
		let gradient =  {
			inputRange: [min, max],
			outputRange: backgroundColor
		};

		let currentRange = min;
		let middleRanges = [];

		for(var i = 0; i < backgroundColor.length - 2; i++) {
			middleRanges.push(currentRange + Math.floor((1 / backgroundColor.length) * 100));
			currentRange += Math.floor((1 / backgroundColor.length) * 100);
		}

		gradient.inputRange.splice(1, 0, ...middleRanges);
		return gradient;
	}

	setPanResponder() {
		return PanResponder.create({
			onStartShouldSetPanResponder: (evt, gestureState) => true,
			onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
			onMoveShouldSetPanResponder: (evt, gestureState) => true,
			onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			onPanResponderTerminationRequest: (evt, gestureState) => true,
			onPanResponderGrant: (evt, gestureState) => {
				let posX = Math.floor(evt.nativeEvent.locationX);
				this.calculateValue(posX);
				this.onPressIn(posX);
			},
			onPanResponderMove: (evt, gestureState) => {
				let posX = Math.floor(evt.nativeEvent.locationX);
				let posY = Math.floor(evt.nativeEvent.locationY);

				if(posY < 0 || posY > this.props.height) return;

				this.calculateValue(posX);
				this.setState({ posX });
			},
			onPanResponderRelease: (evt, gestureState) => {
				this.onPressOut();
			},
			onPanResponderTerminate: (evt, gestureState) => {
				this.onPressOut();
			},
		});
	}

	onPressIn(posX) {
		let { height, onPressIn, onValueChanged } = this.props;
		let { animScale, animTranslateY, pressed, value } = this.state;

		if(pressed) return;

		this.setState({
			pressed: true,
			posX
		}, () => {
			Animated.parallel([
				Animated.timing(animScale, {
					toValue: 1.4,
					duration: 200,
				}),
				Animated.spring(animTranslateY, {
					toValue: -(height - Math.floor(height * 0.3)),
					bounciness: 12,
				})
			]).start();

			onPressIn();
			onValueChanged(value);
		});
	}

	onPressOut() {
		let { animScale, animTranslateY, pressed, value } = this.state;
		let { onPressOut, onValueChanged } = this.props;

		if(!pressed) return;

		this.setState({
			pressed: false
		}, () => {
			Animated.parallel([
				Animated.timing(animScale, {
					toValue: 1,
					duration: 300,
				}),
				Animated.timing(animTranslateY, {
					toValue: 0,
					duration: 300,
					easing: Easing.out(Easing.exp),
				}),
			]).start();

			onPressOut();
			onValueChanged(value);
		});
	}

	getCurrentColor() {
		return new Animated.Value(Number(this.state.value)).interpolate({
			inputRange: this.gradient.inputRange,
			outputRange: this.gradient.outputRange
		});
	}

	barAnimationStyle() {
		let { value, animScale } = this.state;
		
		return {
			transform: [{  
				scale: animScale.interpolate({ 
					inputRange: [1, 1.4],
					outputRange: [0.9, 1] 
				})
			}],
			backgroundColor: this.getCurrentColor()
		};
	}

	titleAnimationStyle() {
		let { animScale } = this.state;
		let { titleColor } = this.props;
		
		return {
			opacity: animScale.interpolate({ 
				inputRange: [1, 1.1, 1.4],
				outputRange: [1, 0.2, 0] 
			}),
			color: titleColor || this.getCurrentColor()
		};
	}

	renderTitle() {
		let { title, titleStyle } = this.props;

		if(!title && title.length === 0) return;

		return (
			<Animated.Text style={[
				Style.title, 
				this.titleStyle, 
				titleStyle,
				this.titleAnimationStyle()
			]}>
				{title}
			</Animated.Text>
		);
	}

	renderValue() {
		let { value, posX, animTranslateY, animScale } = this.state;
		let { width, height, borderRadius, units } = this.props;
		let left = posX - Math.floor(height / 2);

		if(left <= borderRadius) {
			left = borderRadius;
		}

		if(left >= width - borderRadius - height) {
			left = width - borderRadius - height;
		}

		return (
			<Animated.View style={[
				Style.valueContainer, 
				{ 
					left,
					transform: [{ scale: animScale }],
				}
			]}>
				<Animated.View 
					style={[
						Style.valueOuterContainer,
						this.valueOuterContainerStyle,
						{ 
							transform: [{ translateY: animTranslateY }],
							backgroundColor: this.getCurrentColor()
						}
					]}>
					<View style={[Style.valueInnerContainer, this.valueInnerContainerStyle]}>
						<Animated.Text style={[Style.value, this.valueStyle, { color: this.getCurrentColor() }]} numberOfLines={1}>{`${value}${units}`}</Animated.Text>
					</View>
				</Animated.View>
			</Animated.View>
		);
	}

  	render() {
		let { min, max, decimalPlaces, units } = this.props;

		return (
			<View>
				{this.renderTitle()}
				<Animated.View style={[
					Style.bar, 
					this.barStyle, 
					this.barAnimationStyle()
				]}>
					<Text style={[Style.min, this.minStyle]}>{`${min.toFixed(decimalPlaces)}${units}`}</Text>
					<Text style={[Style.max, this.maxStyle]}>{`${max.toFixed(decimalPlaces)}${units}`}</Text>
					{this.renderValue()}
					<View {...this.panResponder.panHandlers} style={Style.touchableArea} />
				</Animated.View>
			</View>
		);
  	}
}

export default Slider;