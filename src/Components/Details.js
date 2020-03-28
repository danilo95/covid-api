import React, { Component } from 'react';
import { Timeline, Tag, Card } from 'antd';
import moment from 'moment';

import { getdetails } from './Api';

export default class Details extends Component {
	constructor() {
		super();
		this.state = {
			details: null
		};
	}

	async componentDidMount() {
		const { data } = this.props.history.location.state;
		let details = await getdetails(data.Slug);
		this.setState({
			details
		});
	}
	render() {
		const { details } = this.state;
		console.log(details ? details[0].Date : details);
		return (
			<div>
				<Card
					title="Linea de tiempo"
					bordered={false}
					style={{ width: 'auto' }}
				>
					{details ? (
						<Timeline>
							{details.map((value, key) => {
								return (
									<Timeline.Item key={key} color="red">
										{moment(value.Date).format(
											'DD MMMM YYYY'
										)}
										<p>
											<Tag color={'volcano'} key={value}>
												{`casos confirmados: ${value.Cases}`}
											</Tag>
										</p>
									</Timeline.Item>
								);
							})}
						</Timeline>
					) : null}
				</Card>
			</div>
		);
	}
}
