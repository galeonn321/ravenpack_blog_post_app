import { postsApi } from '@/app/src/api/postsApi';
import axios from 'axios';

describe('postsApi', () => {
  test('should be an axios instance', () => {
    // console.log(postsApi);
    expect(postsApi.defaults.baseURL).toBe('https://jsonplaceholder.typicode.com');
  });
});
