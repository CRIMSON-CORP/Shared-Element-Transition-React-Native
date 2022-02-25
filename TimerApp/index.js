import { View, Text, StyleSheet, StatusBar, Dimensions, Pressable } from "react-native";
import React from "react";
import { Center, FlatList } from "native-base";
import Animated, {
    Easing,
    interpolate,
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { TapGestureHandler } from "react-native-gesture-handler";
const { width, height } = Dimensions.get("window");
const DATA = [
    { key: 0, count: 1 },
    { key: 1, count: 5 },
    { key: 2, count: 10 },
    { key: 3, count: 15 },
    { key: 4, count: 20 },
    { key: 5, count: 30 },
    { key: 6, count: 60 },
    { key: 7, count: "" },
];
const Timer = () => {
    const scrollShared = useSharedValue(0);
    const pressed = useSharedValue(1);
    const scrollIndex = useSharedValue(0);
    const timerShared = useSharedValue(0);
    const duration = useSharedValue(0);
    function indexFinder() {
        let count = DATA.find((d) => d.key == scrollIndex.value).count;
        duration.value = count * 1000;
    }
    const getsure = useAnimatedGestureHandler({
        onStart: () => {
            pressed.value = withSpring(0.7);
            runOnJS(indexFinder)();
        },
        onFinish: () => {
            pressed.value = withSpring(1);
            timerShared.value = height;
            timerShared.value = withTiming(0, {
                duration: duration.value,
                easing: Easing.out(Easing.quad),
            });
        },
    });

    const AinmatedBg = useAnimatedStyle(() => ({
        height: timerShared.value,
    }));

    const PlayAnimationPressed = useAnimatedStyle(() => ({
        transform: [{ scale: pressed.value }],
    }));

    return (
        <View
            style={[
                { flex: 1, backgroundColor: "#333", paddingTop: StatusBar.currentHeight },
                StyleSheet.absoluteFill,
            ]}
        >
            <FlatList
                data={DATA}
                keyExtractor={(item) => item.key}
                horizontal
                contentContainerStyle={{
                    marginHorizontal: width / 4,
                }}
                snapToInterval={width / 2}
                decelerationRate={100}
                renderItem={({ item, index }) => {
                    return (
                        <Number
                            item={item}
                            scrollShared={scrollShared}
                            index={index}
                            timerShared={timerShared}
                        />
                    );
                }}
                onScroll={(e) => {
                    scrollShared.value = e.nativeEvent.contentOffset.x;
                }}
                onMomentumScrollEnd={(e) => {
                    scrollIndex.value = Math.ceil(e.nativeEvent.contentOffset.x / (width / 2));
                }}
                showsHorizontalScrollIndicator={false}
            />
            <TapGestureHandler onGestureEvent={getsure}>
                <Animated.View
                    style={[
                        {
                            position: "absolute",
                            bottom: 100,
                            left: width / 2 - 30,
                            width: 60,
                            height: 60,
                            borderRadius: 60,
                            backgroundColor: "violet",
                            justifyContent: "center",
                            alignItems: "center",
                            elevation: 7,
                        },
                        PlayAnimationPressed,
                    ]}
                >
                    <Ionicons name="ios-play" size={24} color="black" />
                </Animated.View>
            </TapGestureHandler>
            <Animated.View
                style={[
                    {
                        backgroundColor: "violet",
                        zIndex: -2,
                        bottom: 0,
                        position: "absolute",
                        left: 0,
                        right: 0,
                        width,
                    },
                    AinmatedBg,
                ]}
            ></Animated.View>
        </View>
    );
};

function Number({ item, scrollShared, index }) {
    const inputRange = [(index - 1) * (width / 2), index * (width / 2), (index + 1) * (width / 2)];
    const TextStyles = useAnimatedStyle(() => ({
        transform: [
            {
                scale: interpolate(scrollShared.value, inputRange, [1, 2, 1]),
            },
        ],
        opacity: interpolate(scrollShared.value, inputRange, [0.4, 1, 0, 4]),
    }));
    return (
        <View
            style={{
                flex: 1,
                width: width / 2,
                height,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Animated.Text style={[{ fontSize: 40, color: "white" }, TextStyles]}>
                {item.count}
            </Animated.Text>
        </View>
    );
}

export default Timer;
