# react-native-one-core

React Native library with ONE core bindings

## Getting started

### Installation

`$ yarn add react-native-one-core`

Add following to your app `android/build.gradle`:

```
...
allprojects {
   repositories {
        ...

        flatDir { dirs "$rootDir/../node_modules/react-native-one-core/android/libs" }
    }
}
```

## Usage

```javascript
import ONE from "react-native-one-core";
...
await ONE.getVersion();
```
