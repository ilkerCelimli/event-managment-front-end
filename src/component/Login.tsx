import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    Switch,
    useColorMode,
    useColorModeValue,
} from '@chakra-ui/react';
import {loginModel, response} from "../model/Models.tsx";
import {Form, FormSubmitHandler, useForm} from "react-hook-form";
import {isValueUndefined} from "../utils/IsValueUndefined.tsx";
import axios from "axios";
import {useAuth} from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";
const Login = () => {
    const {toggleColorMode} = useColorMode();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const {register, control, formState: {errors}} = useForm<loginModel>();
    const {login} = useAuth();
    const navigate = useNavigate();
    const onSubmit: FormSubmitHandler<loginModel> = async (data) => {
        const request = await axios<response>('http://localhost/user/login',{
            data : data.data,
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',

            }
        })
        if(request.status === 200){
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            login(request.data.data.accessToken,request.data.data.refreshToken)
            navigate("/")
        }
    };
    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <Flex
                flexDirection="column"
                bg={formBackground}
                p={12}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6}>Log In</Heading>
                <Form control={control} onSubmit={onSubmit}>
                    <FormControl isInvalid={!isValueUndefined(errors.email)}>
                        <Input
                            placeholder="example@example.com"
                            type="email"
                            variant="filled"
                            mb={3}
                            {...register("email", {
                                required: true,
                            })}
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            placeholder="**********"
                            type="password"
                            variant="filled"
                            mb={6}
                            {...register("password", {
                                required: true,
                                minLength: {
                                    value: 5,
                                    message: "En az 8 karakterli bir şifre giriniz."
                                },
                                maxLength: {
                                    value: 20,
                                    message: "En fazla 20 karakterli bir şifre giriniz."
                                }
                            })}
                        />
                    </FormControl>

                    <Button colorScheme="teal" mb={8} type={"submit"}>
                        Log In
                    </Button>
                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="dark_mode" mb="0">
                            Enable Dark Mode?
                        </FormLabel>
                        <Switch
                            id="dark_mode"
                            colorScheme="teal"
                            size="lg"
                            onChange={toggleColorMode}
                        />
                    </FormControl>
                </Form>
            </Flex>
        </Flex>
    );
};

export default Login;
