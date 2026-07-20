<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://assets.procivis-one.com/static/logo/logo_dark_Procivis_One.png">
  <source media="(prefers-color-scheme: light)" srcset="https://assets.procivis-one.com/static/logo/logo_light_Procivis_One.png">
  <img alt="Shows a Procivis One black logo in light color mode and a white one in dark color mode." src="https://assets.procivis-one.com/static/logo/logo_light_Procivis_One.png">
</picture>

# One Core React Native SDK

A React Native library for decentralized digital identities and credentials.
Use it to hold or verify credentials via a multitude of technologies and protocols.

The SDK's SSI functionality is powered by the [Procivis One Core][core], a complete
solution capable of powering every element of the digital identity credential lifecycle.
See the [key features][key] and complete solution [architecture][archi].

## Installation

```bash
yarn add @procivis/react-native-one-core
```

### Android

Add the following to `android/build.gradle`:

```kotlin
allprojects {
    repositories {
        flatDir { dirs "$rootDir/../node_modules/@procivis/react-native-one-core/android/libs" }
    }
}
```

### iOS

```bash
cd ios && pod install
```

## Documentation

Full documentation including configuration, initialization, and SDK reference is available at
[docs.procivis.ch/sdk][sdkref].

## How to use the Procivis One SDK

- Use this SDK to embed wallet capabilities into an existing app
- Use the [Procivis One Wallet][pow] for a free-standing solution that can be white-labeled
- Use the [One Core React Components][comp] library for UI elements for your digital wallet app

## Procivis One Trial

The fastest way to get started with the _Procivis One Wallet_ is to download the app
from the iOS or Android app stores and [join our Trial Environment][trial].
In the trial environment, you are given control of an organization on our server
solution, the _Procivis One Desk_, and can quickly begin issuing and verifying credentials.

## EU Digital Identity Ecosystem

![Procivis One in the EU Digital Identity Ecosystem](https://onesdk.blob.core.windows.net/doc-assets/img/EUDI_Architecture.png)

For an EUDI Wallet, you can also use the [Procivis One Wallet][pow].

For issuing into an EUDI Wallet or offering services to an EUDI Wallet holder,
use the [Procivis One Core][core].

## Interoperability and conformance

_Procivis One_ is built using [open standards](#supported-standards) and tested to ensure
interoperability with different software vendors and across different international
regulatory ecosystems.

- W3C standards
  - The W3C offers several test suites for standards conformance. See
    the latest test results for _Procivis One_ at [canivc.com][canivc].
- ISO/IEC 18013-5 mDL
  - _Procivis One_'s implementation of the ISO mDL standard is compatible with the
    OpenWallet Foundation's verifier: _Procivis One_ can successfully issue mDL
    credentials to a _Procivis One Wallet_, and these credentials can successfully
    be verified by the OpenWallet Foundation's verifier. See the [OpenWallet Foundation libraries][owf].
- eIDAS 2.0; EUDI Wallet
  - The EU Digital Wallet is developing [issuer][eudiwi] and [verifier][eudiwv] testing for
    interoperability in mdoc and SD-JWT formats using OID4VC protocols. We follow the ongoing
    development of the testing platform and regularly test against it.

We continue to look for more opportunities for interoperability testing as the standards
and regulations mature and harden.

## Standards and technologies

| Category | Supported |
| -------- | --------- |
| Credential formats | SD-JWT VC, ISO mdoc, W3C VC |
| Issuance protocol | OpenID4VCI |
| Presentation protocols | OpenID4VP, ISO/IEC 18013-5, ISO/IEC 18013-7 |
| Transport and engagement | BLE, MQTT, NFC, QR code |
| Revocation | Bitstring Status List, Token Status List, CRL |
| Key storage | Secure Enclave, Android Keystore, Azure Key Vault, HSM, internal database |
| DID methods | did\:key, did\:web, did\:jwk, did\:webvh |
| Trust infrastructure | ETSI Trusted Lists, Lists of Trusted Lists (LoTL), and Lists of Trusted Entities (LoTE), EUDI Access and Registration Certificates |
| Cryptographic suites | ES256, Ed25519, ML-DSA-65, BBS |
| Wallet attestations | Wallet Unit Attestation (WUA) and Wallet Instance Attestation (WIA) |

For the full list of supported standards, specifications, protocol versions, and
ETSI coverage, see the [Supported Standards and Technologies][supptech] page in
the Procivis One documentation.

## Support

Need support or have feedback? [Contact us](https://www.procivis.ch/en/contact).

## License

Some rights reserved. This library is published under the [Apache License
Version 2.0](./LICENSE).

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://assets.procivis-one.com/static/logo/logo_dark_mode_Procivis.svg">
  <source media="(prefers-color-scheme: light)" srcset="https://assets.procivis-one.com/static/logo/logo_light_mode_Procivis.svg">
  <img alt="Shows a Procivis black logo in light color mode and a white one in dark color mode." src="https://assets.procivis-one.com/static/logo/logo_dark_mode_Procivis.svg">
</picture>

© Procivis AG, [https://www.procivis.ch](https://www.procivis.ch).

[archi]: https://github.com/procivis#architecture
[canivc]: https://canivc.com/implementations/procivis-one-core/
[comp]: https://github.com/procivis/one-react-native-components
[core]: https://github.com/procivis/one-core
[docs]: https://docs.procivis.ch/
[eudiwi]: https://issuer.eudiw.dev/
[eudiwv]: https://verifier.eudiw.dev/home
[key]: https://github.com/procivis#key-features
[lvvc]: https://eprint.iacr.org/2022/1658.pdf
[owf]: https://github.com/openwallet-foundation-labs/identity-credential
[pow]: https://github.com/procivis/one-wallet
[sdkref]: https://docs.procivis.ch/sdk
[trial]: https://docs.procivis.ch/trial
