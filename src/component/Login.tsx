import {
    Flex,
    Heading,
    Input,
    Button,
    FormControl,
    FormLabel,
    useColorModeValue, Link, useToast,
} from '@chakra-ui/react';
import {loginModel, response} from "../model/Models.tsx";
import {Form, FormSubmitHandler, useForm} from "react-hook-form";
import {isValueUndefined} from "../utils/IsValueUndefined.tsx";
import axios from "axios";
import {useAuth} from "../context/AuthContext.tsx";
import {useNavigate} from "react-router-dom";
import {useLayoutEffect} from "react";

const Login = () => {
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const {register, control, formState: {errors}} = useForm<loginModel>();
    const {isLoggIn, login} = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    useLayoutEffect(() => {
        console.log(isLoggIn)
        if (localStorage.getItem("accessToken")) {
            const interval = setInterval(() => {
                toast({
                    title: "Giriş Başarılı",
                    description: "Anasayfaya yönlendiriliyorsunuz",
                    status: "success",
                    duration: 1500,
                    isClosable: true,
                })
                navigate("/")
            }, 2000)
            return () => clearInterval(interval)
        }
    }, [isLoggIn])

    const onSubmit: FormSubmitHandler<loginModel> = async (data) => {
        const request = await axios<response>('http://localhost/user/login', {
            data: data.data,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',

            }
        })
        if (request.status === 200) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            login(request.data.data.accessToken, request.data.data.refreshToken)
            const interval = setInterval(() => {
                navigate("/")
            }, 2000)
            return () => clearInterval(interval)
        } else {
            toast({
                title: "Giriş Basarisiz",
                status: "error",
                duration: 1500,
                isClosable: true,
            })
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
                        Giriş yap
                    </Button>

                    <FormControl display="flex" alignItems="center">
                        <Link href={"/forgotpassword"}>Parolamı unuttum.</Link>
                    </FormControl>

                    <FormControl display="flex" alignItems="center">
                        <FormLabel htmlFor="dark_mode" mb="0">
                            Kayıt olmak ister misiniz?
                        </FormLabel>
                        <Link href={"/register"}>Kayıt Ol</Link>
                    </FormControl>


                </Form>
            </Flex>
        </Flex>
    );
};

export default Login;
