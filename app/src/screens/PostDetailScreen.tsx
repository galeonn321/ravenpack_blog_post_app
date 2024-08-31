import { Box, Button, Divider, Image, Text, View, VStack } from '@gluestack-ui/themed';
import React, { useEffect } from 'react';
import { PostWithUser } from '../domain/entities/postWithUser';
import { LOG } from '../config/logger';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/MainNavigator';
import { Dimensions } from 'react-native';
import { format } from 'date-fns';
import { ScrollView } from '@gluestack-ui/themed';

interface Props extends StackScreenProps<RootStackParams, 'PostDetailScreen'> {}

const { width, height } = Dimensions.get('window');

const PostDetailScreen = ({ route }: Props) => {
  const post: PostWithUser = route.params.post;

  LOG.info('PostCard', post);
  LOG.info('PostCard', post.user);

  return (
    <ScrollView flex={1}>
      <Image source={post.user.avatar} alt='logo top image' width={width} height={height / 2} />
      <Box mx='$4' flexDirection='row' alignItems='center' mt='$8'>
        <VStack>
          <Text fontSize='$md' color='#000'>
            @{post.user.username}
          </Text>
          <Text fontSize='$2xl' color='#000' bold>
            {post.user.name}
          </Text>
        </VStack>
        <Text right={0} position='absolute'>
          {format(new Date(), 'dd/MM/yyyy')}
        </Text>
      </Box>
      <Box mx='$4'>
        <Divider my='$4' bgColor='#000' />
        <Text fontSize='$3xl' color='#000' mb='$4'>
          {post.title}
        </Text>
        <Text fontSize='$sm'>{post.body}</Text>
      </Box>
    </ScrollView>
  );
};

export default PostDetailScreen;
