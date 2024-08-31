import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Card,
  Heading,
  ScrollView,
  Text,
  View,
  VStack,
} from '@gluestack-ui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { RootStackParams } from '../navigator/MainNavigator';
import { LOG } from '../config/logger';
import { getPosts } from '../actions';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getCommentsByUser } from '../actions/get-CommentsByUser';
import { Dimensions } from 'react-native';
import { format } from 'date-fns';

interface Props extends StackScreenProps<RootStackParams, 'UserPostsScreen'> {}

const { width, height } = Dimensions.get('window');

const UserPostsScreen = ({ route }: Props) => {
  const queryClient = useQueryClient();
  const { userId } = route.params;

  LOG.info('userId', userId);

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['userComments', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const comments = await getCommentsByUser(userId);

      comments.forEach((comment) => {
        queryClient.setQueryData(['userComments', comment.postId], comment);
      });

      // LOG.info(posts.at(10));
      return comments;
    },
    getNextPageParam: (pages) => pages.length,
  });

  return (
    <ScrollView flex={1}>
      {data?.pages.flat().map((post) => {
        return (
          <Card p='$5' borderRadius='$lg' maxWidth={width * 0.9} m='$2' mb='$12'>
            <Box flexDirection='row'>
              {/* <Avatar mr='$3'>
                <AvatarFallbackText fontFamily='$heading'>RR</AvatarFallbackText>
                <AvatarImage source={post.user?.avatar} alt='profile picture' />
              </Avatar> */}
              <VStack>
                <Heading size='sm' fontFamily='$heading'>
                  12312312
                </Heading>
                <Text size='sm' fontFamily='$heading'>
                  123123123
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
                12312312
              </Heading>
              <Text size='xs' fontFamily='$heading'>
                123123123
              </Text>
            </VStack>
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default UserPostsScreen;
