import { useRouter } from 'next/router';
import React from 'react';
import { trpc } from '../utils/trpc';

type Props = {};

const Waiting = (props: Props) => {
  const router = useRouter();
  const { userId } = router.query;
  const { data } = trpc.useQuery(['users.findMatch', { userId }]);
  console.log(userId, data);
  return <div>waiting for users</div>;
};

export default Waiting;