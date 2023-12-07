import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import { initializeCore } from "react-native-one-core";

function App(): JSX.Element {
  const [text, setText] = useState<string>("N/A");
  useEffect(() => {
    initializeCore()
      .then((ONE) => ONE.getVersion())
      .then((version) =>
        setText(`ONE version: ${JSON.stringify(version, undefined, 2)}`)
      )
      .catch((e) => setText(`Error: ${e}`));
  }, []);

  return (
    <SafeAreaView>
      <Text>{text}</Text>
    </SafeAreaView>
  );
}

export default App;
