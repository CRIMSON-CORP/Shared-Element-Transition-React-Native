import { HStack, Text } from "native-base";

const TABS = [
    {
        id: 0,
        text: "europe",
    },
    {
        id: 1,
        text: "America",
    },
    {
        id: 2,
        text: "ireland",
    },
    {
        id: 3,
        text: "africa",
    },
    {
        id: 4,
        text: "australia",
    },
];
const index = () => {
    return (
        <HStack justifyContent={"space-between"}>
            {TABS.map(({ text, id }) => (
                <Text textTransform={"capitalize"} key={id} fontSize="md">
                    {text}
                </Text>
            ))}
        </HStack>
    );
};

export default index;
