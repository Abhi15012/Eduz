import BackButton from '@/components/backButton';
import { useLocalSearchParams } from 'expo-router';

import { VideoView, VideoSource, useVideoPlayer } from 'expo-video';
import { View } from 'moti';
import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


const VIDEO_URL = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_5MB.mp4';



export default function OfflineVideo() {

const {title , id  , type } = useLocalSearchParams() as {title: string, id: string, type: string};
    const videoSource: VideoSource = {
        uri: VIDEO_URL,
    };

    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        setIsPlaying(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
    };

    const player = useVideoPlayer(videoSource,(player)=>{
      player.loop= true;
      player.volume = 1.0;
      player.play()
      player.pause()
      player.seekBy(10)

    });

    return (
      <SafeAreaView className='bg-light dark:bg-dark flex-1 '>
     <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
          <BackButton />
          <Text className='text-lg text-light-title dark:text-dark-title font-l-semibold'>{title}</Text>
        </View>
      <View className='flex-1 '>
  <VideoView
        player={player}
        style={styles.video}
        allowsFullscreen
        allowsPictureInPicture
      />
        </View>

     

      </SafeAreaView>
    );
  
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
  video: { width: '100%', height: 300 },
});