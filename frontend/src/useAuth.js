import { useState } from 'react';

export default function useAuth(initialValue) {
   const [isAuth, setIsAuth] = useState(initialValue);

   return [isAuth, login, logout];
}
