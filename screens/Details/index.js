import React from "react";
import { Box, Center, FlatList, HStack, Image, Pressable, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import shortid from "shortid";
import { SharedElement } from "react-navigation-shared-element";
const CARD_WIDTH = 250;
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
    {
        id: shortid.generate(),
        title: "Card Seven",
        color: "blue.300",
    },
    {
        id: shortid.generate(),
        title: "Card Eight",
        color: "emerald.300",
    },
];
const Details = ({ navigation }) => {
    return (
        <Box flex={1}>
            <Pressable px="5" pt="3" pb="0" onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={24} />
            </Pressable>
            <VStack flex={1} justifyContent="space-around">
                <Box p="5" justifyContent={"center"}>
                    <HStack justifyContent="space-between">
                        {ICONS.map((img, index) => (
                            <SharedElement key={index} id={`item.${index}.icon`}>
                                <TouchableOpacity key={index}>
                                    <Center
                                        size={30}
                                        rounded={"full"}
                                        m="5"
                                        overflow={"hidden"}
                                        bg={"white"}
                                        shadow={3}
                                    >
                                        <Image
                                            source={img}
                                            alt={`${img}`}
                                            style={{ width: "100%", height: "100%" }}
                                            resizeMode="cover"
                                        />
                                    </Center>
                                </TouchableOpacity>
                            </SharedElement>
                        ))}
                    </HStack>
                </Box>
                <FlatList
                    data={CARDS}
                    keyExtractor={({ id }) => id}
                    renderItem={({ item }) => (
                        <Box bg={item.color} p={"5"} w={CARD_WIDTH} flex={1} rounded="3xl" m={5}>
                            <Text>{item.title}</Text>
                        </Box>
                    )}
                    horizontal
                    snapToInterval={CARD_WIDTH + 40}
                    showsHorizontalScrollIndicator={false}
                />
            </VStack>
        </Box>
    );
};

Details.sharedElements = () => {
    return ICONS.map((_, index) => `item.${index}.icon`);
};

export default Details;
