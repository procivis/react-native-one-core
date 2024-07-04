import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { ONECore, initializeHolderCore } from "@procivis/react-native-one-core";

export default function App(): JSX.Element {
  const [text, setText] = useState<string>("N/A");
  const [oneCore, setCore] = useState<ONECore>();
  useEffect(() => {
    if (!oneCore) {
      initializeHolderCore()
        .then(setCore)
        .catch((e) => setText(`Error: ${e}`));
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

  return (
    <SafeAreaView>
      <Text>{text}</Text>
    </SafeAreaView>
  );
}
