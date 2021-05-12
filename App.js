import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, FlatList, Text, StatusBar } from 'react-native';
import Card from './components/Card';
import styles from './style';
import feedGenerator from './feed/FeedGenerator';


const App = () => {

  const [pages, setPages] = useState([]);
  const [items, setItems] = useState([]);
  const [key, setKey] = useState(-1);

  const changeFeed = (list) => {
    let k = key;
    let feed = list.map(item => {
      k += 1;
      console.log("K ==> ", k);
      // console.log("Group ==> ", item.group);
      // console.log("content ==> ", item.content);
      return {key: k, content: item.content, classType: item.classType};
    })
    let length = list.length;
    setKey(n => n+length);
    // console.log("KEY??? ", key);
    setItems((i) =>{
      return i.concat(feed);
    });
  }

  useEffect(() => {
    let initFeedPages = feedGenerator.generatePages();
    changeFeed(initFeedPages.shift());
    setPages(initFeedPages);
  }, [])

  const renderItem = ({ item }) => (
    <Card content={item.content} classType={item.classType}/>
  );

  const addItems = () => {
    if (pages.length > 0) {
      let newFeedPage = pages[0];
      changeFeed(newFeedPage);
      setPages(oldPages => oldPages.slice(1));
    } else {
      // console.log("########################################");
      // console.log("Fetched new posts!!");
      // console.log("########################################");
      let newFeedPages = feedGenerator.generatePages();
      changeFeed(newFeedPages.shift());
      setPages(newFeedPages);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text>Avia</Text> */}
      <FlatList
        data={items}
        renderItem={renderItem}
        // keyExtractor={item => item.id}
        onEndReached={addItems}
      />
    </SafeAreaView>
  );
}

export default App;