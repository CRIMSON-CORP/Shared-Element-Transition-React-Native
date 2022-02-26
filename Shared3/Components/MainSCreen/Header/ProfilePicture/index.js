import { Center, Image } from "native-base";
import { Assest } from "../../../assets";

const index = () => {
    return (
        <Center size="8">
            <Image
                source={Assest.images.profile}
                alt="Profile Picture"
                w={"100%"}
                h={"100%"}
                resizeMode="cover"
                rounded={"full"}
            />
        </Center>
    );
};

export default index;
