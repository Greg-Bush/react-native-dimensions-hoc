# react-native-dimensions-hoc

> A HOC to provide width and height properties with actual dimensions for your React-Native components.

## Basic Usage

```tsx
import React from 'react';
import { ViewProps } from "react-native";
import withDimensions, { IDimensionsProps } from "react-native-dimensions-hoc";

export interface YourComponentProps extends ViewProps {
    ...
}

class YourComponent extends React.Component<YourComponentProps & IDimensionsProps> {

    render() {
        const { width, height, remeasure, ...viewProps } = this.props;
        return (
            <View {...viewProps} onLayout={remeasure}>
                ...
            </View>
        );
    }
    ...
}

export default withDimensions<YourComponentProps>(YourComponent);
```


## Installation

```
$ npm install react-native-dimensions-hoc --save
```

## License

MIT
