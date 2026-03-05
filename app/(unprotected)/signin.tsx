import { Button } from "@/components/appButton";
import Bg from "@/components/bg";
import { setToken, toggleSign } from "@/config/store.functions";
import { useToast } from "@/hooks/useToast";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignin } from "../../utils/Auth/controllers";
import { LoginSchema } from "../../utils/Auth/schema";
import { LoginInput } from "../../utils/Auth/types";
import Header from "./_components/header";
import Texts from "./_components/texts";

export default function Signin() {
  const { showToast } = useToast();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginInput) => {
    try {
      const res = await useSignin(data);
      

      if (res.success) {
        showToast("Signed in successfully!", "success");
        setToken(res.data.accessToken);
    
        router.push("/list");
        reset();
        
      } else {
        showToast(
          res.message ||
            "Failed to sign in. Please check your credentials and try again.",
          "error",
        );
      }
    } catch (err) {
      console.error(err);
      showToast(
        "Failed to sign in. Please check your credentials and try again.",
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
      <Bg  />

      <Header />

      <Texts
        heading="Continue your Journey"
        content={"Sign in to access your personalized \n learning experience."}
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
            label="Sign In"
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            loading={isSubmitting}
          />
        </MotiView>

        <MotiText
          onPress={() => {
            router.push("/fgp");
          }}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 800 }}
          className="text-base  text-center mt-14 font-l-regular dark:text-dark-subtitle text-light-subtitle "
        >
          Forgot your password?
        </MotiText>

        <MotiText
          onPress={() => {
            router.replace("/register");
          }}
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 400, delay: 800 }}
          className="text-base  text-center my-10 font-l-regular dark:text-dark-subtitle text-light-subtitle "
        >
          Dont have an account?{" "}
          <Text className="text-primary font-l-semibold">Sign Up</Text>
        </MotiText>
      </View>
    </SafeAreaView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 48,
    borderRadius: 30,
    paddingHorizontal: 14,

    fontSize: 15,
    borderWidth: 0.5,
  },
  inputNormal: {
    color: "#111827",
  },
  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fef2f2",
    color: "#111827",
  },

  // Button base
  button: {
    height: 50,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  buttonFullWidth: {
    width: "100%",
  },
  buttonPrimary: {
    backgroundColor: "#6366f1",
  },
  buttonOutline: {
    borderWidth: 1.5,
    borderColor: "#6366f1",
    backgroundColor: "transparent",
  },
  buttonGhost: {
    backgroundColor: "transparent",
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonPressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
