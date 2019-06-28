import React from "react";

class Results extends React.Component {
  render() {
    return (
      <div>
        {this.props.name}
        <button onClick={() => this.props.handleView("Questions")}>Go Back</button>
      </div>
    );
  }
}

export default Results;
