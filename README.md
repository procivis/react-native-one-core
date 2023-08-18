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

Add following to your app `android/app/build.gradle` to remove unsupported architectures:

```
...
android {
   defaultConfig {
        ...

        ndk {
            abiFilters "armeabi-v7a", "arm64-v8a", "x86"
        }
        packagingOptions {
            exclude 'lib/mips/**'
            exclude 'lib/mips64/**'
            exclude 'lib/armeabi/**'
            exclude 'lib/x86_64/**'
        }
    }
}
```

## Usage

```javascript
import ONE from "react-native-one-core";
...
await ONE.getVersion();
```
