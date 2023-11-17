
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const PublicRoute = (WrappedComponent) => {
  const Wrapper = (props) => {
    const router = useRouter();
    const token=localStorage.getItem("token")

    const isAuthenticated = () => {
      if(token){
        return true; 
      }
    };

    useEffect(() => {
      if (isAuthenticated()) {
        router.push('/');
      }
    }, [router,token]);

    return isAuthenticated() ? null :  <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default PublicRoute;
