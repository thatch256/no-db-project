import React from "react";

class Results extends React.Component {
  render() {
    return (
      <div>
        <img src="https://images-na.ssl-images-amazon.com/images/I/41COwsuVveL._SX425_.jpg" />
        <p>Better luck next time {this.props.name}!</p>
        <button onClick={() => this.props.handleView("Questions")}>Go Back</button>
      </div>
    );
  }
}

export default Results;
