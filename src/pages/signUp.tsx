import { useState } from "react";
import { Text, Input, Button, Box } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "@/hooks/firebase";

export const SignUp = () => {
  type Inputs = {
    email: string;
    password: string;
    confirmationPassword: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  // TODO: ここのロジックはhooksに移したい
  const auth = useAuth();
  const signUp = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Success!");
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = ({
    email,
    password,
    confirmationPassword,
  }) => {
    if (password == confirmationPassword) {
      signUp(email, password);
    } else {
      alert("パスワードが一致しません");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box textAlign="center">
          <Text mt="20">Sign Up</Text>
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
          <Text mt="5">パスワード再確認</Text>
          <Input
            id="confirmationPassword"
            {...register("confirmationPassword", { required: true })}
            type="password"
            placeholder="パスワード"
            w="15%"
            my="5"
          />
          {errors.confirmationPassword && (
            <Text>メールアドレスは必須です。</Text>
          )}
          <Button type="submit" display="block" margin="auto">
            Sign Up
          </Button>
        </Box>
      </form>
    </>
  );
};
