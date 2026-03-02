import { Button } from "@/components/appButton";
import Bg from "@/components/bg";
import { useToast } from "@/hooks/useToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    useForgotPassword
} from "../../utils/Auth/controllers";
import { forgotPasswordSchema } from "../../utils/Auth/schema";
import { ForgotPasswordInput } from "../../utils/Auth/types";
import Header from "./_components/header";
import Texts from "./_components/texts";

export default function fgp() {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: ForgotPasswordInput) => {
    try {
      const res = await useForgotPassword(data);
      console.log(res);
      if (res.success) {
        showToast(res.message, "success");
      } else {
        showToast(
          res.message ||
            "Failed to send forgot password request. Please try again.",
          "error",
        );
      }
    } catch (err) {
      console.error(err);
      showToast(
        "Failed to send forgot password request. Please try again.",
        "error",
      );
    }
  };

  return (
    <SafeAreaView className="flex-1 p-5 justify-start items-center bg-light dark:bg-dark">
      <Bg />

      <Header />

      <Texts
        heading="Forgot your password?"
        content="Enter your email address below and we'll send you a link to reset your password."
      />

      <View className="w-full">
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 500 }}
          className="w-full mb-4 "
        >
          <Text className="text-sm font-l-regular dark:text-dark-subtitle text-light-subtitle mb-1.5">
            Email
          </Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your email"
                autoCapitalize="none"
                autoCorrect={false}
                className="bg-input-light dark:bg-input-dark my-1 py-4 px-4 rounded-3xl
                     text-light-body dark:text-dark-body
                    "
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.email && (
            <Text className="text-xs text-red-500 mt-1 ml-1">
              {errors.email.message}
            </Text>
          )}
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 700 }}
        >
          <Button
            label="Send Reset Link"
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
        </MotiView>

        <MotiText
          onPress={() => {
            router.replace("/signin");
          }}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 800 }}
          className="text-base  text-center my-10 font-l-regular dark:text-dark-subtitle text-light-subtitle "
        >
          Remember your password?{" "}
          <Text className="text-primary font-l-semibold">Sign In</Text>
        </MotiText>
      </View>
    </SafeAreaView>
  );
}
