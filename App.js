import 'react-native-reanimated'
import Router from "./src/Router/index";
import connectDb from './src/connection';

export default function App() {
  const connection = () => {
    try {
      connectDb()
      console.log('Conexão OK');
    } catch (error) {
      console.log(error);
    }
  }
  return (
      <Router />
  );
}