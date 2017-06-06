import React from 'react';
import { FlatList, Button } from 'react-native';
import ListRow from './ListRow-start';
// import ListRow from './ListRow-finished';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      people: [],
    };
  }

  handleAdd = async () => {
    try {
      const res = await fetch('https://randomuser.me/api');
      const result = await res.json();
      this.setState({
        people: [...this.state.people, result.results[0]],
      });
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  handleRemove = (index) => {
    const start = this.state.people.slice(0, index);
    const end = this.state.people.slice(index + 1);
    this.setState({
      people: start.concat(end),
    });
  };

  render() {
    return (
      <FlatList
        style={{ marginTop: 20 }}
        data={this.state.people}
        renderItem={({ item, index }) => (
          <ListRow
            {...item}
            index={index}
            onRemove={() => this.handleRemove(index)}
          />
        )}
        keyExtractor={(item) => item.login.username}
        ListHeaderComponent={() => (
          <Button
            onPress={this.handleAdd}
            title="Add Person"
          />
        )}
      />
    );
  }
}
