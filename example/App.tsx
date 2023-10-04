import React, { useEffect, useState } from "react";
import { SafeAreaView, Text } from "react-native";
import ONE from "react-native-one-core";

function App(): JSX.Element {
  const [version, setVersion] = useState<string>();
  useEffect(() => {
    ONE.getVersion()
      .then((version) => setVersion(JSON.stringify(version, undefined, 2)))
      .catch((e) => setVersion(e.toString()));
  }, []);

  return (
    <SafeAreaView>
      <Text>{`ONE version: ${version || "N/A"}`}</Text>
    </SafeAreaView>
  );
}

export default App;
