import React, { Component } from 'react';
import {
  Container, Header,
  Content,Footer,
  Thumbnail,Text,
  Icon,Button,
  Item,Input,
  View,Card,
  CardItem,List,
  ListItem,Left,
  Right,Body,
} from 'native-base';
import { ScrollView, Image } from 'react-native'
import axios from 'axios';

class App extends Component {

  constructor() {
    super();
    this.state = { makanan: [], menu: '' };
  }

  getHandler = () => {
    let mn = this.state.menu;
    let url = 'https://developers.zomato.com/api/v2.1/search?q=' + mn;
    const config = {
      headers: { 'user-key': '6e6bc683fa68a9ff646651f67e9e944b' }
    };
    axios.get(url, config).then((ambilData) => {
      console.log(ambilData.data);
      this.setState({
        makanan: ambilData.data.restaurants
      })
    })
  }

  changeText = (val) => {
    this.setState({
      menu: val
    })
  }


  render() {
    const data = this.state.makanan.map((item, index) => {
      let name = item.restaurant.name;
      let kota = item.restaurant.location.city;
      let alamat = item.restaurant.location.address;
      let hrg1 = item.restaurant.average_cost_for_two;
      let hrg2 = hrg1 / 2
      let imgbg = item.restaurant.thumb;
      if (imgbg == '') {
        imgbg = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png'
      }
      return (<Card avatar key={index}>
        <CardItem header>
          <Left>
            <Thumbnail source={{ uri: imgbg }} />
            <Body>
              <Text>{name}</Text>
              <Text note>{kota}</Text>
            </Body>
          </Left>
          <Right>
            <Text>Rp {hrg2}</Text>
          </Right>
        </CardItem>
        <CardItem cardBody>
          <Image source={{ uri: imgbg }} style={{ height: 400, width: 400, flex: 1 }} />
        </CardItem>
        <CardItem footer>
          <Left><Button transparent>
            <Icon name="flag" />
          </Button>
            <Text>{alamat}</Text>
          </Left>
        </CardItem>
      </Card>
      )
    })
    return (
      <Container style={{ backgroundColor:'#e8e8e8'}}>
        <Header searchBar rounded>
          <Item>
            <Button transparent onPress={this.getHandler}><Icon name="search" /></Button>
            <Input placeholder="Cari..." onChangeText={this.changeText} />
          </Item>
        </Header>
        <ScrollView>
          {data}
        </ScrollView>
      </Container>
    );
  }
}
export default App;