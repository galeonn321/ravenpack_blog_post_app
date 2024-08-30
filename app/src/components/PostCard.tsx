import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Card,
  Heading,
  Pressable,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { Post } from '../domain/entities/post';
import { LOG } from '../config/logger';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../navigator/MainNavigator';
import { format, compareAsc } from 'date-fns';
import { PostWithUser } from '../domain/entities/postWithUser';

interface Props {
  post: PostWithUser;
}

const PostCard = ({ post }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  return (
    <Pressable onPress={() => navigation.navigate('PostDetailScreen', { post: post })}>
      <Card p='$5' borderRadius='$lg' maxWidth={300} m='$3'>
        <Text
          fontSize='$sm'
          fontStyle='normal'
          fontFamily='$heading'
          fontWeight='$normal'
          lineHeight='$sm'
          mb='$2'
          sx={{
            color: '$textLight700',
            _dark: {
              color: '$textDark200',
            },
          }}
        >
          {format(new Date(2014, 1, 11), 'dd/MM/yyyy')}
        </Text>
        <VStack mb='$6'>
          <Heading size='md' fontFamily='$heading' mb='$4'>
            {post.title}
          </Heading>
          <Text size='sm' fontFamily='$heading'>
            {post.body}
          </Text>
        </VStack>
        <Box flexDirection='row'>
          <Avatar mr='$3'>
            <AvatarFallbackText fontFamily='$heading'>RR</AvatarFallbackText>
            <AvatarImage source={post.user?.avatar} alt='profile picture' />
          </Avatar>
          <VStack>
            <Heading size='sm' fontFamily='$heading' mb='$1'>
              {post.user?.name}
            </Heading>
            <Text size='sm' fontFamily='$heading'>
              @{post.user?.username}
            </Text>
          </VStack>
        </Box>
      </Card>
    </Pressable>
  );
};

export default PostCard;
