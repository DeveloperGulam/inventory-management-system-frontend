const { render, screen } = require('@testing-library/react');
const React = require('react');
const App = require('./App');

describe("App Component", () => {
  it("renders without crashing", () => {
    screen.debug();
    render(<App />);
  });
});