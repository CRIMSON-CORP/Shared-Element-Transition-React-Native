import { LinearGradient } from "expo-linear-gradient";
import {
    FlatList,
    Text,
    Box,
    Pressable,
    Image,
    Heading,
    VStack,
    HStack,
    Center,
    useTheme,
} from "native-base";
import React, { useContext } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { MainContext } from "../../../../contexts";
import { data } from "../../../../data";
const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = height * 0.6;
const index = () => {
    const { Scroll, Index } = useContext(MainContext);
    return (
        <FlatList
            data={data}
            keyExtractor={(d) => d.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            snapToInterval={CARD_WIDTH + 20}
            overflow={"visible"}
            contentContainerStyle={{
                overflow: "visible",
            }}
            decelerationRate={100}
            onScroll={(e) => {
                Scroll.value = e.nativeEvent.contentOffset.x;
            }}
            onMomentumScrollEnd={(e) => {
                Index.value = Math.floor(e.nativeEvent.contentOffset.x / CARD_WIDTH);
            }}
            renderItem={({ item }) => <CardsSlider cardData={item.sites} />}
        />
    );
};

export default index;

function CardsSlider({ cardData }) {
    const { navigation } = useContext(MainContext);
    const { colors } = useTheme();
    return cardData.map((card) => {
        return (
            <Pressable onPress={() => navigation.navigate("DetailsScreen", { card })} key={card.id}>
                <Box w={CARD_WIDTH} h={CARD_HEIGHT} rounded={20} mr={20 / 4} overflow="hidden">
                    <SharedElement id={`item.${card.id}.image`}>
                        <Image
                            source={card.img}
                            alt={card.location.city}
                            style={[
                                StyleSheet.absoluteFill,
                                { width: CARD_WIDTH, height: CARD_HEIGHT, resizeMode: "cover" },
                            ]}
                        />
                    </SharedElement>
                    <SharedElement id={`item.${card.id}.gradient`}>
                        <LinearGradient
                            colors={[
                                "rgba(0, 0, 0, 0)",
                                "rgba(0, 0, 0, 0.53)",
                                "rgba(0, 0, 0, 0.82)",
                            ]}
                            location={[0.0, 0.776, 0.1]}
                            start={{ x: 0.5, y: 0 }}
                            end={{ x: 0.5, y: 1 }}
                            style={[
                                StyleSheet.absoluteFill,
                                { zIndex: 4, width: CARD_WIDTH, height: CARD_HEIGHT },
                            ]}
                        />
                    </SharedElement>
                    <VStack space={11} position="absolute" zIndex={5} bottom={5} p={5}>
                        <SharedElement id={`item.${card.id}.text`}>
                            <Heading textTransform={"uppercase"} fontSize={"xl"}>
                                {card.location.city}
                            </Heading>
                        </SharedElement>
                        <HStack space={11} alignItems="center">
                            <Center size={8.87} bg={colors.accent} rounded="full" />
                            <Text textTransform={"uppercase"} fontSize={"md"}>
                                {card.location.country}
                            </Text>
                        </HStack>
                    </VStack>
                </Box>
            </Pressable>
        );
    });
}
