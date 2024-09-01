import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Button,
  ButtonText,
  Card,
  Heading,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { LOG } from '../config/logger';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParams } from '../navigator/MainNavigator';
import { format, compareAsc } from 'date-fns';
import { PostWithUser } from '../domain/entities/postWithUser';
import { Dimensions } from 'react-native';

interface Props {
  post: PostWithUser;
}

const { width, height } = Dimensions.get('window');

const PostCard = ({ post }: Props) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  return (
    <Card p='$5' borderRadius='$lg' maxWidth={width * 0.9} m='$2'>
      <Box flexDirection='row' mb={'$2'}>
        <Avatar mr='$3'>
          <AvatarFallbackText fontFamily='$heading'>RR</AvatarFallbackText>
          <AvatarImage source={post.user?.avatar} alt='profile picture' />
        </Avatar>
        <VStack>
          <Heading size='sm' fontFamily='$heading'>
            {post.user?.name}
          </Heading>
          <Text size='sm' fontFamily='$heading'>
            @{post.user?.username}
          </Text>
        </VStack>
        <Text
          position='absolute'
          fontSize='$sm'
          fontStyle='normal'
          fontFamily='$heading'
          fontWeight='$normal'
          lineHeight='$sm'
          right={0}
          sx={{
            color: '$textLight700',
            _dark: {
              color: '$textDark200',
            },
          }}
        >
          {format(new Date(), 'dd/MM/yyyy')}
        </Text>
      </Box>
      <VStack mb='$4'>
        <Heading size='lg' fontFamily='$heading' mb='$2'>
          {post.title}
        </Heading>
        <Text size='xs' fontFamily='$heading'>
          {post.body}
        </Text>
      </VStack>
      <VStack space='md'>
        <Button
          size='md'
          variant='solid'
          action='primary'
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => navigation.navigate('PostDetailScreen', { post: post })}
        >
          <ButtonText>More details about this post</ButtonText>
        </Button>
        <Button
          size='md'
          variant='outline'
          action='primary'
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => navigation.navigate('UserPostsScreen', { user: post.user })}
        >
          <ButtonText>Check comments made by this user</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
};

export default PostCard;
