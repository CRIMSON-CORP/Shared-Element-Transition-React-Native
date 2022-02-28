import { Center, Heading, HStack, Image, VStack, ZStack, Text } from "native-base";
import { Assest } from "../../../assets";
const index = () => {
    return (
        <VStack space={8 / 4}>
            <Heading fontSize={"md"} fontWeight={"200"}>
                Your Team
            </Heading>
            <HStack flexDirection={"row"}>
                {Assest.images.team.map((img, index) => {
                    return <Avatar img={img} key={index} index={index} />;
                })}
                <Center
                    rounded="full"
                    size={36}
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
    );
};

export default index;

function Avatar({ img, index }) {
    return (
        <Center size={36} ml={index === 0 ? 0 : -3} shadow={8}>
            <Image
                source={img}
                style={{ width: 36, height: 36, resizeMode: "cover" }}
                alt="Avatar"
                rounded="full"
            />
        </Center>
    );
}
