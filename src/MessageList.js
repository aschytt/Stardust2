// ./src/MessageList.js

import React, { Component } from 'react';
import { ListView, ListViewSection, ListViewSectionHeader, ListViewRow, Text } from 'react-desktop/macOs';

class MessageList extends Component {
	render() {
		return (
			<ListView>
				<ListViewSection>
					{this.props.messages.map((message, index) => this.renderItem(message))}
				</ListViewSection>
			</ListView>
		);
	}

	renderItem(message) {
		return (
			<ListViewRow key={message.id}>
				<Text color="#ffccf1" size="14" bold>
					{message.sender.name}:
				</Text>

				<Text color="#ffffff" size="14">
					{message.text}
				</Text>
			</ListViewRow>
		);
	}
}

export default MessageList;
