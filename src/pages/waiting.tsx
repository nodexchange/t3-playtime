import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { trpc } from '../utils/trpc';

type Props = {};

const Waiting = (props: Props) => {
  const router = useRouter();
  const { userId } = router.query;
  const findMatchQuery = trpc.useQuery(['users.findMatch', { userId }]);
  const checkMatchQuery = trpc.useQuery(['users.checkMatch', { userId }]);

  useEffect(() => {
    if (!findMatchQuery.data) return;
    console.log(findMatchQuery.data.id);
    router.push(`/room?id=${findMatchQuery.data.id}`);
  }, [findMatchQuery.data, router]);
  
  useEffect(() => {
    if (!checkMatchQuery.data) return;
    console.log(checkMatchQuery.data.id);
    router.push(`/room?id=${checkMatchQuery.data.id}`);
  }, [checkMatchQuery.data, router]);

  useEffect(() => {
    // pooling to check status
    const interval = setInterval(() => {
      checkMatchQuery.refetch();
    }, 4000);
    return () => {
      clearInterval(interval);
    }
  }, [checkMatchQuery]);

  return <div>waiting for users</div>;
};

export default Waiting;