import { StyleSheet, Text, View, FlatList } from 'react-native';
import Header from "../../components/Header/index";
import Balance from '../../components/Balance';
import Moviments from '../../components/Moviments';
import Actions from '../../components/Actions';

const list = [
  {
    id: 1,
    label: 'Boleto conta de luz',
    value: '300,90',
    date: '17/09/2022',
    type: 0 //despesa
  },
  {
    id: 2,
    label: 'Pix Will',
    value: '2.500,00',
    date: '20/09/2022',
    type: 1 //receita
  },
  {
    id: 3,
    label: 'Salario',
    value: '7.500,00',
    date: '22/09/2022',
    type: 1 //receita
  },
]


export default function Home() {
  return (
    <View style={styles.container}>
      <Header name='Moisas'/>
      <Balance saldo='9.259,90' gastos='-527,00'/>
      <Actions />
      <Text style={styles.title}>Ùltimas movimentações</Text>
      <FlatList 
        style={styles.list}
        data={list}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Moviments data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 14
  },
  list: {
    marginHorizontal: 14
  }
});