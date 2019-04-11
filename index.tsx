import hoistNonReactStatics from 'hoist-non-react-statics';
import * as React from 'react';
import { LayoutChangeEvent, View, ViewProps } from 'react-native';

export interface IDimensionsProps extends ViewProps {
	width: number;
	height: number;
	remeasure: (e: LayoutChangeEvent) => void;
}

interface IForwardedRefProp<T = any> {
	forwardedRef: React.Ref<T>;
}

/**
 * @description
 * A HOC to provide width and height properties with actual dimensions for your component.
 * @author https://github.com/Greg-Bush
 * @date 2019-04-11
 * @template TResultProps
 * @param {React.ComponentType<IDimensionsProps>} WrappedComponent
 */
export default function withDimensions<TResultProps extends ViewProps>(
	WrappedComponent: React.ComponentType<IDimensionsProps>,
) {
	class WithDimensions extends React.Component<
		TResultProps & IForwardedRefProp<typeof WrappedComponent>
		> {
		public static displayName = `withDimensions(${getDisplayName(WrappedComponent)})`;
		public state = { width: 0, height: 0, initialRender: false };
		public render() {
			const { forwardedRef, ...props } = this.props;
			return (
				this.state.initialRender ?
					(
						<WrappedComponent
							ref={forwardedRef}
							{...props}
							width={this.state.width}
							height={this.state.height}
							remeasure={this.measure}
						>
							{this.props.children}
						</WrappedComponent>
					) :
					<View style={this.props.style || { flex: 1 }} onLayout={this.measure} />
			);
		}
		private measure = ({ nativeEvent: { layout: { width = 0, height = 0 } = {} } = {} }) => {
			this.setState({ width, height, initialRender: true });
		}
	}
	hoistNonReactStatics(WithDimensions, WrappedComponent);
	return React.forwardRef<typeof WrappedComponent, TResultProps>((props, ref) =>
		(<WithDimensions {...props} forwardedRef={ref}>{props.children}</WithDimensions>));
}

const getDisplayName = (WrappedComponent: React.ComponentType<any>) =>
	WrappedComponent.displayName || WrappedComponent.name || 'WrappedComponent';
