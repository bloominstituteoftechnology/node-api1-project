import React from "react";
import TodoList from "./TodoList";

class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: "" };
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const newItem = { name: this.state.item, id: Date.now(), completed: false };
    // this.props.addItem(this.state.item);
    this.props.addItem(newItem);
    console.log(newItem);

    this.setState({ item: "" });
  };

  handleChange = (e) => {
    this.setState({ item: e.target.value });
  };

  clickHandler = () => {
    this.props.clearCompleted();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TodoList />
          <input type="text" onChange={this.handleChange} />
          <button type="submit">Add</button>
          <button>Clear All</button>
        </form>
      </div>
    );
  }
}

export default TodoForm;
