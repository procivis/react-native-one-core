import React, { useCallback, useEffect, useState } from "react";
import { Button, SafeAreaView, ScrollView, Text } from "react-native";
import {
  ONECore,
  initializeCore,
  Ubiqu,
} from "@procivis/react-native-one-core";

const config = {
  keyStorage: {
    INTERNAL: {
      params: {
        private: {
          encryption:
            "93d9182795f0d1bec61329fc2d18c4b4c1b7e65e69e20ec30a2101a9875fff7e",
        },
      },
    },
    UBIQU_RSE: { enabled: true },
  },
  issuanceProtocol: {
    OPENID4VCI_DRAFT13: {
      params: {
        private: {
          encryption:
            "93d9182795f0d1bec61329fc2d18c4b4c1b7e65e69e20ec30a2101a9875fff7e",
        },
      },
    },
    OPENID4VCI_DRAFT13_SWIYU: {
      params: {
        private: {
          encryption:
            "93d9182795f0d1bec61329fc2d18c4b4c1b7e65e69e20ec30a2101a9875fff7e",
        },
      },
    },
    OPENID4VCI_FINAL1: {
      params: {
        private: {
          encryption:
            "93d9182795f0d1bec61329fc2d18c4b4c1b7e65e69e20ec30a2101a9875fff7e",
        },
      },
    },
  },
  verificationEngagement: {
    NFC: {
      display: "verificationEngagement.nfc",
      enabled: true,
      order: 2,
    },
  },
};

export default function App(): JSX.Element {
  const [text, setText] = useState<string>("N/A");
  const [oneCore, setCore] = useState<ONECore>();
  useEffect(() => {
    if (!oneCore) {
      setText("Initializing core...");
      initializeCore(config)
        .then(setCore)
        .catch((e) => setText(`Error INIT: ${e}`));
    }
  }, [!oneCore]);

  useEffect(() => {
    if (oneCore) {
      oneCore
        .getVersion()
        .then((version) =>
          setText(`ONE version: ${JSON.stringify(version, undefined, 2)}`)
        )
        .catch((e) => setText(`Error: ${e}`));
    }
  }, [oneCore]);

  const [ubiquPin, setUbiquPin] = useState<{
    type: Ubiqu.PinFlowType;
    stage: Ubiqu.PinFlowStage;
    entered: number;
  }>();
  useEffect(() => {
    if (oneCore) {
      return Ubiqu.addEventListener((event) => {
        console.log(`Ubiqu event: ${JSON.stringify(event, undefined, 2)}`);
        switch (event.type) {
          case Ubiqu.PinEventType.SHOW_PIN:
            setUbiquPin({
              type: event.flowType,
              stage: event.stage,
              entered: 0,
            });
            break;
          case Ubiqu.PinEventType.HIDE_PIN:
            setUbiquPin(undefined);
            break;
          case Ubiqu.PinEventType.PIN_STAGE:
            setUbiquPin(
              (prev) => prev && { ...prev, stage: event.stage, entered: 0 }
            );
            break;
          case Ubiqu.PinEventType.DIGITS_ENTERED:
            setUbiquPin(
              (prev) => prev && { ...prev, entered: event.digitsEntered }
            );
            break;
        }
      });
    }
  }, [oneCore]);

  const generateKey = useCallback(async () => {
    setText("Generating key...");
    const organisationId = await oneCore!.createOrganisation({});
    await oneCore!
      .generateKey({
        organisationId,
        keyType: "EDDSA",
        keyParams: {},
        name: "ubiqu",
        storageType: "UBIQU_RSE",
        storageParams: {},
      })
      .then((keyId) => setText(`Key generated: ${keyId}`))
      .catch((e) => setText(`Error: ${e}`));
  }, [oneCore]);

  const generateIdentifier = useCallback(async () => {
    setText("Generating identifier...");
    const organisationId = await oneCore!.createOrganisation({});
    await oneCore!.generateKey({
      organisationId,
      keyType: "EDDSA",
      keyParams: {},
      name: "identifier key",
      storageType: "INTERNAL",
      storageParams: {},
    }).then(async keyId => {
      await oneCore!.createIdentifier({
        organisationId,
        name: "test identifier",
        did: {
          method: "KEY",
          params: {},
          keys: {
            authentication: [keyId],
            assertionMethod: [keyId],
            keyAgreement: [keyId],
            capabilityInvocation: [keyId],
            capabilityDelegation: [keyId],
          },
        },
      }).catch(e => {
        setText(`Error: ${e}`)
      }).then(async (identifierId) => {
        await oneCore!.getIdentifier(identifierId!).then(res => {
          setText(`Identifier created: ${JSON.stringify(res, undefined, 2)}`)
        })
      })
    }).catch(e => {
      setText(`Error: ${e}`)
    })
  }, [oneCore])

  const changePin = useCallback(async () => {
    setText("Changing PIN...");
    await Ubiqu.changePin()
      .then(() => setText("Pin changed"))
      .catch((e) => setText(`Error: ${e}`));
  }, [oneCore]);

  const [biometricsEnabled, setBiometricsEnabled] = useState<boolean>();
  const getBiometry = useCallback(async () => {
    setText("Getting biometry settings...");
    const supported = await Ubiqu.areBiometricsSupported().catch((e) =>
      setText(`Error: ${e}`)
    );
    if (supported) {
      await Ubiqu.areBiometricsEnabled()
        .then((enabled) => {
          setBiometricsEnabled(enabled);
          setText(`Biometrics setting: ${enabled}`);
        })
        .catch((e) => setText(`Error: ${e}`));
    } else {
      setText("Biometrics not supported");
    }
  }, [oneCore]);

  const enableBiometry = useCallback(async () => {
    setText("Enabling biometry...");
    await Ubiqu.setBiometrics(true)
      .then(() => {
        setBiometricsEnabled(true);
        setText(`Biometrics enabled`);
      })
      .catch((e) => setText(`Error: ${e}`));
  }, [oneCore]);

  const disableBiometry = useCallback(async () => {
    setText("Disabling biometry...");
    await Ubiqu.setBiometrics(false)
      .then(() => {
        setBiometricsEnabled(false);
        setText(`Biometrics disabled`);
      })
      .catch((e) => setText(`Error: ${e}`));
  }, [oneCore]);

  const reset = useCallback(async () => {
    setText("Resetting Ubiqu...");
    await Ubiqu.reset()
      .then(() => {
        setUbiquPin(undefined);
        setBiometricsEnabled(undefined);
        setText(`Ubiqu reset`);
      })
      .catch((e) => setText(`Error: ${e}`));
  }, [oneCore]);

  const cancelPinFlow = useCallback(async () => {
    setText("Canceling PIN entry...");
    await Ubiqu.resetPinFlow()
      .then(() => {
        setUbiquPin(undefined);
        setBiometricsEnabled(undefined);
        setText(`PIN flow cancelled`);
      })
      .catch((e) => setText(`Error: ${e}`));
  }, [oneCore]);

  const deleteCore = useCallback(async () => {
    setText("Deleting core...");
    await oneCore!
      .uninitialize(true)
      .then(() => {
        setCore(undefined);
        setUbiquPin(undefined);
        setBiometricsEnabled(undefined);
      })
      .catch((e) => setText(`Error: ${e}`));
  }, [oneCore]);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text>{text}</Text>
        {oneCore && (
          <>
            <Button title="Create identifier" onPress={generateIdentifier}></Button>
            <Button title="Generate Ubiqu Key" onPress={generateKey}></Button>
            <Button title="Change PIN" onPress={changePin}></Button>
            <Button title="Get Biometry setting" onPress={getBiometry}></Button>
            <Button title="Delete core" onPress={deleteCore}></Button>
            <Button title="Reset Ubiqu" onPress={reset}></Button>
            {biometricsEnabled === false ? (
              <Button title="Enable Biometry" onPress={enableBiometry}></Button>
            ) : (
              biometricsEnabled && (
                <Button
                  title="Disable Biometry"
                  onPress={disableBiometry}
                ></Button>
              )
            )}
          </>
        )}
        {ubiquPin && (
          <>
            <Button title="Cancel PIN flow" onPress={cancelPinFlow}></Button>
            <Text>{`Flow: ${ubiquPin.type}`}</Text>
            <Text>{`Stage: ${ubiquPin.stage}`}</Text>
            <Text>{`Entered: ${ubiquPin.entered}/${Ubiqu.PIN_COUNT}`}</Text>
            <Ubiqu.PinPad
              style={{
                alignSelf: "center",
                width: 320,
                height: 400,
              }}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
