import { View, Text, StatusBar } from "react-native";
import React from "react";

export default function index() {
    return (
        <View style={{ paddingTop: StatusBar.currentHeight }}>
            <Text>Hello</Text>
        </View>
    );
}
