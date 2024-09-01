import { Box, Card, Heading, Image, ScrollView, Text, View, VStack } from '@gluestack-ui/themed';
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { RootStackParams } from '../navigator/MainNavigator';
import { LOG } from '../config/logger';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { getCommentsByUser } from '../actions/get-CommentsByUser';
import { Dimensions } from 'react-native';
import { format } from 'date-fns';

interface Props extends StackScreenProps<RootStackParams, 'UserPostsScreen'> {}

const { width, height } = Dimensions.get('window');

const UserPostsScreen = ({ route }: Props) => {
  const queryClient = useQueryClient();
  const { user } = route.params;

  const { data, fetchNextPage } = useInfiniteQuery({
    queryKey: ['userComments', 'infinite'],
    initialPageParam: 0,
    staleTime: 1000 * 60 * 60,
    queryFn: async () => {
      const comments = await getCommentsByUser(user.id);

      comments.forEach((comment) => {
        queryClient.setQueryData(['userComments', comment.postId], comment);
      });

      return comments;
    },
    getNextPageParam: (pages) => pages.length,
  });

  return (
    <ScrollView flex={1}>
      <Image source={user.avatar} alt='logo top image' width={width} height={400} />
      <Box mx='$4' flexDirection='row' alignItems='center' mt='$8'>
        <VStack>
          <Text fontSize='$2xl' color='#000' bold>
            {user.name}
          </Text>
          <Text fontSize='$md' color='#000'>
            @{user.username}
          </Text>
        </VStack>
      </Box>
      <Text mx='$4' mt='$8'>
        Total comments {data?.pages.flat().length}
      </Text>
      {data?.pages.flat().map((post) => {
        return (
          <Card
            p='$5'
            borderRadius='$lg'
            maxWidth={width * 0.9}
            minWidth={width * 0.9}
            m='$2'
            alignSelf='center'
            key={post.id}
          >
            <Box flexDirection='row'>
              <VStack>
                <Heading size='sm' pt='$4' mb='$2' fontFamily='$heading'>
                  {post.name}
                </Heading>
                <Text size='sm' fontFamily='$heading'>
                  {post.body}
                </Text>
              </VStack>
              <Text
                position='absolute'
                fontSize='$xs'
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
          </Card>
        );
      })}
    </ScrollView>
  );
};

export default UserPostsScreen;
