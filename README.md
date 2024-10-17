![Procivis One](docs/assets/logo_dark_Procivis_One.png#gh-light-mode-only)
![Procivis One](docs/assets/logo_light_Procivis_One.png#gh-dark-mode-only)

# One Core React Native SDK

A React Native library for decentralized digital identities and credentials.
Use it to hold or verify credentials via a multitude of technologies and protocols.

The SDK's SSI functionality is powered by the [Procivis One Core][core], a complete
solution capable of powering every element of the digital identity credential lifecycle.
See the complete solution [architecture][archi].

## Table of Contents

- [Key features](#key-features)
- [How to use the One Core SDK](#how-to-use-the-one-core-react-native-sdk)
- [Getting started](#getting-started)
- [Background](#background)
- [eIDAS 2.0](#eidas-20)
- [Interoperability and conformance](#interoperability-and-conformance)
- [Supported standards](#supported-standards)
- [Support](#support)
- [License](#license)

## Key features

- **Interoperable**
  - Uses standardized protocols for credential lifecycles for maximum compatability with
    software from other vendors. See the results of [interoperability](#interoperability-and-conformance)
    testing.
- **Compliant**
  - Supports all standards within the [**eIDAS 2.0 regulation**](#eidas-20), the
    **Swiss eID infrastructure**, and more. See the [supported standards](#supported-standards).
- **Flexible**
  - Supports online and offline exchanges over multiple transport channels. See
    [exchange and transport](#exchange-and-transport).
- **Secure**
  - Supports Hardware Security Module (HSM) for secure key storage on enabled devices.
- **Private**
  - Supports selective disclosure, privacy-preserving revocation, and many more privacy-focused
    features.

## How to use the One Core React Native SDK

- Use this SDK to embed wallet capabilities into an existing app
- Use the [Procivis One Wallet][pow] for a free-standing solution that can be white-labeled
- Use the [components][comp] library for UI elements for your digital wallet app

## Getting started

### Trial

The fastest way to get started with the Procivis One Wallet is to download the app
from the iOS or Android app stores and [join our Trial Environment][trial].
In the trial environment, you are given control of an organization on our server
solution, the Procivis One Desk, and can quickly begin issuing and verifying credentials.

### Documentation

See our documentation:

- [SDK Reference][sdkref]
- [Docs home][docs]

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

## Background

Decentralized digital identities and credentials is an approach to identity that relocates
digital credentials from the possession and control of centralized authorities to the
digital wallet of the credentials holder. This architecture eliminates the need for the
user to "phone home" to use their credentials as well as the verifier to communicate to
the issuer via back-channels, keeping the wallet holder's interactions private between only
those parties directly involved in each interaction. This model of digital identity is
often referred to as Self-Sovereign Identity, or SSI.

## eIDAS 2.0

If you want to provide an **EUDI Wallet**, Procivis One provides production grade open
source components to get certified and connect your organization to the eIDAS 2.0 ecosystem.

![Procivis One in the eIDAS ARF](docs/assets/eIDAS_Architecture.png)

For an EUDI Wallet, use the [react-native-one-core][rncore] SDK for embedding into
an existing app, or use the [Procivis One Wallet][pow] with adaptations to fit your
needs.

If you want to issue into an EUDI Wallet or offer services to an EUDI Wallet holder,
use the [Procivis One Core][core].

## Interoperability and conformance

Procivis One is built using [open standards](#supported-standards) and tested to ensure
interoperability with different software vendors and across different international
regulatory ecosystems.

- W3C standards
  - The W3C offers several test suites for standards conformance. See
    the latest test results for Procivis One at [canivc.com][canivc].
- ISO/IEC 18013-5 mDL
  - Procivis One's implementation of the ISO mDL standard is compatible with the
    OpenWallet Foundation's verifier: Procivis One can successfully issue mDL
    credentials to a Procivis One Wallet, and these credentials can successfully
    be verified by the OpenWallet Foundation's verifier. See the [OpenWallet Foundation libraries][owf].
- eIDAS 2.0; EUDI Wallet
  - The EU Digital Wallet is developing [issuer][eudiwi] and [verifier][eudiwv] testing for
    interoperability in mdoc and SD-JWT formats using OID4VC protocols. We follow the ongoing
    development of the testing platform and regularly test against it.

We continue to look for more opportunities for interoperability testing as the standards
and regulations mature and harden.

## Supported standards

### Credential data models

- [Verifiable Credentials][vcdm] (VCs)
  - JSON-LD
  - SD-JWT
  - JWT
- [ISO/IEC 18013-5:2021][iso]
  - mdoc

### Exchange and transport

- OpenID for Verifiable Credentials
  - [OID4VCI][vci]; ID-1
  - [OID4VP][vp]; ID-2
    - [OID4VP over BLE][ble]; optimized version of Draft 00
    - [OID4VP over MQTT][mqtt]; proprietary adaptation of OID4VP over BLE via MQTT channel
- [ISO/IEC 18013-5][iso]
  - QR-code engagement and offline device retrieval over BLE

### Key storage

- Secure Enclave (iOS) and Android Keystore (TEE or Strongbox)
- Internal encrypted database

### Revocation methods

- [Bitstring Status List v1.0][sl]
- [Linked Validity Verifiable Credentials (LVVC)][lvvc]

## Support

Need support or have feedback? [Contact us](https://www.procivis.ch/en/contact).

## License

Some rights reserved. This library is published under the [Apache License
Version 2.0](./LICENSE).

![Procivis AG](docs/assets/logo_light_mode_Procivis.svg#gh-light-mode-only)
![Procivis AG](docs/assets/logo_dark_mode_Procivis.svg#gh-dark-mode-only)

© Procivis AG, [https://www.procivis.ch](https://www.procivis.ch).

[archi]: https://github.com/procivis#architecture
[ble]: https://openid.net/specs/openid-4-verifiable-presentations-over-ble-1_0.html
[canivc]: https://canivc.com/implementations/procivis-one-core/
[comp]: https://github.com/procivis/one-react-native-components
[core]: https://github.com/procivis/one-core
[docs]: https://docs.procivis.ch/
[eudiwi]: https://issuer.eudiw.dev/
[eudiwv]: https://verifier.eudiw.dev/home
[iso]: https://www.iso.org/standard/69084.html
[lvvc]: https://eprint.iacr.org/2022/1658.pdf
[mqtt]: https://docs.oasis-open.org/mqtt/mqtt/v5.0/mqtt-v5.0.html
[owf]: https://github.com/openwallet-foundation-labs/identity-credential
[pow]: https://github.com/procivis/one-wallet
[rncore]: https://github.com/procivis/react-native-one-core
[sdkref]: https://docs.procivis.ch/sdk/overview
[sl]: https://www.w3.org/TR/vc-bitstring-status-list/
[trial]: https://docs.procivis.ch/trial/intro
[vcdm]: https://www.w3.org/TR/vc-data-model-2.0/
[vci]: https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0-12.html
[vp]: https://openid.net/specs/openid-4-verifiable-presentations-1_0.html
