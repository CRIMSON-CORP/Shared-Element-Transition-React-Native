import { VStack } from "native-base";
import Tabs from "./Tabs";
import { useState } from "react";
import Locations from "./Locations";
import { MainContext } from "../../../contexts";
import { useSharedValue } from "react-native-reanimated";

const index = () => {
    const [TabsMeasurments, setTabsMeasurments] = useState([]);
    const Scroll = useSharedValue(0);
    const Index = useSharedValue(0);
    return (
        <MainContext.Provider value={{ TabsMeasurments, setTabsMeasurments, Scroll, Index }}>
            <VStack space={41}>
                <Tabs />
                <Locations />
            </VStack>
        </MainContext.Provider>
    );
};

export default index;
