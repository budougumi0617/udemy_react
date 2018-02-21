import React, { Component } from 'react';

class SearchForm extends Component {
  render() {
    return (
      <form>
        <input type="text" value={this.state.place} />
      </form>
    );
  }
}
