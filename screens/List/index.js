import React from "react";
import { Box, Center, FlatList, HStack, Image, Pressable, Text, VStack } from "native-base";
import shortid from "shortid";
import { Dimensions, TouchableOpacity } from "react-native";
const WinWidth = Dimensions.get("window").width;
const CARD_WIDTH = 250;
const CARDS = [
    {
        id: shortid.generate(),
        title: "Card One",
        color: "red.300",
    },
    {
        id: shortid.generate(),
        title: "Card Two",
        color: "green.300",
    },
    {
        id: shortid.generate(),
        title: "Card Three",
        color: "yellow.300",
    },
    {
        id: shortid.generate(),
        title: "Card Four",
        color: "orange.300",
    },
    {
        id: shortid.generate(),
        title: "Card Five",
        color: "violet.300",
    },
    {
        id: shortid.generate(),
        title: "Card Six",
        color: "amber.300",
    },
];

const ICONS = [
    require("../../assets/coin_logos/bitcoin.png"),
    require("../../assets/coin_logos/bnbpng.png"),
    require("../../assets/coin_logos/dogepng.png"),
    require("../../assets/coin_logos/ethereumpng.png"),
    require("../../assets/coin_logos/litecoinpng.png"),
    require("../../assets/coin_logos/polygonpng.png"),
    require("../../assets/coin_logos/solanapng.png"),
    require("../../assets/coin_logos/tron.png"),
];

const List = () => {
    return (
        <Box flex={1}>
            <VStack flex={1} justifyContent="space-around">
                <FlatList
                    data={CARDS}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Box bg={item.color} p={"5"} w={CARD_WIDTH} h={200} rounded="3xl" m={5}>
                            <Text>{item.title}</Text>
                        </Box>
                    )}
                    horizontal
                    snapToInterval={CARD_WIDTH + 40}
                    showsHorizontalScrollIndicator={false}
                />
                <Box p="5" justifyContent={"center"}>
                    <HStack flexWrap={"wrap"} justifyContent="space-between">
                        {ICONS.map((img, index) => (
                            <TouchableOpacity key={index}>
                                <Center size={30} rounded={"full"} m="5">
                                    <Image
                                        source={img}
                                        alt={`${img}`}
                                        style={{ width: "100%", height: "100%" }}
                                        resizeMode="cover"
                                    />
                                </Center>
                            </TouchableOpacity>
                        ))}
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
};

export default List;
