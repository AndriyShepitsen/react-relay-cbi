

import AddTodoMutation from '../mutations/AddTodoMutation';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

import React from 'react';
import Relay from 'react-relay';

class About extends React.Component {
    render() {
        return (
            <div>Test</div>
        );
    }
}

export default Relay.createContainer(About, {
    fragments: {
        viewer: () => Relay.QL`
      fragment on User {
        totalCount,
      }
    `,
    },
});
