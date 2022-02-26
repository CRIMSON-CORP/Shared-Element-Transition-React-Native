import { FlatList, Text, Box } from "native-base";
import React, { useContext } from "react";
import { Dimensions } from "react-native";
import { MainContext } from "../../../contexts";
import { data } from "../../../data";
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
            pagingEnabled
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
    return (
        <Box w={CARD_WIDTH} h={CARD_HEIGHT} bg="green.300" rounded={20} p={5}>
            <Text>Hello</Text>
        </Box>
    );
}
