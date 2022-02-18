import { View, Text } from "react-native";
import React from "react";

const CARDS = [
    {
        title: "Card One",
        color: "red.300",
    },
    {
        title: "Card Two",
        color: "green.300",
    },
    {
        title: "Card One",
        color: "yellow.300",
    },
    {
        title: "Card One",
        color: "orange.300",
    },
    {
        title: "Card One",
        color: "violet.300",
    },
    {
        title: "Card One",
        color: "amber.300",
    },
];

const ICONS = [
    {
        img: require("../../assets/coin_logos/bitcoin.png"),
    },
];

const List = () => {
    return (
        <View>
            <Text>List</Text>
        </View>
    );
};

export default List;
