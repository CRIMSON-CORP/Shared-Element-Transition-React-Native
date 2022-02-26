import { FlatList, Text, Box } from "native-base";
import React from "react";
import { Dimensions } from "react-native";
import { data } from "../../../data";
const { width, height } = Dimensions.get("window");
const index = () => {
    return (
        <FlatList
            data={data}
            keyExtractor={(d) => d.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            pagingEnabled
            overflow={"visible"}
            contentContainerStyle={{
                overflow: "visible",
            }}
            renderItem={({ item }) => <CardsSlider cardData={item.sites} />}
        />
    );
};

export default index;

function CardsSlider({ cardData }) {
    return (
        <Box w={width - 40} h={height * 0.6} bg="green.300" rounded={20} p={5}>
            <Text>Hello</Text>
        </Box>
    );
}
