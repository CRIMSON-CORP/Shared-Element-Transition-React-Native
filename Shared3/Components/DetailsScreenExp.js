import React from "react";
import {
    Box,
    Center,
    Container,
    Heading,
    HStack,
    Image,
    Text,
    useTheme,
    VStack,
} from "native-base";
import Details from "./DetailsScreen";
import { Assest } from "../assets";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SharedElement } from "react-navigation-shared-element";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("screen");
function DetailsScreenExp({ navigation, route }) {
    const { colors } = useTheme();
    return (
        <Container bg={colors.background} flex={1} w={"full"} maxWidth={"full"}>
            <MaterialCommunityIcons
                name="arrow-left"
                size={24}
                color="white"
                style={{
                    position: "absolute",
                    left: 20,
                    top: 60,
                    zIndex: 5,
                }}
                onPress={() => {
                    navigation.goBack();
                }}
            />
            <SharedElement
                id={`item.${route.params.card.id}.image`}
                style={[{ flex: 1, width, height }, StyleSheet.absoluteFill]}
            >
                <Image
                    source={route.params.card.img}
                    alt={route.params.card.location.city}
                    style={[StyleSheet.absoluteFill, { width, height, resizeMode: "cover" }]}
                />
            </SharedElement>
            <SharedElement id={`item.${route.params.card.id}.gradient`}>
                <LinearGradient
                    colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.53)", "rgba(0, 0, 0, 0.82)"]}
                    location={[0.0, 0.776, 0.1]}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    style={[StyleSheet.absoluteFill, { zIndex: 2, width, height }]}
                />
            </SharedElement>
            <Box p={5} w="full" position={"absolute"} bottom={20 / 4} zIndex={4}>
                <VStack space={12 / 4}>
                    <SharedElement id={`item.${route.params.card.id}.text`}>
                        <Heading textTransform={"uppercase"} fontSize={60} fontWeight={500}>
                            {route.params.card.location.city}
                        </Heading>
                    </SharedElement>
                    <HStack justifyContent={"space-between"} alignItems={"baseline"}>
                        <VStack space={10 / 4}>
                            <Text fontSize="md">Visitors</Text>
                            <HStack flexDirection={"row"}>
                                {Assest.images.team.map((img, index) => {
                                    return <Avatar img={img} key={index} index={index} />;
                                })}
                                <Center
                                    rounded="full"
                                    size={30}
                                    shadow={8}
                                    bg="#2C2C2C"
                                    borderColor={"#767676"}
                                    borderWidth={1}
                                    ml={-3}
                                >
                                    <Text>+23</Text>
                                </Center>
                            </HStack>
                        </VStack>
                        <VStack>
                            <Text fontSize="md">Sites</Text>
                            <Text fontSize={32} fontWeight={400}>
                                30
                                <Text fontSize={"sm"} fontWeight={300}>
                                    Sites
                                </Text>
                            </Text>
                        </VStack>
                        <VStack>
                            <Text fontSize="md">Visits</Text>
                            <Text fontSize={32} fontWeight={400}>
                                2370
                                <Text fontSize={"sm"} fontWeight={300}>
                                    Visits
                                </Text>
                            </Text>
                        </VStack>
                    </HStack>
                </VStack>
            </Box>
        </Container>
    );
}

function Avatar({ img, index }) {
    return (
        <Center size={30} ml={index === 0 ? 0 : -3} shadow={8}>
            <Image
                source={img}
                style={{ width: 30, height: 30, resizeMode: "cover" }}
                alt="Avatar"
                rounded="full"
            />
        </Center>
    );
}

DetailsScreenExp.sharedElements = ({ route }) => {
    return [
        { id: `item.${route.params.card.id}.image` },
        { id: `item.${route.params.card.id}.gradient` },
        { id: `item.${route.params.card.id}.text` },
    ];
};

export default DetailsScreenExp;
