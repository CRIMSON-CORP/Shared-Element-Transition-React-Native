import { AntDesign, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { PanGestureHandler, FlingGestureHandler, Directions } from "react-native-gesture-handler";
import Animated, {
    interpolate,
    log,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from "react-native-reanimated";
const { width, height } = Dimensions.get("window");
const Cards = () => {
    const SavedStartScroll = useSharedValue(0);
    const Scroll = useSharedValue(0);
    const Index = useSharedValue(Scroll.value / 6);
    const AnimatedProfileStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: interpolate(Scroll.value, [0, 23.5], [0, data.length * 45]) }],
    }));
    return (
        <View style={{ flex: 1, padding: 20, paddingTop: StatusBar.currentHeight }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <AntDesign name="arrowleft" size={22} color="black" />
                    <Text
                        style={{
                            fontSize: 24,
                            textTransform: "capitalize",
                            fontWeight: "700",
                            marginLeft: 10,
                        }}
                    >
                        events
                    </Text>
                </View>
                <View>
                    <AntDesign name="search1" size={22} />
                </View>
            </View>
            <View style={{ width: "100%", height: 45, marginTop: 15, overflow: "hidden" }}>
                <Animated.View style={[AnimatedProfileStyles]}>
                    {data.map((item, index) => (
                        <Profile key={index} item={item} index={index} Scroll={Scroll} />
                    ))}
                </Animated.View>
            </View>
            <FlingGestureHandler
                direction={Directions.RIGHT}
                onEnded={() => {
                    Scroll.value = withSpring(
                        Scroll.value >= 0 ? 0 : Math.floor(Scroll.value + 6),
                        {
                            damping: 100,
                        }
                    );
                }}
            >
                <FlingGestureHandler
                    direction={Directions.LEFT}
                    onEnded={() =>
                        (Scroll.value = withSpring(
                            Scroll.value <= -Math.floor((data.length - 1) * 6)
                                ? -Math.floor((data.length - 1) * 6)
                                : Math.floor(Scroll.value - 6),
                            {
                                damping: 100,
                            }
                        ))
                    }
                >
                    <Animated.View style={{ marginTop: 20, flex: 1 }}>
                        {data.map((item, index) => (
                            <Card item={item} index={index} Scroll={Scroll} key={item.id} />
                        ))}
                    </Animated.View>
                </FlingGestureHandler>
            </FlingGestureHandler>
        </View>
    );
};

export default Cards;

function Card({ item, index, Scroll }) {
    const AnimatedCardStyles = useAnimatedStyle(() => ({
        transform: [
            { translateX: interpolate(Scroll.value + index * 6, [-5, 0, 40], [-400, 0, 200]) },
            { scale: interpolate(Scroll.value + index * 6, [-5, -3, 0, 40], [0.7, 0.85, 1, 0.5]) },
        ],
        opacity: interpolate(Scroll.value + index * 6, [-5, 0, 40], [1, 1, 0.3]),
    }));
    return (
        <Animated.View
            style={[
                {
                    width: width - 60,
                    height: height * 0.75,
                    borderRadius: 12,
                    overflow: "hidden",
                    position: "absolute",
                    top: 0,
                    elevation: 12,
                    zIndex: data.length - index,
                },
                AnimatedCardStyles,
            ]}
            key={item.id}
        >
            <Image
                source={item.img}
                style={[
                    { resizeMode: "cover", width: "100%", height: "100%" },
                    StyleSheet.absoluteFill,
                ]}
            />
        </Animated.View>
    );
}

function Profile({ item, Scroll, index }) {
    return (
        <View
            style={[
                {
                    height: 45,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                },
            ]}
        >
            <View style={{ height: "100%", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 26, fontWeight: "700" }}>{item.name}</Text>
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        opacity: 0.6,
                    }}
                >
                    <Ionicons name="person" size={14} color="black" />
                    <Text style={{ opacity: 0.6, marginLeft: 5 }}>{item.location}</Text>
                </View>
            </View>
            <Text style={{ opacity: 0.6, fontWeight: "700", marginTop: 5 }}>{item.date}</Text>
        </View>
    );
}

const data = [
    {
        id: 0,
        name: "Kabil Show",
        date: "Jan 24th, 2021",
        img: require("../../assets/wallpapers/johannes-plenio-qkfxBc2NQ18-unsplash.jpg"),
        location: "Mumbai, Saudi",
    },
    {
        id: 1,
        name: "Williams Stone",
        date: "Jan 24th, 2021",
        img: require("../../assets/wallpapers/krystal-ng-jRp60R7ogNQ-unsplash.jpg"),
        location: "Mumbai, Saudi",
    },
    {
        id: 2,
        name: "Chris Evans",
        date: "Jan 24th, 2021",
        img: require("../../assets/wallpapers/luca-bravo-VowIFDxogG4-unsplash.jpg"),
        location: "Mumbai, Saudi",
    },
    {
        id: 3,
        name: "Allison Mack",
        date: "Jan 24th, 2021",
        img: require("../../assets/wallpapers/johannes-plenio-qkfxBc2NQ18-unsplash.jpg"),
        location: "Mumbai, Saudi",
    },
];
