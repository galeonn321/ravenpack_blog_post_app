import { Text, View } from '@gluestack-ui/themed';
import React from 'react';
import { PostWithUser } from '../domain/entities/postWithUser';
import { LOG } from '../config/logger';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigator/MainNavigator';

interface Props extends StackScreenProps<RootStackParams, 'PostDetailScreen'> {}

const PostDetailScreen = ({ route }: Props) => {
  LOG.info(route.params.post, 'postId');
  return (
    <View flex={1}>
      <Text>PostDetailScreen</Text>
    </View>
  );
};

export default PostDetailScreen;
