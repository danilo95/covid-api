import React, { Component } from 'react';
import { Input, Button, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { getCountries, getGeoInfo } from './Api';

import './table.scss';

export default class Sumary extends Component {
	constructor() {
		super();
		this.state = {
			countries: null,
			countryName: ''
		};
	}

	async componentDidMount() {
		let countries = await getCountries();
		let geoData = await getGeoInfo();
		this.setState({
			countries,
			countryName: geoData.country_name
		});
	}

	//filters
	getColumnSearchProps = dataIndex => ({
		filterDropdown: ({
			setSelectedKeys,
			selectedKeys,
			confirm,
			clearFilters
		}) => (
			<div style={{ padding: 8 }}>
				<Input
					ref={node => {
						this.searchInput = node;
					}}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={e =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					style={{
						width: 188,
						marginBottom: 8,
						display: 'block'
					}}
				/>
				<Button
					type="primary"
					onClick={() =>
						this.handleSearch(selectedKeys, confirm, dataIndex)
					}
					icon={<SearchOutlined />}
					size="small"
					style={{ width: 90, marginRight: 8 }}
				>
					Search
				</Button>
				<Button
					onClick={() => this.handleReset(clearFilters)}
					size="small"
					style={{ width: 90 }}
				>
					Reset
				</Button>
			</div>
		),
		filterIcon: filtered => (
			<SearchOutlined
				style={{ color: filtered ? '#1890ff' : undefined }}
			/>
		),
		onFilter: (value, record) =>
			record[dataIndex]
				.toString()
				.toLowerCase()
				.includes(value.toLowerCase()),
		onFilterDropdownVisibleChange: visible => {
			if (visible) {
				setTimeout(() => this.searchInput.select());
			}
		},
		render: text =>
			this.state.searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0
					}}
					searchWords={[this.state.searchText]}
					autoEscape
					textToHighlight={text.toString()}
				/>
			) : (
				text
			)
	});

	handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm();
		this.setState({
			searchText: selectedKeys[0],
			searchedColumn: dataIndex
		});
	};

	handleReset = clearFilters => {
		clearFilters();
		this.setState({ searchText: '' });
	};

	//filters

	render() {
		const columns = [
			{
				title: 'Pais',
				dataIndex: 'Country',
				key: 'Country',
				...this.getColumnSearchProps('Country'),
				render: text => <b>{text == 'US' ? 'United States' : text}</b>
			},
			{
				title: 'Casos Confirmados',
				dataIndex: 'TotalConfirmed',
				key: 'TotalConfirmed',
				defaultSortOrder: 'descend',
				sorter: (a, b) => a.TotalConfirmed - b.TotalConfirmed
			},
			{
				title: 'Personas Recuperadas',
				dataIndex: 'TotalRecovered',
				key: 'TotalRecovered',
				sorter: (a, b) => a.TotalRecovered - b.TotalRecovered
			},
			{
				title: 'Total Muertes',
				dataIndex: 'TotalDeaths',
				key: 'TotalDeaths',
				sorter: (a, b) => a.TotalDeaths - b.TotalDeaths
			}
		];
		const { countries } = this.state;
		return (
			<div
				style={{
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					width: '100%'
				}}
			>
				<Table
					style={{ cursor: 'pointer' }}
					loading={countries ? false : true}
					dataSource={countries ? countries : []}
					columns={columns}
					onRow={data => ({
						onClick: () =>
							this.props.history.push({
								pathname: '/details',
								state: {
									data
								}
							})
					})}
				/>
			</div>
		);
	}
}
