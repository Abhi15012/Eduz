import Bg from "@/components/bg";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import {
    Directions,
    FlingGestureHandler,
    State,
} from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

interface Program {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnailUrl: string;
  tutorName: string;
  rating: number;
  duration?: string;
  level?: "easy" | "medium" | "hard";
  category?: string;
}

// Dummy data
const DUMMY_DATA: Program[] = [
  {
    _id: "1",
    title: "Complete React Native Course",
    description:
      "Learn React Native from scratch and build real-world mobile applications with hands-on projects.",
    price: 1999,
    thumbnailUrl: "https://picsum.photos/400/600?random=1",
    tutorName: "John Smith",
    rating: 4.8,
    duration: "12 hrs",
    level: "medium",
    category: "Mobile Development",
  },
  {
    _id: "2",
    title: "Advanced JavaScript Mastery",
    description:
      "Deep dive into JavaScript concepts including closures, prototypes, async programming and more.",
    price: 2499,
    thumbnailUrl: "https://picsum.photos/400/600?random=2",
    tutorName: "Sarah Johnson",
    rating: 4.6,
    duration: "18 hrs",
    level: "hard",
    category: "Web Development",
  },
  {
    _id: "3",
    title: "UI/UX Design Fundamentals",
    description:
      "Master the principles of user interface and user experience design with practical examples.",
    price: 1499,
    thumbnailUrl: "https://picsum.photos/400/600?random=3",
    tutorName: "Mike Davis",
    rating: 4.9,
    duration: "8 hrs",
    level: "easy",
    category: "Design",
  },
  {
    _id: "4",
    title: "Python for Data Science",
    description:
      "Learn Python programming for data analysis, visualization and machine learning applications.",
    price: 2999,
    thumbnailUrl: "https://picsum.photos/400/600?random=4",
    tutorName: "Emily Chen",
    rating: 4.7,
    duration: "24 hrs",
    level: "medium",
    category: "Data Science",
  },
  {
    _id: "5",
    title: "Node.js Backend Development",
    description:
      "Build scalable backend applications with Node.js, Express and MongoDB database.",
    price: 1799,
    thumbnailUrl: "https://picsum.photos/400/600?random=5",
    tutorName: "Alex Wilson",
    rating: 4.5,
    duration: "15 hrs",
    level: "medium",
    category: "Backend Development",
  },
];

const setRatingColor = (rating: number) => {
  if (rating >= 4.5) {
    return "#16a34a";
  } else if (rating >= 3) {
    return "#eab308";
  } else {
    return "#dc2626";
  }
};

export default function Recentwallets({ from }: { from?: string }) {
  const [data, setData] = React.useState<Program[]>(DUMMY_DATA);

  const [index, setIndex] = React.useState(0);

  const { width } = Dimensions.get("window");
  const insets = useSafeAreaInsets();



  const IMG_HEIGHT =  insets.bottom > 0 ? width -10 : width * 1.3;
  const IMG_WIDTH = width * 0.8;

  const scrollIndex = useRef(new Animated.Value(0)).current;
  const scrollXAnimated = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollIndex,
      useNativeDriver: true,
    }).start();
  });
  useEffect(() => {
    Animated.spring(scrollXAnimated, {
      toValue: scrollIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlingGestureHandler
      key="left"
      direction={Directions.LEFT}
      onHandlerStateChange={(ev) => {
        if (index >= data.length - 1) {
          return;
        }
        if (ev.nativeEvent.state === State.END) {
          setIndex(index + 1);
          scrollIndex.setValue(index + 1);
        }
      }}
    >
      <FlingGestureHandler
        key="right"
        direction={Directions.RIGHT}
        onHandlerStateChange={(ev) => {
          if (index === 0) {
            return;
          }
          if (ev.nativeEvent.state === State.END) {
            setIndex(index - 1);
            scrollIndex.setValue(index - 1);
          }
        }}
      >
        <SafeAreaView className=" min-h-[55vh] justify-center">
         {/* <Bg opacity={0.34} /> */}

          
              <Text className="font-l-semibold  text-lg dark:text-gray-200 mb-2 px-3">
                Trending Courses
              </Text>
          
         
          <FlatList
            data={data}
            horizontal
          inverted
            contentContainerStyle={{
              flex: 1,
              justifyContent: "center",
              padding: 20,
            }}
            scrollEnabled={false}
            CellRendererComponent={({
              item,
              index,
              children,
              style,
              ...props
            }) => {
              const newStyles = [{ zIndex: data.length - index }, style];

              return (
                <View style={newStyles} {...props} key={index}>
                  {children}
                </View>
              );
            }}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              const inputRange = [index - 1, index, index + 1];
              const translateX = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [45, 0, -40],
              });
              const scale = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.8, 1, 0.9],
              });
              const opacity = scrollXAnimated.interpolate({
                inputRange,
                outputRange: [0.9, 1, 0],
              });

              return (
                <Animated.View
                  style={[
                    {
                     position: "absolute",
                     left: (-IMG_WIDTH -50) / 2,
                      transform: [{ translateX }, { scale }],
                      opacity,
                      width: IMG_WIDTH,
                      height: IMG_HEIGHT-40,
                    },
                  ]}
                  className="bg-light dark:bg-gray-900 rounded-2xl overflow-hidden"
                >
                  <Image
                    source={{ uri: item.thumbnailUrl }}
                    style={{
                      width: IMG_WIDTH,
                      height: IMG_HEIGHT * 0.5 ,
                    }}
                    contentFit="cover"
                  />

               
                  {item.rating && item.rating > 0 && (
                    <View
                      style={{ backgroundColor: setRatingColor(item.rating) }}
                      className="absolute top-2 right-2 px-1 py-0.5 rounded flex-row items-center"
                    >
                      <MaterialIcons name="star" size={12} color="white" />
                      <Text className="text-xs text-white font-l-semibold ml-1">
                        {item.rating.toFixed(1)}
                      </Text>
                    </View>
                  )}

                
                  <View className="flex-1 px-3 py-2 justify-between">
                    <View className="px-1">
                      <Text
                        numberOfLines={2}
                        className="text-lg font-l-semibold text-light-title dark:text-dark-title"
                      >
                        {item.title}
                      </Text>
                      <Text
                        numberOfLines={2}
                        className="text-sm h-10 overflow-hidden font-l-regular text-light-body dark:text-dark-body mt-1"
                      >
                        {item.description}
                      </Text>

                      <Text
                        numberOfLines={1}
                        className="text-sm overflow-hidden font-l-semibold text-light-body dark:text-dark-body"
                      >
                        {"\u20B9 "}
                        {item.price}
                      </Text>

                      <View className="flex-row items-center gap-2 mt-1">
                        {item.category && (
                          <Text className="text-xs font-l-regular text-light-body dark:text-dark-body">
                            {item.category}
                          </Text>
                        )}
                        {item.duration && (
                          <Text className="text-xs font-l-regular text-light-body dark:text-dark-body">
                            • {item.duration}
                          </Text>
                        )}
                      </View>

                      <Text className="text-sm justify-center items-center gap-2 overflow-hidden font-l-semibold text-light-body dark:text-dark-body mt-1">
                        {item.tutorName}
                      </Text>

                
                    </View>
                  </View>
                </Animated.View>
              );
            }}
          />
        </SafeAreaView>
      </FlingGestureHandler>
    </FlingGestureHandler>
  );
}
