import { Button, Image, Text, View, VStack } from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import { PostWithUser } from '../domain/entities/postWithUser';
import { LOG } from '../config/logger';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/MainNavigator';
import { Dimensions } from 'react-native';

interface Props extends StackScreenProps<RootStackParams, 'PostDetailScreen'> {}

const { width, height } = Dimensions.get('window');

const PostDetailScreen = ({ route }: Props) => {
  const post: PostWithUser = route.params.post;
  useEffect(() => {
    LOG.info(post, 'post');
  }, []);

  return (
    <View flex={1}>
      <Image source={post.user.avatar} alt='logo top image' width={width} height={height / 2} />
      <VStack mx={'$10'} space='xl'>
        <Text fontSize='$3xl' color='#000'>
          {post.title}
        </Text>
        <Text fontSize='$md'>{post.body}</Text>
      </VStack>
    </View>
  );
};

export default PostDetailScreen;
