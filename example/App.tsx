import { Image, StyleSheet, Button, TextInput, View, Text } from "react-native";

import MoproReactNativePackage, { Result } from "mopro-react-native-package";
import * as FileSystem from "expo-file-system";
import { useState } from "react";

export default function HomeScreen() {
    const [a, setA] = useState("");
    const [b, setB] = useState("");
    const [inputs, setInputs] = useState<string>("");
    const [proof, setProof] = useState<string>("");
    const [disabled, setDisabled] = useState(false);
    async function genProof(): Promise<void> {
        setDisabled(true);
        const newFileName = "multiplier2_final.zkey";
        const remoteUrl =
            "https://github.com/zkmopro/mopro/raw/ae88356e680ac4d785183267d6147167fabe071c/test-vectors/circom/multiplier2_final.zkey";

        const newFilePath = `${FileSystem.documentDirectory}${newFileName}`;
        const fileInfo = await FileSystem.getInfoAsync(newFilePath);
        if (!fileInfo.exists) {
            try {
                const downloadResult = await FileSystem.downloadAsync(
                    remoteUrl,
                    newFilePath
                );
                console.log("File downloaded to:", downloadResult.uri);
            } catch (error) {
                console.error("Failed to download file:", error);
            }
        }
        const circuitInputs = {
            a: [a],
            b: [b],
        };
        const res: Result = MoproReactNativePackage.generateCircomProof(
            newFilePath.replace("file://", ""),
            JSON.stringify(circuitInputs)
        );
        console.log(res);
        setProof(JSON.stringify(res.proof));
        setInputs(JSON.stringify(res.inputs));
        setDisabled(false);
    }
    return (
        <View style={{ padding: 100 }}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>a</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter value for a"
                    value={a}
                    onChangeText={setA}
                    keyboardType="numeric"
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>b</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter value for b"
                    value={b}
                    onChangeText={setB}
                    keyboardType="numeric"
                />
            </View>
            <Button
                title="Proof"
                disabled={disabled}
                onPress={() => genProof()}
            />
            <View style={styles.stepContainer}>
                <Text style={styles.output}>{inputs}</Text>
                <Text style={styles.output}>{proof}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        flex: 1,
        paddingHorizontal: 10,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    label: {
        fontSize: 16,
        marginRight: 10,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: "absolute",
    },
    output: {
        fontSize: 16,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
    },
});
