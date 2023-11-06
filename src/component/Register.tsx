import {Button, Flex, FormControl, Heading, Input, useColorModeValue} from "@chakra-ui/react";
import {Form, FormSubmitHandler, useForm} from "react-hook-form";
import {isValueUndefined} from "../utils/IsValueUndefined.tsx";
import {registerModel, response} from "../model/Models.tsx";
import {defaultUser} from "../model/DefaultValues.tsx";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const RegisterPage = () => {

    const {register, control, formState: {errors}} = useForm<registerModel>();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const navigate = useNavigate();
    const onSubmit: FormSubmitHandler<registerModel> = async (data) => {
        const user : registerModel = defaultUser(data.data)
        console.log(user)
        const request = await axios<response>('http://localhost/user/register',{
            data : user,
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json',
            }
        })

        if(request.data.statusCode === 200){
            navigate("/")
        }
    }

    return (
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <Flex
                flexDirection="column"
                bg={formBackground}
                p={12}
                borderRadius={8}
                boxShadow="lg"
            >
                <Heading mb={6}>Kayıt Ol</Heading>
                <Form control={control} onSubmit={onSubmit}>
                    <FormControl isInvalid={!isValueUndefined(errors.name)}>
                        <Input
                            placeholder="John"
                            type="text"
                            variant="filled"
                            mb={3}
                            {...register("name", {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message: "En az 3 karakterli bir isim olmalı."
                                }
                            })}
                        />
                    </FormControl>

                    <FormControl isInvalid={!isValueUndefined(errors.surname)}>
                        <Input
                            placeholder="Doe"
                            type="text"
                            variant="filled"
                            mb={3}
                            {...register("surname", {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message: "En az 3 karakterli bir soyisim olmalı."
                                }
                            })}
                        />
                    </FormControl>

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

                    <FormControl isInvalid={!isValueUndefined(errors.birtday)}>
                        <Input
                            placeholder="Doğum tarihiniz."
                            type="date"
                            variant="filled"
                            mb={3}
                            {...register("birtday", {
                                required: true,
                            })}
                        />
                    </FormControl>

                    <FormControl isInvalid={!isValueUndefined(errors.phoneNumber)}>
                        <Input
                            placeholder="+........"
                            type="text"
                            variant="filled"
                            mb={3}
                            {...register("phoneNumber", {
                                required: true,
                                minLength: {
                                    value: 3,
                                    message: "En az 3 karakterli bir isim olmalı."
                                }
                            })}
                        />
                    </FormControl>


                    <Button colorScheme="teal" mb={8} type={"submit"}>
                        Giriş yap
                    </Button>
                </Form>
            </Flex>
        </Flex>
    )
}

    export default RegisterPage