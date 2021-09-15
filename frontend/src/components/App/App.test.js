import { render, screen } from '@testing-library/react';
import {App} from '..';

describe('App', () => {
  it('exists', () => {
    expect(typeof App).toBe('function')
  })
  it('has className "App"', () => {
    render(<App />)
    const ui = screen.getByTestId('App')
    expect(ui).toHaveClass('App')
  })
  it('shows a list of todos', () => {
    render(<App />)
    screen.getByTestId('TodoList')
  })
})

