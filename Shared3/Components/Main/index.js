import { VStack } from "native-base";
import Tabs from "./Tabs";
import { useState } from "react";
import Locations from "./Locations";
import { MainContext } from "../../contexts";

const index = () => {
    const [TabsMeasurments, setTabsMeasurments] = useState([]);
    return (
        <MainContext.Provider value={{ TabsMeasurments, setTabsMeasurments }}>
            <VStack>
                <Tabs />
                <Locations />
            </VStack>
        </MainContext.Provider>
    );
};

export default index;
