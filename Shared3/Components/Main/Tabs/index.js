import { Center, HStack, Text, useTheme } from "native-base";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import { MainContext } from "../../../contexts";
import { data } from "../../../data";
data.map((d) => {
    d.tabRef = createRef();
    return d;
});
const index = () => {
    const { TabsMeasurments, setTabsMeasurments } = useContext(MainContext);
    const containerRef = useRef();
    useEffect(() => {
        let m = [];
        data.forEach((t) => {
            t.tabRef.current.measureLayout(containerRef.current, (x, y, width, height) => {
                m.push({ x, y, width, height });
                if (m.length === data.length) setTabsMeasurments(m);
            });
        });
    }, []);
    return (
        <HStack justifyContent={"space-between"} ref={containerRef}>
            {data.map(({ country: text, id, tabRef }) => (
                <Text ref={tabRef} textTransform={"capitalize"} key={id} fontSize="md">
                    {text}
                </Text>
            ))}
            {TabsMeasurments.length !== 0 && <Indicator />}
        </HStack>
    );
};

export default index;

function Indicator() {
    const { colors } = useTheme();
    const { TabsMeasurments } = useContext(MainContext);
    const index = 0;
    let tabLeft = TabsMeasurments[index].x;
    let taboffsetwidth = TabsMeasurments[index].width / 2;
    let offset = tabLeft + taboffsetwidth;
    offset = offset - 4;
    return (
        <Center
            position={"absolute"}
            size={8 / 4}
            bottom={-14}
            style={{ left: offset }}
            rounded="full"
            bg={colors.accent}
        />
    );
}
