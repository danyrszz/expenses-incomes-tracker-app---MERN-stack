import React from "react";
class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Algo salio mal.</h1>;
    }
    return this.props.children; 
  }
}
export default Error