import { Button } from "@/components/appButton";
import Bg from "@/components/bg";
import { useToast } from "@/hooks/useToast";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Pressable,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRegister } from "../../utils/Auth/controllers";
import { RegisterSchema } from "../../utils/Auth/schema";
import { RegisterInput } from "../../utils/Auth/types";
import Header from "./_components/header";
import Texts from "./_components/texts";

export default function Register() {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      role: "ADMIN",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: RegisterInput) => {
    try {
      console.log(data, "register data");
      const res = await useRegister(data);
      console.log(res);
      if (res.success) {
        showToast("Registered successfully!", "success");
        router.replace("/signin");
      } else {
        showToast(
          res.message ||
            "Failed to register. Please check your credentials and try again.",
          "error",
        );
      }
    } catch (err) {
      console.error(err);
      showToast(
        "Failed to register. Please check your credentials and try again.",
        "error",
      );
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <SafeAreaView className="flex-1 p-5 justify-start items-center bg-light dark:bg-dark">
      <Bg />

      <Header />

      <Texts
        heading="Join the EduZ Community"
        content="  Join us and start your learning journey today!"
      />

      <View className="w-full">
        <MotiView
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 500 }}
          className="w-full mb-4 my-10"
        >
          <Text className="text-sm font-l-regular dark:text-dark-subtitle text-light-subtitle mb-1.5">
            Username
          </Text>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your username"
                autoCapitalize="none"
                autoCorrect={false}
                className="bg-input-light dark:bg-input-dark my-1 py-4 px-4 rounded-3xl
                     text-light-body dark:text-dark-body
                    "
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          {errors.username && (
            <Text className="text-xs text-red-500 mt-1 ml-1">
              {errors.username.message}
            </Text>
          )}
        </MotiView>

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
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 600 }}
          className="w-full mb-14 "
        >
          <Text className="text-sm font-l-regular dark:text-dark-subtitle text-light-subtitle mb-1.5">
            Password
          </Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                className="bg-input-light dark:bg-input-dark my-1 py-4 px-4 rounded-3xl
                     text-light-body dark:text-dark-body
                    "
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          <Pressable className="absolute right-7 top-5 bottom-0 justify-center">
            {showPassword ? (
              <MaterialIcons
                name="visibility-off"
                size={20}
                color="#9ca3af"
                onPress={toggleShowPassword}
              />
            ) : (
              <MaterialIcons
                name="visibility"
                size={20}
                color="#9ca3af"
                onPress={toggleShowPassword}
              />
            )}
          </Pressable>
          {errors.password && (
            <Text className="text-xs text-red-500 mt-1 ml-1">
              {errors.password.message}
            </Text>
          )}
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 700 }}
        >
          <Button
            label="Create Account"
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
          Have an account?{" "}
          <Text className="text-primary font-l-semibold">Sign In</Text>
        </MotiText>
      </View>
    </SafeAreaView>
  );
}
