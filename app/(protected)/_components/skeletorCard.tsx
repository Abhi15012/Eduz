import { Skeleton } from "moti/skeleton";
import { useColorScheme } from "nativewind";
import React from "react";
import { Dimensions, View } from "react-native";

type ColorMode = "light" | "dark";

interface SkeletonBlockProps {
  width: number | string;
  height: number;
  radius?: number;
  colorMode: ColorMode;
}

const SkeletonBlock: React.FC<SkeletonBlockProps> = ({
  width,
  height,
  radius = 8,
  colorMode,
}) => (
  <Skeleton
    colorMode={colorMode}
    width={typeof width === "number" ? width : undefined}
    height={height}
    radius={radius}

  />
);

interface CourseCardSkeletonProps {
  isHorizontal?: boolean;
}

export const CourseCardSkeleton: React.FC<CourseCardSkeletonProps> = ({
  isHorizontal = false,
}) => {
  const { width } = Dimensions.get("window");
  const cardWidth = isHorizontal ? width - 100 : "100%";
  const { colorScheme } = useColorScheme();
  const colorMode: ColorMode = colorScheme === "dark" ? "dark" : "light";

  return (
    <View
      style={{
        width: cardWidth,
        height: 300,
        marginRight: isHorizontal ? 10 : 0,
      }}
      className="flex-1 mb-2 rounded-xl bg-light/50 dark:bg-gray-900 border-[0.2px] border-gray-500 overflow-hidden"
    >
      <SkeletonBlock
        width="100%"
        height={180}
        radius={0}
        colorMode={colorMode}
      />

      <View className="flex-1 px-3 py-2 justify-between">
        <View className="px-1 space-y-2">
          <SkeletonBlock width="80%" height={22} colorMode={colorMode} />
          <SkeletonBlock width="100%" height={14} colorMode={colorMode} />
          <SkeletonBlock width="60%" height={16} colorMode={colorMode} />
        </View>

        <View className="mt-3 space-y-2">
          <SkeletonBlock width="45%" height={18} colorMode={colorMode} />
          <SkeletonBlock width="50%" height={16} colorMode={colorMode} />
        </View>
      </View>

      <View className="absolute top-3 right-3">
        <SkeletonBlock
          width={56}
          height={22}
          radius={999}
          colorMode={colorMode}
        />
      </View>
    </View>
  );
};

export const CourseCardSkeletonList: React.FC<{
  count?: number;
  isHorizontal?: boolean;
}> = ({ count = 3, isHorizontal = false }) => {
  const containerClass = isHorizontal ? "flex-row" : "flex-col";

  return (
    <View className={`${containerClass}`}>
      {Array.from({ length: count }).map((_, idx) => (
        <CourseCardSkeleton key={idx} isHorizontal={isHorizontal} />
      ))}
    </View>
  );
};

export default CourseCardSkeleton;
