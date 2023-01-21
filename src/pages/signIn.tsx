import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Text, Input, Button, Box } from "@chakra-ui/react";
import { useAuth } from "@/hooks/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export const SignIn = () => {
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const auth = useAuth();
  const signIn = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Success!");
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = ({ email, password }) => {
    signIn(email, password);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box textAlign="center">
          <Text mt="20">Sign In</Text>
          <Text mt="5">メールアドレス</Text>
          <Input
            id="email"
            {...register("email", { required: true })}
            type="email"
            placeholder="メールアドレス"
            w="15%"
            my="5"
          />
          {errors.email && <Text>メールアドレスは必須です。</Text>}
          <Text mt="5">パスワード</Text>
          <Input
            id="password"
            {...register("password", { required: true })}
            type="password"
            placeholder="パスワード"
            w="15%"
            my="5"
          />
          {errors.password && <Text>パスワードは必須です</Text>}
          <Button type="submit" display="block" margin="auto">
            Sign In
          </Button>
        </Box>
      </form>
    </>
  );
};
