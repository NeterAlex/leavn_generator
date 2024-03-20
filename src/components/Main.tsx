import {
    Badge,
    Box,
    Button,
    Center,
    Heading,
    Input,
    Select,
    Spacer,
    Stack,
    Text,
    Textarea,
    useColorModeValue
} from "@chakra-ui/react";
import {genYearsList} from "../utils/genYearsList.ts";
import {useState} from "react";
import moment from "moment";
import {AddIcon, DeleteIcon, UpDownIcon} from "@chakra-ui/icons";
import {organiseData} from "../utils/organiseData.ts";
import ReactJson from "@microlink/react-json-view";
import {genDoc} from "../utils/genDoc.ts";


const Main = () => {
    const yearsList = genYearsList()
    const [trainDateList, setTrainDateList] = useState<Date[]>([])
    const [currentTrainDate, setCurrentTrainDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [sign, setSign] = useState("电气与信息学院")
    const [signDate, setSignDate] = useState(moment(new Date()).format("YYYY-MM-DD"))
    const [jsonStr, setJsonStr] = useState<string>("")
    const [year, setYear] = useState(new Date().getFullYear())

    return <>
        <Center py={6}>
            <Box
                maxW={'50%'}
                minW={'480px'}
                w={'full'}
                bg={useColorModeValue('white', 'gray.900')}
                boxShadow={'2xl'}
                rounded={'md'}
                p={6}
                overflow={'hidden'}>
                <Box h={'210px'} bg={'gray.100'} mt={-6} mx={-6} mb={6} padding={30}>
                    <Textarea h={"full"} maxH={"100%"}
                              placeholder="请输入包含请假人员数据的Json，若符合要求，数据将被自动解析、整理并显示在下方。"
                              value={jsonStr}
                              onChange={(e) => {
                                  setJsonStr(e.target.value);
                              }}/>
                    <Badge mb={2}>字段应包含：班级、姓名、学号、学院、辅导员（不限顺序）</Badge>
                </Box>
                <Stack>
                    <Text
                        color={'green.500'}
                        textTransform={'uppercase'}
                        fontWeight={800}
                        fontSize={'sm'}
                        letterSpacing={1.1}>
                        数据预览
                    </Text>
                    <ReactJson src={organiseData(jsonStr)} collapsed={true} enableClipboard={false} name="输入数据"
                               iconStyle={"square"}
                               displayDataTypes={false}/>
                    <Text mt={4}
                          color={'green.500'}
                          textTransform={'uppercase'}
                          fontWeight={800}
                          fontSize={'sm'}
                          letterSpacing={1.1}>
                        信息填写
                    </Text>
                    {/*培训日期*/}
                    <Heading
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        color={useColorModeValue('gray.700', 'white')}
                        fontSize={'2xl'}
                        fontFamily={'body'}>
                        培训日期
                    </Heading>
                    <Spacer h={8}/>
                    <Stack direction="row">
                        <Input
                            placeholder="选择日期"
                            size="md"
                            type="date"

                            value={currentTrainDate}
                            onChange={(e) => setCurrentTrainDate(e.target.value)}
                        />
                        <Button leftIcon={<AddIcon/>} bg={'green.100'} onClick={() => {
                            setTrainDateList([...trainDateList, moment(currentTrainDate).toDate()])
                        }}>增加</Button>
                        <Button leftIcon={<DeleteIcon/>} bg={'red.100'}
                                onClick={() => setTrainDateList(trainDateList.slice(0, trainDateList.length - 1))}>回退</Button>
                    </Stack>
                    <Stack direction="row">
                        {
                            trainDateList.map((date, index) => {
                                return (
                                    <Badge colorScheme='green' key={index}>
                                        {moment(date).format("YYYY年MM月DD日")}
                                    </Badge>
                                )
                            })
                        }
                    </Stack>
                    {/*年级*/}
                    <Heading mt={2}
                             color={useColorModeValue('gray.700', 'white')}
                             fontSize={'2xl'}
                             fontFamily={'body'}>
                        年级
                    </Heading>
                    <Spacer h={8}/>
                    <Stack direction="row">
                        <Select placeholder='选择年级' value={year} onChange={(e) => setYear(Number(e.target.value))}>
                            {yearsList.map((year, index) => {
                                return (<option key={index} value={year}>{year}级</option>)
                            })}
                        </Select>
                    </Stack>
                    {/*落款*/}
                    <Heading mt={4}
                             color={useColorModeValue('gray.700', 'white')}
                             fontSize={'2xl'}
                             fontFamily={'body'}>
                        签名落款
                    </Heading>
                    <Spacer h={8}/>
                    <Input type={"text"} disabled value={sign} onChange={(e) => setSign(e.target.value)}/>
                    {/*日期*/}
                    <Heading mt={4}
                             color={useColorModeValue('gray.700', 'white')}
                             fontSize={'2xl'}
                             fontFamily={'body'}>
                        签名日期
                    </Heading>
                    <Input mt={1}
                           placeholder="选择签名日期"
                           size="md"
                           type="date"
                           value={signDate}
                           onChange={(e) => setSignDate(e.target.value)}
                    />
                    <Stack mt={6} gap={4}>
                        <Button leftIcon={<UpDownIcon/>} color={"white"} bg={"green.500"} onClick={() => {
                            genDoc({jsonStr, year, trainDateList, signDate: moment(signDate).toDate()})
                        }}>生成</Button>
                        <Center>
                            <Badge colorScheme={"red"}>若文件下载不成功或下载不全，请授予自动下载权限</Badge>
                        </Center>
                        <Center>
                            <Box fontSize={12}
                                 cursor={"pointer"}
                                 color={"gray.500"}
                                 onClick={() => window.open("https://beian.miit.gov.cn/", "_blank")}>黑ICP备2023004156号-1</Box>
                        </Center>

                    </Stack>
                </Stack>
            </Box>

        </Center>
    </>
}

export default Main