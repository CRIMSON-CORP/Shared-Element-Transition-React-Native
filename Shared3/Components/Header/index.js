import { Box, HStack } from "native-base";
import Logo from "./Logo";
import ProfilePicture from "./ProfilePicture";
const index = () => {
    return (
        <Box>
            <HStack justifyContent={"space-between"} alignItems="center">
                <Logo />
                <ProfilePicture />
            </HStack>
        </Box>
    );
};

export default index;
