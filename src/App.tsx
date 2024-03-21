import Navbar from "./components/Navbar.tsx";
import {Flex} from "@chakra-ui/react";
import Main from "./components/Main.tsx";

function App() {

    return (
        <>
            <Flex direction="column" flex="1" w={"100%"} bg={"#FAFAFA"}>
                <Navbar/>
                <Main/>
            </Flex>
        </>
    )
}

export default App
