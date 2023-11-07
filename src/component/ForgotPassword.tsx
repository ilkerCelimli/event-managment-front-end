import {Button, Flex, FormControl, Heading, Input, useColorModeValue} from "@chakra-ui/react";
import {Form, FormSubmitHandler, useForm} from "react-hook-form";
import {isValueUndefined} from "../utils/IsValueUndefined.tsx";
import {forgotPasswordModel} from "../model/Models.tsx";

const ForgotPasswordPage = () => {

    const formBackground = useColorModeValue('gray.100', 'gray.700');
    const {register,control,formState: {errors}} = useForm<forgotPasswordModel>();
    const onSubmit : FormSubmitHandler<forgotPasswordModel> = (data) => {
        console.log(data)
    }

    return(
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
                    <Button colorScheme="teal" mb={8} type={"submit"}>
                        Parola sıfırla
                    </Button>
                </Form>
            </Flex>
        </Flex>
    )

}


export default ForgotPasswordPage